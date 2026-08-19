import React from "react";

const Cart = () => {
  const cartItems = [
    {
      id: 1,
      name: "Cisco Product Name",
      price: 29999,
      quantity: 1,
      image: "/images/cisco-product.png",
    },
    {
      id: 2,
      name: "Cisco Product Name",
      price: 29999,
      quantity: 1,
      image: "/images/cisco-product.png",
    },
  ];

  const subTotal = 29999;
  const total = 29999;

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="mx-auto w-full max-w-3xl px-4">

        {/* Shopping Cart */}
        <div className="border border-gray-200 bg-white px-8 py-10 shadow-md">
          <h1 className="mb-6 text-3xl font-bold text-black">
            Shopping Cart
          </h1>

          <div>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-gray-500 py-5"
              >
                {/* Product */}
                <div className="flex items-center gap-8">
                  <div className="flex h-16 w-24 items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div>
                    <h2 className="text-sm font-semibold text-black">
                      {item.name}
                    </h2>

                    <div className="mt-1 flex items-center gap-2 text-xs">
                      <span>Qty :</span>

                      <button className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 shadow">
                        -
                      </button>

                      <span className="font-medium">{item.quantity}</span>

                      <button className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 shadow">
                        +
                      </button>
                    </div>

                    <p className="mt-1 text-xs font-medium">
                      Price: ${item.price}
                    </p>
                  </div>
                </div>

                {/* Remove */}
                <button
                  type="button"
                  className="flex h-6 w-6 items-center justify-center rounded-full text-xl text-black transition hover:bg-gray-100"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="mt-10 border border-gray-100 bg-white px-8 py-8 shadow-md">
          <h2 className="mb-7 text-center text-2xl font-bold text-black">
            Order Summary
          </h2>

          <div className="flex items-center justify-between border-b border-gray-400 px-4 pb-6 text-sm font-semibold">
            <span>Sub Total</span>
            <span>${subTotal}</span>
          </div>

          <div className="flex items-center justify-between px-4 py-6 text-sm font-semibold">
            <span>Total</span>
            <span>${total}</span>
          </div>

          <div className="px-8">
            <button
              type="button"
              className="w-full rounded-lg bg-[#10275e] py-3 text-sm font-medium text-white transition hover:bg-[#0c1d47]"
            >
              Checkout
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;