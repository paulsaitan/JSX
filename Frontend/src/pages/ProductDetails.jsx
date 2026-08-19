import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../api/base";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(`${BASE_URL}/api/products/${id}/`);

        setProduct(response.data);
      } catch (err) {
        console.error(
          "Error loading product:",
          err.response?.data || err.message,
        );

        setError("Unable to load this product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-[#10265A]" />

          <p className="mt-4 text-sm text-gray-600">Loading product...</p>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900">Product Not Found</h2>

          <p className="mt-2 text-sm text-gray-500">
            {error || "This product does not exist."}
          </p>

          <Link
            to="/products"
            className="mt-6 inline-block rounded-lg bg-[#10265A] px-6 py-3 text-sm font-semibold text-white"
          >
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  const productImage = product.image;
  <img
    src={productImage}
    alt={product.product_name}
    className="max-h-[380px] w-full object-contain"
    onError={(e) => {
      console.log("Image failed:", e.currentTarget.src);
    }}
  />;

  const total = Number(product.product_price || 0) * quantity;

  return (
    <main className="min-h-screen bg-gray-50 px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Back */}
        <Link
          to="/products"
          className="mb-8 inline-flex text-sm font-semibold text-gray-600 transition hover:text-black"
        >
          ← Back to Products
        </Link>

        {/* Product Card */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-2">
            {/* Product Image */}
            <div className="flex min-h-[400px] items-center justify-center bg-gray-50 p-10">
              {productImage ? (
                <img
                  src={productImage}
                  alt={product.product_name}
                  className="max-h-[380px] w-full object-contain"
                />
              ) : (
                <div className="flex h-80 w-full items-center justify-center text-gray-400">
                  No Image Available
                </div>
              )}
            </div>

            {/* Product Information */}
            <div className="flex flex-col justify-center p-8 sm:p-12">
              {/* Brand */}
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                {product.brand}
              </p>

              {/* Name */}
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {product.product_name}
              </h1>

              {/* Price */}
              <p className="mt-6 text-3xl font-bold text-[#10265A]">
                ${product.product_price}
              </p>

              {/* Description */}
              {product.description && (
                <div className="mt-6">
                  <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
                    Description
                  </h2>

                  <p className="mt-2 leading-7 text-gray-600">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Quantity */}
              <div className="mt-8">
                <p className="mb-3 text-sm font-semibold text-gray-700">
                  Quantity
                </p>

                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    className="flex h-11 w-11 items-center justify-center rounded-l-lg border border-gray-300 bg-gray-50 text-lg font-semibold hover:bg-gray-100"
                  >
                    −
                  </button>

                  <div className="flex h-11 w-14 items-center justify-center border-y border-gray-300 text-sm font-semibold">
                    {quantity}
                  </div>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    className="flex h-11 w-11 items-center justify-center rounded-r-lg border border-gray-300 bg-gray-50 text-lg font-semibold hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
                <span className="text-sm font-semibold text-gray-600">
                  Total
                </span>

                <span className="text-xl font-bold text-gray-900">
                  ${total.toFixed(2)}
                </span>
              </div>

              {/* Add to Cart */}
              <button
                type="button"
                onClick={() => addToCart(product, quantity)}
                className="mt-6 w-full rounded-xl bg-[#10265A] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#0b1d45]"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductDetails;
