from django.db import models
from django.contrib.auth.models import User


class Product(models.Model):
    product_name = models.CharField(max_length=255)
    product_price = models.DecimalField(max_digits=10, decimal_places=2)
    brand = models.CharField(max_length=255)
    description = models.TextField()
    countInStock = models.IntegerField()
    image = models.ImageField(upload_to='products_images/')
    createdAt = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.product_name


class CartUser(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    qty = models.IntegerField(default=1)


class PaymentMethod(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="payments"
    )

    totalPrice = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    isPaid = models.BooleanField(default=False)

    PaidAt = models.DateTimeField(
        null=True,
        blank=True
    )

    xendit_invoice_id = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    xendit_external_id = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    xendit_status = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )

    xendit_invoice_url = models.URLField(
    max_length=500,
    blank=True,
    null=True
    )

    createdAt = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"Order #{self.id} - {self.user.username}"


class OrderItem(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )

    payment = models.ForeignKey(
        PaymentMethod,
        on_delete=models.CASCADE,
        related_name="items"
    )

    qty = models.IntegerField(default=1)

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    def __str__(self):
        return f"{self.product.product_name} x {self.qty}"


class ShippingAddress(models.Model):
    payment = models.ForeignKey(
        PaymentMethod,
        on_delete=models.CASCADE,
        related_name="shipping_address"
    )

    fullname = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    postalCode = models.CharField(max_length=20)
    country = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.fullname} - {self.city}"