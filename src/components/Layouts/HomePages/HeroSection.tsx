import { ExternalLink, CreditCard, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/Logo";
import "./hero.animation.css";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-32">
      <div className="relative z-10 container mx-auto px-4">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center gap-8">
          {/* Logo */}
          <div className="rounded-2xl p-6 shadow-lg backdrop-blur-md bg-background/20 dark:bg-background/40 transition-all duration-500 animate-float-slow">
            <Logo />
          </div>

          {/* Heading */}
          <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-foreground dark:text-white opacity-0 animate-fade-in-up">
            Empower Your Finances with{" "}
            <span className="text-primary">Digital Wallet</span>
          </h1>

          {/* Subtext */}
          <p className="max-w-3xl text-muted-foreground lg:text-xl opacity-0 animate-fade-in-up animation-delay-500">
            Send, receive, and track money instantly. Designed for users,
            agents, and admins with full transparency, role-based access, and
            real-time transaction history.
          </p>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-wrap justify-center gap-4 opacity-0 animate-fade-in-up animation-delay-1000">
            <Button className="px-6 py-3 text-lg font-medium shadow-md hover:shadow-lg transition-transform hover:-translate-y-1">
              Get Started
            </Button>
            <Button
              variant="outline"
              className="px-6 py-3 text-lg font-medium flex items-center gap-2 group transition-transform hover:-translate-y-1"
            >
              Learn More
              <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Animated colorful blobs */}
      <div className="absolute -top-16 left-1/4 w-40 h-40 rounded-full blur-3xl animate-blob-slow bg-gradient-to-tr from-pink-400 via-purple-400 to-blue-400 opacity-60 animate-color-shift"></div>
      <div className="absolute -bottom-16 right-1/3 w-60 h-60 rounded-full blur-3xl animate-blob-medium bg-gradient-to-tr from-yellow-300 via-green-300 to-teal-400 opacity-50 animate-color-shift animation-delay-500"></div>
      <div className="absolute top-1/2 -left-20 w-52 h-52 rounded-full blur-3xl animate-blob-fast bg-gradient-to-tr from-red-400 via-orange-400 to-pink-300 opacity-50 animate-color-shift animation-delay-1000"></div>

      {/* Floating colorful wallet/coin icons */}
      <CreditCard className="absolute top-10 left-10 w-8 h-8 text-pink-400 animate-coin-float animate-color-shift"></CreditCard>
      <DollarSign className="absolute bottom-20 right-20 w-10 h-10 text-yellow-400 animate-coin-float animation-delay-500 animate-color-shift"></DollarSign>
      <CreditCard className="absolute top-1/3 right-1/4 w-6 h-6 text-purple-400 animate-coin-float animation-delay-1000 animate-color-shift"></CreditCard>
      <DollarSign className="absolute top-1/4 left-1/2 w-7 h-7 text-green-400 animate-coin-float animation-delay-1500 animate-color-shift"></DollarSign>
    </section>
  );
};

export default HeroSection;
