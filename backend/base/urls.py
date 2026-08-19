from django.urls import path

from .views import (
    product_list,
    product_detail,
    register_user,
    profile,
    get_orders,
    create_order,
    get_order,
    create_xendit_session,
)

urlpatterns = [

    path("products/", product_list, name="product-list"),

    path(
    "products/<int:product_id>/",
    product_detail,
    name="product-detail"
    ),

    path("register/", register_user, name="register"),

    path("profile/", profile, name="profile"),

    path("orders/", get_orders, name="orders"),

    path("orders/create/",create_order,name="create-order"),

    path("orders/<int:payment_id>/",get_order,name="order-detail"),

    path(
    "payments/<int:payment_id>/create-session/",
    create_xendit_session,
    name="create-xendit-session"
),

]