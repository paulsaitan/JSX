from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import (
    Product,
    PaymentMethod,
    OrderItem,
    ShippingAddress,
)


# =========================================================
# PRODUCT
# =========================================================

class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = "__all__"


# =========================================================
# USER
# =========================================================

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
        ]


# =========================================================
# REGISTER
# =========================================================

class RegisterSerializer(serializers.ModelSerializer):

    username = serializers.CharField(
        validators=[
            UniqueValidator(
                queryset=User.objects.all()
            )
        ]
    )

    email = serializers.EmailField(
        validators=[
            UniqueValidator(
                queryset=User.objects.all()
            )
        ]
    )

    password = serializers.CharField(
        write_only=True,
        min_length=6
    )

    class Meta:
        model = User

        fields = [
            "username",
            "email",
            "password",
        ]

    def create(self, validated_data):

        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )

        return user


# =========================================================
# ORDER ITEM
# =========================================================

class OrderItemSerializer(serializers.ModelSerializer):

    product_name = serializers.CharField(
        source="product.product_name",
        read_only=True
    )

    product_image = serializers.ImageField(
        source="product.image",
        read_only=True
    )

    class Meta:
        model = OrderItem

        fields = [
            "id",
            "product",
            "product_name",
            "product_image",
            "qty",
            "price",
        ]


# =========================================================
# SHIPPING ADDRESS
# =========================================================

class ShippingAddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = ShippingAddress

        fields = [
            "id",
            "fullname",
            "address",
            "city",
            "postalCode",
            "country",
        ]


# =========================================================
# PAYMENT / ORDER
# =========================================================

class PaymentSerializer(serializers.ModelSerializer):

    order_items = OrderItemSerializer(
        many=True,
        source="orderitem_set",
        read_only=True
    )

    shipping_address = ShippingAddressSerializer(
        many=True,
        source="shippingaddress_set",
        read_only=True
    )

    class Meta:
        model = PaymentMethod

        fields = [
            "id",
            "user",
            "totalPrice",
            "isPaid",
            "paidAt",
            "xendit_invoice_id",
            "xendit_external_id",
            "xendit_status",
            "order_items",
            "shipping_address",
        ]