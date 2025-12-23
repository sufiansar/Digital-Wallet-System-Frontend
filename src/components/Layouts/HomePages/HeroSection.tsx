import { Star } from "lucide-react";
import heroImage from "../../../assets/Mockup-1.png";

export default function HeroSection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Main Heading - Centered */}
        <div className="space-y-2 text-center mb-12 md:mb-16">
          <h1 className="text-sm font-semibold text-purple-900 tracking-wider uppercase">
            E-WALLET & PAYMENT GATEWAY
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-purple-400  leading-tight">
            The Future of
          </h1>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold  text-purple-950
           "
          >
            Digital Payments!
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
          {/* Left Column - Image & Activities */}
          <div className="lg:w-1/2 relative w-full">
            <div className="relative">
              <img
                src={heroImage}
                alt="Mobile Banking App"
                className="w-full rounded-3xl shadow-2xl object-cover"
              />

              {/* Overlay Card */}
              <div className="absolute -bottom-8 lg:-bottom-6 lg:-right-6 left-1/2 transform -translate-x-1/2 lg:translate-x-0 bg-white dark:bg-gray-800 rounded-2xl p-5 sm:p-6 shadow-2xl w-11/12 sm:w-80">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                  Recent Transactions
                </h3>
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">
                      Salary Received
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      $1,250.00
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">
                      Product Sale
                    </span>
                    <span className="font-bold text-green-600 dark:text-green-400">
                      +$150.00
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">
                      Premium Subscription
                    </span>
                    <span className="font-bold text-green-600 dark:text-green-400">
                      +$50.00
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">
                      Bill Payment
                    </span>
                    <span className="font-bold text-red-600 dark:text-red-400">
                      -$300.00
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Activity Section Below */}
            <div className="mt-20 sm:mt-24 bg-white dark:bg-gray-800 rounded-2xl p-5 sm:p-6 shadow-xl w-full">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                Recent Activities
              </h3>
              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">
                    Salary Received
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    $1,250.00
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">
                    Product Sale
                  </span>
                  <span className="font-bold text-green-600 dark:text-green-400">
                    +$150.00
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">
                    Premium Subscription
                  </span>
                  <span className="font-bold text-green-600 dark:text-green-400">
                    +$50.00
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">
                    Bill Payment
                  </span>
                  <span className="font-bold text-red-600 dark:text-red-400">
                    -$300.00
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:w-1/2 w-full flex flex-col justify-start gap-10 lg:gap-12 mt-10 lg:mt-0">
            {/* Main Content Section */}
            <div className="space-y-5 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Pay, Transfer & Manage Money
              </h2>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-purple-600 dark:text-purple-400">
                Effortlessly & Securely
              </h3>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                Send money to friends, pay bills, and manage your finances—all
                in one app. Enjoy secure transactions and real-time tracking.
              </p>

              {/* Get Started Button */}
              <button className="px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r bg-purple-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl">
                Get Started
              </button>
            </div>

            {/* Dashboard Info Box */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-5 sm:p-6">
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                Track your spending, analyze your transactions, and stay in
                control of your finances with our intuitive dashboard. Your
                money, simplified.
              </p>
            </div>

            {/* Rating Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-5 sm:w-6 h-5 sm:h-6 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <div className="flex items-baseline gap-2 sm:gap-3">
                <span className="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white">
                  8.5
                </span>
                <span className="text-sm sm:text-lg text-gray-600 dark:text-gray-400">
                  Trusted by thousands of users worldwide
                </span>
              </div>

              {/* User Avatars */}
              <div className="flex items-center gap-3 sm:gap-4 pt-3 sm:pt-4">
                <div className="flex -space-x-2 sm:-space-x-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-pink-300 dark:bg-pink-600 border-2 sm:border-4 border-white dark:border-gray-800"></div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-400 dark:bg-blue-700 border-2 sm:border-4 border-white dark:border-gray-800"></div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-300 dark:bg-purple-700 border-2 sm:border-4 border-white dark:border-gray-800"></div>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-600 dark:bg-purple-800 border-2 sm:border-4 border-white dark:border-gray-800 flex items-center justify-center text-white font-bold text-sm sm:text-xl">
                  +
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
