const guideSteps = [
  {
    title: "BROWSE",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-11 w-11"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7 3h8.5A2.5 2.5 0 0 1 18 5.5V21l-5-3-5 3V5.5A2.5 2.5 0 0 1 10.5 3H17"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8h6M9 11h4" />
        <circle cx="12" cy="15" r="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m13.5 16.5 2 2" />
      </svg>
    ),
  },
  {
    title: "ADD TO CART",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2Zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2ZM7.2 14.5h7.45c.75 0 1.41-.41 1.75-1.03L21 5H6.21L5.27 3H2v2h2l3.6 7.59-1.35 2.44C5.52 16.37 6.48 18 8 18h12v-2H8l1.2-1.5Z" />
      </svg>
    ),
  },
  {
    title: "CHECKOUT",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 5h2l2.2 10.5h8.9l2-7.5H8"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 3v5m0 0L8 6m2 2 2-2"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 3v5m0 0-2-2m2 2 2-2"
        />
        <circle cx="9" cy="20" r="1.4" />
        <circle cx="17" cy="20" r="1.4" />
      </svg>
    ),
  },
  {
    title: "PAYMENT",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="3" y="6" width="15" height="11" rx="2" />
        <rect x="13" y="10" width="8" height="5" rx="1" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 12.5h.01" />
      </svg>
    ),
  },
  {
    title: "THEN WAIT",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <rect x="5" y="4" width="14" height="16" rx="2" fill="currentColor" />
        <path
          stroke="#ffffff"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 9.5h6M9 13h6M9 16.5h4"
        />
        <circle cx="8" cy="7" r="1.3" stroke="#ffffff" />
        <circle cx="16" cy="7" r="1.3" stroke="#ffffff" />
      </svg>
    ),
  },
];

const GuideShop = () => {
  return (
    <section id="guide" className="bg-[#10265A] px-6 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Header Text */}
        <div className="max-w-4xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-200">
            Simple Shopping Process
          </p>

          <h2 className="text-3xl font-bold tracking-wide md:text-4xl">
            ONE STOP ONE SHOP
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-7 text-white/90 md:text-lg">
            Find everything you need for your networking environment in one
            convenient place. Browse our products, add your selected items to
            the cart, complete your checkout and payment, then wait for your
            order to arrive.
          </p>
        </div>

        {/* Guide Cards */}
        <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5 lg:gap-8">
          {guideSteps.map((step) => (
            <div
              key={step.title}
              className="group flex min-h-40 flex-col items-center justify-center rounded-2xl bg-white px-4 py-6 text-center text-[#10265A] shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Icon */}
              <div className="mb-5 flex h-14 items-center justify-center transition duration-300 group-hover:scale-110">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-sm font-extrabold tracking-wide md:text-base">
                {step.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuideShop;
