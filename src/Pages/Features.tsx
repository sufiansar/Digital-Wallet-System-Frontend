import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FeaturesAll from "@/utils/Features";

import { Link } from "react-router";

const features = FeaturesAll;

export default function Features() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, idx) => (
        <Link
          key={idx}
          to={feature.url}
          className="hover:scale-105 transition-transform"
        >
          <Card className="shadow-lg rounded-2xl cursor-pointer">
            <CardHeader className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${feature.color}`}>
                {feature.icon}
              </div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
