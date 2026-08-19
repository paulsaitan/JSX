import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../api/base";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Get authenticated user
        const profileResponse = await axios.get(
          `${BASE_URL}/api/profile/`,
          config,
        );

        setUser(profileResponse.data);

        // Get authenticated user's orders
        const ordersResponse = await axios.get(
          `${BASE_URL}/api/orders/`,
          config,
        );

        setOrders(ordersResponse.data);
      } catch (err) {
        console.error("Profile error:", err.response?.data || err.message);

        if (err.response?.status === 401) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");

          navigate("/login");
          return;
        }

        setError("Unable to load your profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    navigate("/login");
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-[#10265A]" />
          <p className="mt-4 text-sm text-gray-600">Loading your profile...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="rounded-xl bg-white p-8 text-center shadow">
          <p className="text-red-600">{error}</p>

          <Link
            to="/"
            className="mt-5 inline-block rounded-lg bg-[#10265A] px-5 py-2 text-sm font-semibold text-white"
          >
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              My Account
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              My Profile
            </h1>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {/* User Information */}
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Account Information
          </h2>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Username
              </p>

              <p className="mt-1 text-sm font-medium text-gray-900">
                {user?.username || "-"}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Email
              </p>

              <p className="mt-1 text-sm font-medium text-gray-900">
                {user?.email || "-"}
              </p>
            </div>
          </div>
        </section>

        {/* Orders */}
        <section className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Order History</h2>

              <p className="mt-1 text-sm text-gray-500">
                Your previous purchases and payment information.
              </p>
            </div>

            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
              {orders.length} Order{orders.length !== 1 ? "s" : ""}
            </span>
          </div>

          {orders.length === 0 ? (
            <div className="mt-8 rounded-lg border border-dashed border-gray-300 p-10 text-center">
              <p className="text-sm text-gray-500">
                You don't have any orders yet.
              </p>

              <Link
                to="/products"
                className="mt-4 inline-block rounded-lg bg-[#10265A] px-5 py-2.5 text-sm font-semibold text-white"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="mt-8 space-y-8">
              {orders.map((order) => (
                <div
                  key={order.payment_id}
                  className="overflow-hidden rounded-xl border border-gray-200"
                >
                  {/* Order Header */}
                  <div className="flex flex-col gap-4 bg-gray-50 p-5 sm:flex-row sm:items-center sm:justify-between">
                    {/* Order Number */}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Order
                      </p>

                      <p className="mt-1 font-bold text-gray-900">
                        #{order.payment_id}
                      </p>
                    </div>

                    {/* Order Total */}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Order Total
                      </p>

                      <p className="mt-1 font-bold text-gray-900">
                        ₱{Number(order.totalPrice).toLocaleString()}
                      </p>
                    </div>

                    {/* Status and Payment Button */}
                    <div className="flex flex-col items-start gap-3 sm:items-end">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          order.isPaid
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.isPaid ? "Paid" : "Pending"}
                      </span>

                      {!order.isPaid && (
                        <Link
                          to={`/payment/${order.payment_id}`}
                          className="rounded-lg bg-[#10265A] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0b1b42]"
                        >
                          Continue Payment
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-5">
                    <h3 className="text-sm font-bold text-gray-900">
                      Order Items
                    </h3>

                    <div className="mt-4 space-y-4">
                      {order.items?.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 border-b border-gray-100 pb-4"
                        >
                          {/* Product Image */}
                          <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-lg bg-gray-50 p-2">
                            {item.product?.image ? (
                              <img
                                src={
                                  item.product.image.startsWith("http")
                                    ? item.product.image
                                    : `${BASE_URL}${item.product.image}`
                                }
                                alt={item.product.name}
                                className="h-full w-full object-contain"
                              />
                            ) : (
                              <span className="text-xs text-gray-400">
                                No Image
                              </span>
                            )}
                          </div>

                          {/* Product */}
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-gray-900">
                              {item.product?.name}
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                              Quantity: {item.qty}
                            </p>

                            <p className="text-xs text-gray-500">
                              Price: ${item.price}
                            </p>
                          </div>

                          {/* Subtotal */}
                          <div className="text-right">
                            <p className="text-sm font-bold text-gray-900">
                              ${item.subtotal}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="grid gap-6 border-t border-gray-200 bg-gray-50 p-5 md:grid-cols-2">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">
                        Payment Information
                      </h3>

                      <div className="mt-3 space-y-2 text-sm">
                        <div className="flex justify-between gap-4">
                          <span className="text-gray-500">Payment ID</span>

                          <span className="font-medium text-gray-900">
                            #{order.payment_id}
                          </span>
                        </div>

                        <div className="flex justify-between gap-4">
                          <span className="text-gray-500">Status</span>

                          <span className="font-medium text-gray-900">
                            {order.xendit_status || "-"}
                          </span>
                        </div>

                        <div className="flex justify-between gap-4">
                          <span className="text-gray-500">Paid At</span>

                          <span className="font-medium text-gray-900">
                            {order.paidAt
                              ? new Date(order.paidAt).toLocaleString()
                              : "-"}
                          </span>
                        </div>

                        <div className="flex justify-between gap-4">
                          <span className="text-gray-500">Invoice ID</span>

                          <span className="break-all text-right font-medium text-gray-900">
                            {order.xendit_invoice_id || "-"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">
                        Shipping Address
                      </h3>

                      {order.shippingAddress ? (
                        <div className="mt-3 space-y-1 text-sm text-gray-600">
                          <p className="font-semibold text-gray-900">
                            {order.shippingAddress.fullname}
                          </p>

                          <p>{order.shippingAddress.address}</p>

                          <p>
                            {order.shippingAddress.city},{" "}
                            {order.shippingAddress.postalCode}
                          </p>

                          <p>{order.shippingAddress.country}</p>
                        </div>
                      ) : (
                        <p className="mt-3 text-sm text-gray-500">
                          No shipping address available.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Back */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="text-sm font-semibold text-gray-600 hover:text-black"
          >
            ← Back to Shop
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Profile;
