import heroTwoImage from "../../../assets/Mockup-2.png";
import WhyChooseSection from "./WhyChooseUs";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
        {/* Left Side - Content */}
        <div className="md:w-1/2 text-center md:text-left">
          {/* Header Section */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-primary text-sm md:text-base font-semibold tracking-widest uppercase mb-4">
              ABOUT US
            </h2>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8">
              Building the Future of Digital Payments
            </h1>
            <p className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-xl leading-relaxed">
              We provide seamless and secure digital payment solutions, enabling
              users to manage their money with ease and confidence across the
              globe.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 md:mb-16">
            {[
              {
                icon: "🔒",
                title: "Secure & Reliable",
                desc: "Protecting your transactions with top-notch security protocols.",
              },
              {
                icon: "🌎",
                title: "Global Support",
                desc: "Manage payments anywhere in the world with full support.",
              },
              {
                icon: "✨",
                title: "Smart Banking",
                desc: "Smart tools to simplify your finances and optimize spending.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-muted/20 dark:bg-muted/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-muted/30 dark:hover:bg-muted/20 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="flex flex-col sm:flex-row items-baseline justify-center md:justify-start gap-4 mb-8 md:mb-12">
            <span className="text-2xl md:text-2xl lg:text-2xl font-black">
              793.05
            </span>
            <span className="text-primary text-lg md:text-xl font-medium">
              (optit)
            </span>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center md:justify-end">
          <img
            src={heroTwoImage}
            alt="Hero Two"
            className="w-full max-w-md md:max-w-lg rounded-3xl shadow-xl"
          />
        </div>
      </div>
      <WhyChooseSection />
    </div>
  );
};

export default AboutUs;
