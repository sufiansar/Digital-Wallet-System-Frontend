import { Card, CardContent } from "@/components/ui/card";
import FeaturesAll, { PremiumFeatures } from "@/utils/Features";
import { Link } from "react-router";
import { Sparkles } from "lucide-react";

export default function Features() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <Sparkles className="w-4 h-4" />
          All-in-One Platform
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Powerful Features for{" "}
          <span className="text-primary">Modern Banking</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Everything you need to manage your finances efficiently and securely
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {FeaturesAll.map((feature, idx) => (
          <Link key={idx} to={feature.url} className="block group">
            <Card className="h-full border border-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105">
              <CardContent className="p-6 flex flex-col h-full">
                {/* Icon */}
                <div className="p-4 rounded-xl bg-gradient-to-tr from-primary/20 to-secondary/20 mb-6 flex items-center justify-center w-max mx-auto">
                  <div
                    className={`text-3xl bg-gradient-to-br ${feature.color} bg-clip-text text-transparent`}
                  >
                    {feature.icon}
                  </div>
                </div>
                {/* Title */}
                <h3 className="text-xl font-semibold text-foreground mb-3 text-center">
                  {feature.title}
                </h3>
                {/* Description */}
                <p className="text-muted-foreground text-center flex-grow">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Premium Features */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl shadow-lg">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4 mx-auto">
              <Sparkles className="w-4 h-4" />
              Premium Features
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Upgrade for <span className="text-primary">Exclusive</span>{" "}
              Benefits
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Unlock advanced features with our premium plan
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {PremiumFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-br from-gray-900/10 to-gray-800/10 border border-gray-700 hover:scale-105 hover:shadow-lg transition-transform duration-300"
              >
                <div
                  className={`p-4 rounded-full bg-gradient-to-tr ${feature.color} mb-4 flex items-center justify-center text-2xl`}
                >
                  {feature.icon}
                </div>
                <h4 className="font-semibold text-sm mb-2">{feature.title}</h4>
                <p className="text-xs text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
