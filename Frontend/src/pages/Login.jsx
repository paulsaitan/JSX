import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../api/base";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setError("");
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${BASE_URL}/api/token/`, {
        username: form.username,
        password: form.password,
      });

      console.log("LOGIN RESPONSE:", response.data);

      // Make sure tokens exist
      if (!response.data.access) {
        setError("Login succeeded but no access token was returned.");
        return;
      }

      localStorage.setItem("access_token", response.data.access);

      if (response.data.refresh) {
        localStorage.setItem("refresh_token", response.data.refresh);
      }

      console.log("SAVED TOKEN:", localStorage.getItem("access_token"));

      navigate("/profile");
    } catch (err) {
      console.error("Login error:", err.response?.data || err);

      setError(err.response?.data?.detail || "Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 sm:px-6 lg:px-8">
      {/* CENTERED CARD */}
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl lg:grid-cols-2">
        {/* =====================================================
            LEFT SIDE - BRANDING
        ====================================================== */}
        <div className="relative hidden bg-[#10265A] p-10 text-white lg:flex lg:flex-col lg:justify-between">
          {/* Logo */}
          <div>
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-lg font-bold text-[#10265A]">
                AP
              </div>

              <span className="text-2xl font-bold">AedzPaul</span>
            </Link>

            {/* Welcome */}
            <div className="mt-20">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-200">
                Welcome Back
              </p>

              <h1 className="mt-5 text-4xl font-bold leading-tight">
                Manage your networking solutions in one place.
              </h1>

              <p className="mt-6 max-w-md leading-7 text-blue-100">
                Sign in to access your AedzPaul account, explore networking
                products, and manage your orders.
              </p>
            </div>
          </div>

          <p className="text-sm text-blue-200">
            Secure access to your AedzPaul account.
          </p>
        </div>

        {/* =====================================================
            RIGHT SIDE - LOGIN FORM
        ====================================================== */}
        <div className="p-8 sm:p-12 lg:p-14">
          {/* Mobile Logo */}
          <div className="mb-10 flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#10265A] text-sm font-bold text-white">
              AP
            </div>

            <span className="text-xl font-bold text-gray-900">AedzPaul</span>
          </div>

          {/* Header */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              Account Login
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
              Welcome back
            </h2>

            <p className="mt-3 text-gray-600">
              Enter your account details to continue.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Username
              </label>

              <input
                id="username"
                name="username"
                type="text"
                value={form.username}
                onChange={onChange}
                placeholder="Enter your username"
                autoComplete="username"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3.5 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-2 focus:ring-gray-200"
              />
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Password
                </label>

                <a
                  href="#"
                  className="text-sm font-semibold text-blue-600 transition hover:text-blue-800"
                >
                  Forgot Password?
                </a>
              </div>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={onChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
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

            {/* Remember Me */}
            <div className="flex items-center gap-3 pt-1">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
              />

              <label htmlFor="remember" className="text-sm text-gray-600">
                Remember me
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-black px-6 py-3.5 font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          {/* Register */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-black transition hover:text-blue-600"
            >
              Create an account
            </Link>
          </p>

          {/* Back */}
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

export default Login;
