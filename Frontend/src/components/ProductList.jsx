import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../api/base";

const ProductList = ({ showAll = false }) => {
  const [products, setProducts] = useState([]);

  const ProductData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/products/`);

      console.log("Product API Response:", response.data);

      // Make sure products is always an array
      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else if (Array.isArray(response.data.products)) {
        setProducts(response.data.products);
      } else {
        console.error("Unexpected product API response:", response.data);
        setProducts([]);
      }
    } catch (err) {
      console.error("Error loading products:", err);
      setProducts([]);
    }
  };

  useEffect(() => {
    ProductData();
  }, []);

  // Home = 3 products
  // Products page = all products
  const displayedProducts = showAll ? products : products.slice(0, 3);

  return (
    <section className="bg-white px-6 py-16">
      {/* Heading */}
      <div className="mb-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
          Our Products
        </p>

        <h2 className="text-2xl font-extrabold tracking-wide text-[#10265A] md:text-3xl">
          PRODUCT LIST
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-gray-600">
          Explore our selection of Cisco networking products designed for
          businesses, organizations, and professional IT environments.
        </p>
      </div>

      {/* Product Grid */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {displayedProducts.map((item) => (
          <article
            key={item.id}
            className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Product Image */}
            <div className="flex h-52 items-center justify-center bg-gray-50">
              <img
                src={item.image}
                alt={item.product_name}
                className="h-40 w-full object-contain p-6"
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-1 flex-col justify-between px-6 pb-6 pt-5">
              {/* Name + Price */}
              <div className="mb-1 flex items-start justify-between gap-4">
                <p className="text-sm font-semibold text-gray-800">
                  {item.product_name}
                </p>

                <p className="whitespace-nowrap text-sm font-semibold text-gray-700">
                  ${item.product_price}
                </p>
              </div>

              {/* Brand */}
              <p className="mb-4 text-xs font-medium uppercase tracking-wide text-gray-500">
                {item.brand}
              </p>

              {/* Buy Button */}
              <Link
                to={`/products/${item.id}`}
                className="self-end rounded bg-[#10265A] px-4 py-1.5 text-xs font-semibold tracking-wide text-white transition hover:bg-[#0b1d45]"
              >
                BUY
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* No Products */}
      {products.length === 0 && (
        <div className="mt-10 text-center text-gray-500">
          No products available.
        </div>
      )}

      {/* View All Products Button */}
      {!showAll && products.length > 3 && (
        <div className="mt-14 flex justify-center">
          <Link
            to="/products"
            className="rounded bg-[#10265A] px-8 py-2.5 text-sm font-semibold tracking-wide text-white transition hover:bg-[#0b1d45]"
          >
            View All Products
          </Link>
        </div>
      )}
    </section>
  );
};

export default ProductList;
