const Hero = () => {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gray-50 pt-32 pb-20"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:px-8">
        {/* Left Content */}
        <div>
          {/* Small Label */}
          <span className="inline-block rounded-full bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700">
            Cisco Networking Solutions
          </span>

          {/* Main Heading */}
          <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight text-gray-900 lg:text-6xl">
            Shop smarter.
            <span className="block text-gray-500">Build better.</span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Discover reliable Cisco networking products designed for businesses,
            organizations, and IT professionals. Find the right networking
            solutions to build secure, reliable, and high- performance networks.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            {/* Shop Now */}
            <a
              href="#products"
              className="rounded-xl bg-black px-7 py-3.5 font-semibold text-white transition hover:bg-gray-800"
            >
              Shop Now
            </a>

            {/* How It Works */}
            <a
              href="#guide"
              className="rounded-xl border border-gray-300 bg-white px-7 py-3.5 font-semibold text-gray-900 transition hover:bg-gray-100"
            >
              How It Works
            </a>
          </div>

          {/* Statistics */}
          <div className="mt-10 flex flex-wrap gap-10 border-t border-gray-200 pt-8">
            <div>
              <p className="text-2xl font-bold text-gray-900">500+</p>
              <p className="text-sm text-gray-500">Products</p>
            </div>

            <div>
              <p className="text-2xl font-bold text-gray-900">10K+</p>
              <p className="text-sm text-gray-500">Customers</p>
            </div>

            <div>
              <p className="text-2xl font-bold text-gray-900">24/7</p>
              <p className="text-sm text-gray-500">Support</p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl bg-gray-200 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80"
              alt="Cisco networking equipment"
              className="h-[500px] w-full object-cover"
            />
          </div>

          {/* Floating Information Card */}
          <div className="absolute bottom-6 left-6 rounded-2xl bg-white p-5 shadow-xl">
            <p className="text-sm text-gray-500">Featured Collection</p>

            <h3 className="mt-1 font-bold text-gray-900">Cisco Networking</h3>

            <p className="mt-1 text-sm text-gray-500">Enterprise Solutions</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
