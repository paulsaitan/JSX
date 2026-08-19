const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <a href="#home" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg font-bold text-black">
                AP
              </div>

              <span className="text-xl font-bold tracking-tight">AedzPaul</span>
            </a>

            <p className="mt-5 max-w-sm text-sm leading-6 text-gray-400">
              Your trusted destination for reliable Cisco networking solutions
              designed for businesses, organizations, and IT professionals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="#home"
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#products"
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  Products
                </a>
              </li>

              <li>
                <a
                  href="#guide"
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Support
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  Help Center
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  Contact Us
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  Shipping Information
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  Returns & Refunds
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Contact Us
            </h3>

            <div className="mt-5 space-y-3 text-sm text-gray-400">
              <p>Email: support@aedzpaul.com</p>

              <p>Phone: (02) 555-0199</p>

              <p>Monday - Friday</p>

              <p>8:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-gray-800" />

        {/* Bottom Footer */}
        <div className="flex flex-col gap-4 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} AedzPaul. All rights reserved.</p>

          <div className="flex gap-6">
            <a href="#" className="transition hover:text-white">
              Privacy Policy
            </a>

            <a href="#" className="transition hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
