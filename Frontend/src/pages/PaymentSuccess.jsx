import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
        
        <div className="text-5xl">✓</div>

        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          Payment Successful!
        </h1>

        <p className="mt-3 text-gray-600">
          Your payment has been completed successfully.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block rounded-xl bg-black px-6 py-3 font-semibold text-white"
        >
          Back to Homepage
        </Link>

      </div>
    </main>
  );
};

export default PaymentSuccess;