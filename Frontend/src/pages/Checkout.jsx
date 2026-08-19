import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { BASE_URL } from "../api/base";

const Checkout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { cartItems, cartTotal } = useCart();

  const [form, setForm] = useState({
    fullname: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Philippines",
  });

  const [paymentMethod, setPaymentMethod] = useState("xendit");

  const shippingFee = 0;

  const total = cartTotal + shippingFee;

  const handleChange = (e) => {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("access_token");

  // Check if user is logged in
  if (!token) {
    navigate("/login");
    return;
  }

  // Check cart
  if (cartItems.length === 0) {
    setError("Your cart is empty.");
    return;
  }

  // Validate shipping information
  if (
    !form.fullname ||
    !form.address ||
    !form.city ||
    !form.postalCode ||
    !form.country
  ) {
    setError("Please complete all shipping information.");
    return;
  }

  try {
    setLoading(true);
    setError("");

    const response = await axios.post(
      `${BASE_URL}/api/orders/create/`,
      {
        items: cartItems.map((item) => ({
          product: item.id,
          qty: item.qty,
        })),

        shippingAddress: {
          fullname: form.fullname,
          address: form.address,
          city: form.city,
          postalCode: form.postalCode,
          country: form.country,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Order created:", response.data);

    // Redirect to Payment page
    navigate(`/payment/${response.data.payment_id}`);

  } catch (err) {
    console.error(
      "Create order error:",
      err.response?.data || err
    );

    if (err.response?.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      navigate("/login");
      return;
    }

    setError(
      err.response?.data?.detail ||
      "Unable to create your order. Please try again."
    );

  } finally {
    setLoading(false);
  }
};

  // Prevent checkout with empty cart
  if (cartItems.length === 0) {

    return (
      <main className="min-h-screen bg-gray-50 px-4 pb-16 pt-28">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>

          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">
              Your cart is empty
            </h2>

            <p className="mt-2 text-gray-500">
              Add products before proceeding to checkout.
            </p>

            <Link
              to="/products"
              className="mt-6 inline-block rounded-xl bg-[#10265A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0b1d45]"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 pb-16 pt-28">
      <div className="mx-auto max-w-6xl">
        {/* Page Header */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Checkout
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Complete Your Order
          </h1>

          <p className="mt-2 text-gray-600">
            Enter your shipping information and select your payment method.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]"
        >
          {/* LEFT SIDE */}
          <div className="space-y-8">
            {/* Shipping Information */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900">
                Shipping Information
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Where should we deliver your order?
              </p>

              <div className="mt-6 space-y-5">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullname"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Full Name
                  </label>

                  <input
                    id="fullname"
                    name="fullname"
                    type="text"
                    value={form.fullname}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full rounded-xl border border-gray-300 px-4 py-3.5 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-2 focus:ring-gray-200"
                  />
                </div>

                {/* Address */}
                <div>
                  <label
                    htmlFor="address"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Address
                  </label>

                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="House number, street, barangay"
                    required
                    className="w-full rounded-xl border border-gray-300 px-4 py-3.5 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-2 focus:ring-gray-200"
                  />
                </div>

                {/* City + Postal Code */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="city"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      City
                    </label>

                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="City"
                      required
                      className="w-full rounded-xl border border-gray-300 px-4 py-3.5 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-2 focus:ring-gray-200"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="postalCode"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      Postal Code
                    </label>

                    <input
                      id="postalCode"
                      name="postalCode"
                      type="text"
                      value={form.postalCode}
                      onChange={handleChange}
                      placeholder="Postal code"
                      required
                      className="w-full rounded-xl border border-gray-300 px-4 py-3.5 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-2 focus:ring-gray-200"
                    />
                  </div>
                </div>

                {/* Country */}
                <div>
                  <label
                    htmlFor="country"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Country
                  </label>

                  <input
                    id="country"
                    name="country"
                    type="text"
                    value={form.country}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-gray-900 outline-none"
                  />
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900">
                Payment Method
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Select how you want to pay.
              </p>

              <div className="mt-6">
                <label
                  className={`flex cursor-pointer items-center gap-4 rounded-xl border p-5 transition ${
                    paymentMethod === "xendit"
                      ? "border-[#10265A] bg-blue-50"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="xendit"
                    checked={paymentMethod === "xendit"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4"
                  />

                  <div>
                    <p className="font-bold text-gray-900">Xendit</p>

                    <p className="mt-1 text-sm text-gray-500">
                      Secure online payment
                    </p>
                  </div>
                </label>
              </div>
            </section>
          </div>

          {/* RIGHT SIDE */}
          <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>

            {/* Products */}
            <div className="mt-6 space-y-5">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-gray-50">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.product_name}
                        className="h-14 w-14 object-contain"
                      />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {item.product_name}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="text-sm font-semibold text-gray-900">
                    ${(Number(item.product_price) * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-6 space-y-3 border-t border-gray-200 pt-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>

                <span className="font-semibold">${cartTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>

                <span className="font-semibold">Free</span>
              </div>

              <div className="flex justify-between border-t border-gray-200 pt-4">
                <span className="font-bold text-gray-900">Total</span>

                <span className="text-xl font-bold text-[#10265A]">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-6 w-full rounded-xl bg-[#10265A] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#0b1d45]"
            >
              Continue to Payment
            </button>

            <Link
              to="/cart"
              className="mt-4 block text-center text-sm font-semibold text-gray-600 hover:text-black"
            >
              ← Back to Cart
            </Link>
          </aside>
        </form>
      </div>
    </main>
  );
};

export default Checkout;
