import { Card, CardContent } from "@/components/ui/card";
import { Wallet, Shield, Zap, Globe } from "lucide-react";
import heroMockupImage from "../../../assets/Mockup-3.png";
import manImage from "../../../assets/man.png";

export default function WhyChooseSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-muted-foreground tracking-wider uppercase mb-4">
            WHY CHOOSE US
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            Why Millions Trust Us for Their Payments
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam,
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Left Card - Full height with absolutely positioned half image */}
          <Card className="bg-orange-100 dark:bg-orange-900/20 border-0 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full relative">
            <CardContent className="p-6 h-full flex flex-col">
              {/* Icon */}
              <div className="mb-4">
                <div className="bg-background p-3 rounded-full w-14 h-14 flex items-center justify-center shadow-sm mb-4">
                  <Wallet className="w-7 h-7 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground">
                  The Best Payment Experience
                </h3>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col">
                <p className="text-muted-foreground mb-6"></p>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm">Instant transactions</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm">Multi-currency support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm">24/7 customer support</span>
                  </li>
                </ul>
              </div>

              {/* Absolutely positioned half image */}
              <div className="absolute right-0 bottom-0 w-1/2 h-1/2 overflow-hidden">
                <div className="relative w-full h-full">
                  <img
                    src={heroMockupImage}
                    alt="Payment App Interface"
                    className="w-full h-full object-cover object-left-top rounded-tl-3xl"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Middle Card - Smaller height */}
          <div className="flex flex-col">
            <Card className="bg-primary border-0 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex-1">
              <CardContent className="p-8 text-center text-primary-foreground flex flex-col justify-center items-center h-full min-h-[250px]">
                <div className="space-y-4">
                  <div className="bg-primary-foreground/10 p-4 rounded-2xl w-20 h-20 mx-auto flex items-center justify-center">
                    <Globe className="w-10 h-10" />
                  </div>
                  <h3 className="text-5xl md:text-6xl font-bold">275+</h3>
                  <div className="space-y-2">
                    <h4 className="text-lg md:text-xl font-semibold">
                      Fintech & Merchants
                    </h4>
                    <p className="text-primary-foreground/80 text-sm">
                      Worldwide Partnership
                    </p>
                  </div>
                  <p className="text-primary-foreground/70 text-xs md:text-sm leading-relaxed pt-4 border-t border-primary-foreground/20 mt-4">
                    wallet integrations with top fintech companies and merchants
                    globally.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card border-0 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full relative">
            <CardContent className="p-6 h-full flex flex-col">
              {/* Icon - Right aligned */}
              <div className="mb-4 text-right">
                <div className="bg-gray-900 dark:bg-gray-800 p-3 rounded-full w-14 h-14 flex items-center justify-center shadow-sm ml-auto mb-4">
                  <Shield className="w-7 h-7 text-white dark:text-gray-200" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground text-right">
                  Future of Payments
                  <br />
                  Together
                </h3>
              </div>

              {/* Content - Right aligned */}
              <div className="flex-1 flex flex-col">
                <p className="text-muted-foreground mb-6 text-right"></p>

                <ul className="space-y-3 mb-12">
                  <li className="flex items-center gap-3 justify-end">
                    <span className="text-sm">Enterprise security</span>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </li>
                  <li className="flex items-center gap-3 justify-end">
                    <span className="text-sm">Global reach</span>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </li>
                  <li className="flex items-center gap-3 justify-end">
                    <span className="text-sm">Scalable solutions</span>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </li>
                </ul>
              </div>

              <div className="absolute left-0 bottom-0 w-1/2 h-1/2 overflow-hidden">
                <div className="relative w-full h-full">
                  <img
                    src={manImage}
                    alt="Happy Customer"
                    className="w-full h-full object-cover object-right-top rounded-tr-3xl"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            {
              title: "Secure",
              desc: "Bank-level security",
              icon: <Shield className="w-5 h-5 text-green-500" />,
            },
            {
              title: "Fast",
              desc: "Instant transactions",
              icon: <Zap className="w-5 h-5 text-orange-500" />,
            },
            {
              title: "Global",
              desc: "Worldwide coverage",
              icon: <Globe className="w-5 h-5 text-blue-500" />,
            },
          ].map((item, index) => (
            <div key={index} className="space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-muted rounded-full">
                {item.icon}
              </div>
              <h4 className="text-lg font-semibold text-foreground">
                {item.title}
              </h4>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
