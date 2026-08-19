from django.shortcuts import get_object_or_404
from django.db import transaction
from django.conf import settings
from django.utils import timezone

import requests

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status

from .models import (
    Product,
    PaymentMethod,
    OrderItem,
    ShippingAddress,
)

from .serializers import (
    ProductSerializer,
    RegisterSerializer,
    UserSerializer,
    PaymentSerializer,
)

# =========================================================
# PROFILE
# =========================================================

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def profile(request):

    serializer = UserSerializer(request.user)

    return Response(serializer.data)


# =========================================================
# PRODUCTS
# =========================================================

@api_view(["GET"])
@permission_classes([AllowAny])
def product_list(request):

    products = Product.objects.all()

    serializer = ProductSerializer(
        products,
        many=True,
        context={"request": request}
    )

    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([AllowAny])
def product_detail(request, product_id):

    product = get_object_or_404(
        Product,
        id=product_id
    )

    serializer = ProductSerializer(
        product,
        context={"request": request}
    )

    return Response(serializer.data)


# =========================================================
# REGISTER
# =========================================================

@api_view(["POST"])
@permission_classes([AllowAny])
def register_user(request):

    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

        return Response(
            {
                "message": "User Registered Successfully"
            },
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


# =========================================================
# ORDERS
# =========================================================

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_orders(request):

    payments = PaymentMethod.objects.filter(
        user=request.user
    ).order_by("-id")

    orders = []

    for payment in payments:

        items = OrderItem.objects.filter(
            payment=payment
        )

        shipping = ShippingAddress.objects.filter(
            payment=payment
        ).first()

        order_items = []

        for item in items:

            order_items.append({
                "id": item.id,

                "product": {
                    "id": item.product.id,
                    "name": item.product.product_name,
                    "image": (
                    request.build_absolute_uri(item.product.image.url)
                    if item.product.image
                    else None
                    ),
                },

                "qty": item.qty,
                "price": str(item.price),
                "subtotal": str(item.qty * item.price),
            })

        orders.append({
            "payment_id": payment.id,

            "totalPrice": str(payment.totalPrice),

            "isPaid": payment.isPaid,

            "paidAt": payment.PaidAt,

            "xendit_invoice_id": payment.xendit_invoice_id,

            "xendit_external_id": payment.xendit_external_id,

            "xendit_status": payment.xendit_status,

            "shippingAddress": {
                "fullname": shipping.fullname,
                "address": shipping.address,
                "city": shipping.city,
                "postalCode": shipping.postalCode,
                "country": shipping.country,
            } if shipping else None,

            "items": order_items,
        })

    return Response(orders)


# =========================================================
# CREATE ORDER
# =========================================================

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_order(request):

    data = request.data

    items = data.get("items", [])
    shipping_data = data.get("shippingAddress", {})

    # Check if cart is empty
    if not items:
        return Response(
            {"detail": "Your cart is empty."},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Validate shipping information
    required_fields = [
        "fullname",
        "address",
        "city",
        "postalCode",
        "country",
    ]

    for field in required_fields:
        if not shipping_data.get(field):
            return Response(
                {"detail": f"{field} is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

    try:
        with transaction.atomic():

            total_price = 0
            validated_items = []

            # Validate each product and calculate total
            for item in items:

                product_id = item.get("product")
                qty = item.get("qty", 1)

                if not product_id:
                    return Response(
                        {"detail": "Product ID is required."},
                        status=status.HTTP_400_BAD_REQUEST
                    )

                try:
                    qty = int(qty)
                except (TypeError, ValueError):
                    return Response(
                        {"detail": "Invalid quantity."},
                        status=status.HTTP_400_BAD_REQUEST
                    )

                if qty <= 0:
                    return Response(
                        {"detail": "Quantity must be at least 1."},
                        status=status.HTTP_400_BAD_REQUEST
                    )

                product = get_object_or_404(
                    Product,
                    id=product_id
                )

                # Check stock
                if product.countInStock < qty:
                    return Response(
                        {
                            "detail": (
                                f"Not enough stock for "
                                f"{product.product_name}."
                            )
                        },
                        status=status.HTTP_400_BAD_REQUEST
                    )

                # IMPORTANT:
                # Price comes from the database, not React
                price = product.product_price

                total_price += price * qty

                validated_items.append({
                    "product": product,
                    "qty": qty,
                    "price": price,
                })

            # Create the main order/payment record
            payment = PaymentMethod.objects.create(
                user=request.user,
                totalPrice=total_price,
                isPaid=False,
                xendit_status="PENDING",
            )

            # Create order items
            for item in validated_items:

                OrderItem.objects.create(
                    product=item["product"],
                    payment=payment,
                    qty=item["qty"],
                    price=item["price"],
                )

            # Create shipping address
            ShippingAddress.objects.create(
                payment=payment,
                fullname=shipping_data["fullname"],
                address=shipping_data["address"],
                city=shipping_data["city"],
                postalCode=shipping_data["postalCode"],
                country=shipping_data["country"],
            )

            return Response(
                {
                    "message": "Order created successfully.",
                    "payment_id": payment.id,
                    "totalPrice": str(payment.totalPrice),
                    "isPaid": payment.isPaid,
                    "xendit_status": payment.xendit_status,
                },
                status=status.HTTP_201_CREATED
            )

    except Exception as error:

        return Response(
            {"detail": str(error)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

# =========================================================
# SINGLE ORDER
# =========================================================

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_order(request, payment_id):

    payment = get_object_or_404(
        PaymentMethod,
        id=payment_id,
        user=request.user
    )

    items = OrderItem.objects.filter(
        payment=payment
    )

    shipping = ShippingAddress.objects.filter(
        payment=payment
    ).first()

    order_items = []

    for item in items:

        order_items.append({
            "id": item.id,

            "product": {
                "id": item.product.id,
                "name": item.product.product_name,
                 "image": (
                request.build_absolute_uri(item.product.image.url)
                if item.product.image
                    else None
                ),
            },

            "qty": item.qty,
            "price": str(item.price),
            "subtotal": str(item.qty * item.price),
        })

    return Response({

        "payment_id": payment.id,

        "totalPrice": str(payment.totalPrice),

        "isPaid": payment.isPaid,

        "paidAt": payment.PaidAt,

        "xendit_invoice_id": payment.xendit_invoice_id,

        "xendit_external_id": payment.xendit_external_id,

        "xendit_status": payment.xendit_status,

        "shippingAddress": {

            "fullname": shipping.fullname,

            "address": shipping.address,

            "city": shipping.city,

            "postalCode": shipping.postalCode,

            "country": shipping.country,

        } if shipping else None,

        "items": order_items,
    })

# =========================================================
# CREATE XENDIT PAYMENT
# =========================================================

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_payment(request, payment_id):

    payment = get_object_or_404(
        PaymentMethod,
        id=payment_id,
        user=request.user
    )

    # Prevent creating another payment for an already paid order
    if payment.isPaid:
        return Response(
            {
                "detail": "This order has already been paid."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    # We will add the actual Xendit API call here next
    return Response({
        "message": "Payment endpoint is ready.",
        "payment_id": payment.id,
        "totalPrice": str(payment.totalPrice),
    })

# =========================================================
# XENDIT PAYMENT SESSION
# =========================================================

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_xendit_session(request, payment_id):

    payment = get_object_or_404(
        PaymentMethod,
        id=payment_id,
        user=request.user
    )

    if payment.isPaid:
        return Response(
            {"detail": "This order has already been paid."},
            status=status.HTTP_400_BAD_REQUEST
        )

    order_items = OrderItem.objects.filter(payment=payment)

    if not order_items.exists():
        return Response(
            {"detail": "This order has no items."},
            status=status.HTTP_400_BAD_REQUEST
        )

    items = []

    for item in order_items:
        items.append({
            "reference_id": f"order-{payment.id}-item-{item.id}",
            "type": "PHYSICAL_PRODUCT",
            "name": item.product.product_name,
            "net_unit_amount": float(item.price),
            "quantity": item.qty,
            "category": item.product.brand or "Product",
        })

    payload = {
        "reference_id": f"shoply-order-{payment.id}",
        "session_type": "PAY",
        "mode": "PAYMENT_LINK",
        "amount": float(payment.totalPrice),
        "currency": "PHP",
        "country": "PH",
        "items": items,
    }

    try:
        response = requests.post(
            "https://api.xendit.co/sessions",
            json=payload,
            auth=(settings.XENDIT_SECRET_KEY, ""),
            headers={
                "Content-Type": "application/json"
            },
            timeout=30
        )

        if response.status_code not in [200, 201]:
            try:
                xendit_error = response.json()
            except ValueError:
                xendit_error = response.text

            return Response(
                {
                    "detail": "Unable to create Xendit payment session.",
                    "xendit_error": xendit_error
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        data = response.json()

        payment.xendit_invoice_id = data.get("payment_session_id")
        payment.xendit_status = data.get("status", "PENDING")
        payment.save()

        return Response({
            "payment_session_id": data.get("payment_session_id"),
            "checkout_url": data.get("payment_link_url"),
        })

    except requests.exceptions.RequestException as e:
        return Response(
            {
                "detail": "Unable to connect to Xendit.",
                "error": str(e)
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )