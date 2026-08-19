import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../api/base";

const Payment = () => {
  const { paymentId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          `${BASE_URL}/api/orders/${paymentId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log("Order:", response.data);

        setOrder(response.data);
      } catch (err) {
        console.error("Get order error:", err.response?.data || err);

        if (err.response?.status === 401) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");

          navigate("/login");
          return;
        }

        setError(err.response?.data?.detail || "Unable to load order.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [paymentId, navigate]);

  const handlePayment = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      navigate("/login");
      return;
    }

    setPaying(true);
    setError("");

    try {
      const response = await axios.post(
        `${BASE_URL}/api/payments/${paymentId}/create-session/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Xendit session response:", response.data);

      // Redirect to Xendit's hosted checkout page
      if (response.data.checkout_url) {
        window.location.href = response.data.checkout_url;
        return;
      }

      setError("Unable to get the Xendit payment URL.");
    } catch (err) {
      console.error("Create Xendit session error:", err.response?.data || err);

      setError(err.response?.data?.detail || "Unable to start Xendit payment.");
    } finally {
      setPaying(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading order...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-red-600">
            Unable to Load Order
          </h1>

          <p className="mt-3 text-gray-600">{error}</p>

          <Link
            to="/profile"
            className="mt-6 inline-block rounded-xl bg-black px-5 py-3 font-semibold text-white"
          >
            Go to Profile
          </Link>
        </div>
      </main>
    );
  }

  if (!order) {
    return null;
  }

  const shipping = order.shippingAddress;

  return (
    <main className="min-h-screen bg-gray-50 px-4 pb-16 pt-28">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Payment
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Complete Your Payment
          </h1>

          <p className="mt-2 text-gray-600">
            Review your order before continuing.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* LEFT SIDE */}
          <div className="space-y-6 lg:col-span-2">
            {/* Order Items */}
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900">
                Order #{order.payment_id}
              </h2>

              <div className="mt-5 divide-y divide-gray-100">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 py-4">
                    {/* Product Image */}
                    <div className="h-16 w-16 overflow-hidden rounded-lg bg-gray-100">
                      {item.product.image ? (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Product */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {item.product.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        ₱{Number(item.price).toLocaleString()} × {item.qty}
                      </p>
                    </div>

                    {/* Subtotal */}
                    <div className="font-semibold text-gray-900">
                      ₱{Number(item.subtotal).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Shipping Address */}
            {shipping && (
              <section className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900">
                  Shipping Address
                </h2>

                <div className="mt-4 text-sm leading-7 text-gray-600">
                  <p className="font-semibold text-gray-900">
                    {shipping.fullname}
                  </p>

                  <p>{shipping.address}</p>

                  <p>
                    {shipping.city}, {shipping.postalCode}
                  </p>

                  <p>{shipping.country}</p>
                </div>
              </section>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div>
            <section className="sticky top-28 rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>

              <div className="mt-5 space-y-3 border-b border-gray-200 pb-5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Order ID</span>
                  <span className="font-medium">#{order.payment_id}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <span className="font-medium">
                    {order.xendit_status || "PENDING"}
                  </span>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">Total</span>

                <span className="text-2xl font-bold text-gray-900">
                  ₱{Number(order.totalPrice).toLocaleString()}
                </span>
              </div>

              <button
                type="button"
                onClick={handlePayment}
                disabled={paying || order.isPaid}
                className="mt-6 w-full rounded-xl bg-black px-6 py-4 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {order.isPaid
                  ? "Already Paid"
                  : paying
                    ? "Redirecting to Payment..."
                    : "Pay Now"}
              </button>

              <Link
                to="/profile"
                className="mt-4 block text-center text-sm font-semibold text-gray-600 transition hover:text-black"
              >
                View My Orders
              </Link>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Payment;
