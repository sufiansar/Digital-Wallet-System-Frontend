import Logo from "@/assets/Logo";
import { Button } from "../ui/button";

function Footer() {
  return (
    <footer className="container mx-auto  ">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-start lg:gap-8">
          {/* Logo */}
          <div className="text-teal-600 dark:text-teal-300">
            <Logo />
          </div>

          {/* Newsletter / updates */}
          <div className="mt-8 grid grid-cols-2 gap-8 lg:mt-0 lg:grid-cols-5 lg:gap-y-16">
            <div className="col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Stay Updated!
              </h2>
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Subscribe to get the latest updates on your wallet,
                transactions, and new features.
              </p>

              <form className="mt-4 w-full">
                <label htmlFor="UserEmail" className="sr-only">
                  Email
                </label>
                <div className="border border-gray-100 p-2 focus-within:ring-3 sm:flex sm:items-center sm:gap-4 dark:border-gray-800">
                  <input
                    type="email"
                    id="UserEmail"
                    placeholder="you@example.com"
                    className="w-full border-none focus:border-transparent focus:ring-transparent sm:text-sm dark:bg-gray-900 dark:text-white"
                  />
                  <Button className="mt-1 w-full  px-6 py-3 text-sm font-bold  uppercase transition hover:bg-teal-600 sm:mt-0 sm:w-auto sm:shrink-0">
                    Subscribe
                  </Button>
                </div>
              </form>
            </div>

            {/* Services */}
            <div className="col-span-2 sm:col-span-1">
              <p className="font-medium text-gray-900 dark:text-white">
                Wallet Services
              </p>
              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-700 hover:opacity-75 dark:text-gray-200"
                  >
                    Send Money
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-700 hover:opacity-75 dark:text-gray-200"
                  >
                    Cash In / Out
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-700 hover:opacity-75 dark:text-gray-200"
                  >
                    Transaction History
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-700 hover:opacity-75 dark:text-gray-200"
                  >
                    Agent Requests
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-700 hover:opacity-75 dark:text-gray-200"
                  >
                    Wallet Management
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="col-span-2 sm:col-span-1">
              <p className="font-medium text-gray-900 dark:text-white">
                Company
              </p>
              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-700 hover:opacity-75 dark:text-gray-200"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-700 hover:opacity-75 dark:text-gray-200"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-700 hover:opacity-75 dark:text-gray-200"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="col-span-2 sm:col-span-1">
              <p className="font-medium text-gray-900 dark:text-white">Legal</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-700 hover:opacity-75 dark:text-gray-200"
                  >
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-700 hover:opacity-75 dark:text-gray-200"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-700 hover:opacity-75 dark:text-gray-200"
                  >
                    Refund Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-100 pt-8 dark:border-gray-800">
          <div className="sm:flex sm:justify-between">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              &copy; 2025 Digital Wallet System. All rights reserved.
            </p>
            <ul className="mt-4 flex flex-wrap gap-4 text-xs sm:mt-0 lg:justify-end">
              <li>
                <a
                  href="#"
                  className="text-gray-500 hover:opacity-75 dark:text-gray-400"
                >
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 hover:opacity-75 dark:text-gray-400"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 hover:opacity-75 dark:text-gray-400"
                >
                  Help
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
