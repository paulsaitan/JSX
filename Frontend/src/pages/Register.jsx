import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    alert("Registration submitted!");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-2">
        {/* Left Side - Branding */}
        <div className="hidden bg-[#10265A] p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl font-bold text-[#10265A]">
                AP
              </div>

              <span className="text-2xl font-bold">AedzPaul</span>
            </Link>

            {/* Welcome Text */}
            <div className="mt-20">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-200">
                Join AedzPaul
              </p>

              <h1 className="mt-5 text-4xl font-bold leading-tight">
                Build better networks with the right solutions.
              </h1>

              <p className="mt-6 max-w-md leading-7 text-blue-100">
                Create your AedzPaul account and explore reliable networking
                products designed for businesses, organizations, and IT
                professionals.
              </p>
            </div>
          </div>

          <p className="text-sm text-blue-200">
            Your networking solutions, all in one place.
          </p>
        </div>

        {/* Right Side - Registration Form */}
        <div className="p-8 sm:p-12 lg:p-14">
          {/* Mobile Logo */}
          <div className="mb-10 flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-lg font-bold text-white">
              AP
            </div>

            <span className="text-xl font-bold text-gray-900">AedzPaul</span>
          </div>

          {/* Header */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              Create Account
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
              Get started with AedzPaul Shop
            </h2>

            <p className="mt-3 text-gray-600">
              Create your account to start exploring our products.
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Full Name
              </label>

              <input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3.5 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-2 focus:ring-gray-200"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3.5 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-2 focus:ring-gray-200"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3.5 pr-20 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-2 focus:ring-gray-200"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500 transition hover:text-black"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Confirm Password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3.5 pr-20 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-2 focus:ring-gray-200"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500 transition hover:text-black"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 pt-1">
              <input
                id="terms"
                type="checkbox"
                required
                className="mt-1 h-4 w-4 rounded border-gray-300"
              />

              <label
                htmlFor="terms"
                className="text-sm leading-5 text-gray-600"
              >
                I agree to the{" "}
                <a
                  href="#"
                  className="font-semibold text-black hover:text-blue-600"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="font-semibold text-black hover:text-blue-600"
                >
                  Privacy Policy
                </a>
                .
              </label>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full rounded-xl bg-black px-6 py-3.5 font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-black transition hover:text-blue-600"
            >
              Log In
            </Link>
          </p>

          {/* Back to Shop */}
          <div className="mt-8 border-t border-gray-200 pt-6 text-center">
            <Link
              to="/"
              className="text-sm font-semibold text-gray-600 transition hover:text-black"
            >
              ← Back to Shop
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
