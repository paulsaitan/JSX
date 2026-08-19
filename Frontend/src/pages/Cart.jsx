import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const {
    cartItems,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 pb-16 pt-28">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold text-gray-900">
            Shopping Cart
          </h1>

          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">
              Your cart is empty
            </h2>

            <p className="mt-2 text-gray-500">
              Add some products before proceeding to checkout.
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

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Shopping Cart
          </h1>

          <p className="mt-2 text-gray-600">
            Review your selected products before checkout.
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_350px]">

          {/* Cart Items */}
          <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="divide-y divide-gray-200">

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center"
                >

                  {/* Product Image */}
                  <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-xl bg-gray-50">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.product_name}
                        className="h-24 w-24 object-contain"
                      />
                    ) : (
                      <span className="text-xs text-gray-400">
                        No Image
                      </span>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                      {item.brand}
                    </p>

                    <h2 className="mt-1 font-bold text-gray-900">
                      {item.product_name}
                    </h2>

                    <p className="mt-2 text-sm font-semibold text-gray-700">
                      ${Number(item.product_price).toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item.id)}
                      className="flex h-9 w-9 items-center justify-center rounded-l-lg border border-gray-300 bg-gray-50 hover:bg-gray-100"
                    >
                      −
                    </button>

                    <div className="flex h-9 w-12 items-center justify-center border-y border-gray-300 text-sm font-semibold">
                      {item.quantity}
                    </div>

                    <button
                      type="button"
                      onClick={() => increaseQuantity(item.id)}
                      className="flex h-9 w-9 items-center justify-center rounded-r-lg border border-gray-300 bg-gray-50 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">
                      $
                      {(
                        Number(item.product_price) *
                        item.quantity
                      ).toFixed(2)}
                    </p>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="mt-2 text-xs font-semibold text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>

                </div>
              ))}

            </div>
          </section>

          {/* Order Summary */}
          <section className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold text-gray-900">
              Order Summary
            </h2>

            <div className="mt-6 flex justify-between text-sm">
              <span className="text-gray-600">
                Subtotal
              </span>

              <span className="font-semibold">
                ${cartTotal.toFixed(2)}
              </span>
            </div>

            <div className="mt-3 flex justify-between text-sm">
              <span className="text-gray-600">
                Shipping
              </span>

              <span className="font-semibold">
                Calculated at checkout
              </span>
            </div>

            <div className="mt-6 border-t border-gray-200 pt-6">

              <div className="flex items-center justify-between">
                <span className="font-bold">
                  Total
                </span>

                <span className="text-xl font-bold text-[#10265A]">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>

            </div>

            <Link
              to="/checkout"
              className="mt-6 block w-full rounded-xl bg-[#10265A] px-6 py-4 text-center text-sm font-bold text-white transition hover:bg-[#0b1d45]"
            >
              Proceed to Checkout
            </Link>

            <Link
              to="/products"
              className="mt-4 block text-center text-sm font-semibold text-gray-600 hover:text-black"
            >
              Continue Shopping
            </Link>

          </section>

        </div>
      </div>
    </main>
  );
};

export default Cart;