import { Link } from "react-router-dom";

const PaymentCancel = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl text-red-600">
            ×
          </div>
        </div>

        <h1 className="mt-5 text-2xl font-bold text-gray-900">
          Payment Cancelled
        </h1>

        <p className="mt-3 text-gray-600">
          Your payment was not completed.
        </p>

        <Link
          to="/profile"
          className="mt-7 inline-block w-full rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
        >
          Back to My Orders
        </Link>

        <Link
          to="/"
          className="mt-3 inline-block text-sm font-semibold text-gray-600 transition hover:text-black"
        >
          Back to Homepage
        </Link>
      </div>
    </main>
  );
};

export default PaymentCancel;