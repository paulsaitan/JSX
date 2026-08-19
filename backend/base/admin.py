from django.contrib import admin
from .models import (
    Product,
    CartUser,
    PaymentMethod,
    OrderItem,
    ShippingAddress
)

admin.site.register(Product)
admin.site.register(CartUser)
admin.site.register(PaymentMethod)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)