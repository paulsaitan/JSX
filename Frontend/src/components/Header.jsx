import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-7xl items-center px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-lg font-bold text-white">
            S
          </div>

          <span className="text-xl font-bold tracking-tight text-gray-900">
            AedzPaul
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="ml-auto hidden items-center gap-10 md:flex">
          {/* Home */}
          <Link
            to="/"
            className="text-sm font-medium text-gray-700 transition hover:text-black"
          >
            Home
          </Link>

          {/* Products */}
          <Link
            to="/products"
            className="text-sm font-medium text-gray-700 transition hover:text-black"
          >
            Products
          </Link>

          {/* How It Works */}
          <Link
            to="/#guide"
            className="text-sm font-medium text-gray-700 transition hover:text-black"
          >
            How It Works
          </Link>
        </div>

        <Link
          to="/cart"
          className="relative flex items-center gap-2 text-sm font-semibold text-gray-700 transition hover:text-[#10265A]"
        >
          <span className="text-xl">🛒</span>

          <span>Cart</span>

          {cartCount > 0 && (
            <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Authentication Buttons */}
        <div className="ml-10 hidden items-center gap-3 md:flex">
          {/* Log In */}
          <Link
            to="/login"
            className="rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Log In
          </Link>

          {/* Register */}
          <Link
            to="/register"
            className="rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="ml-auto rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-gray-200 bg-white px-6 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {/* Home */}
            <Link
              to="/"
              onClick={closeMenu}
              className="font-medium text-gray-700 transition hover:text-black"
            >
              Home
            </Link>

            {/* Products */}
            <Link
              to="/products"
              onClick={closeMenu}
              className="font-medium text-gray-700 transition hover:text-black"
            >
              Products
            </Link>

            {/* How It Works */}
            <Link
              to="/#guide"
              onClick={closeMenu}
              className="font-medium text-gray-700 transition hover:text-black"
            >
              How It Works
            </Link>

            {/* Authentication */}
            <div className="flex gap-3 border-t border-gray-200 pt-4">
              <Link
                to="/login"
                onClick={closeMenu}
                className="flex-1 rounded-lg bg-black px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Log In
              </Link>

              <Link
                to="/register"
                onClick={closeMenu}
                className="flex-1 rounded-lg bg-black px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
