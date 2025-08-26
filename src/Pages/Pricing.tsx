import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Check, X } from "lucide-react";

const tiers = [
  {
    name: "Free",
    price: "৳0",
    features: [
      { feature: "Deposit Money", included: true },
      { feature: "Withdraw Money", included: true },
      { feature: "Send Money", included: true },
      { feature: "Transaction History", included: true },
      { feature: "Priority Support", included: false },
    ],
  },
  {
    name: "Premium",
    price: "৳499 / month",
    features: [
      { feature: "Deposit Money", included: true },
      { feature: "Withdraw Money", included: true },
      { feature: "Send Money", included: true },
      { feature: "Transaction History", included: true },
      { feature: "Priority Support", included: true },
    ],
  },
  {
    name: "Enterprise",
    price: "Contact us",
    features: [
      { feature: "Deposit Money", included: true },
      { feature: "Withdraw Money", included: true },
      { feature: "Send Money", included: true },
      { feature: "Transaction History", included: true },
      { feature: "Priority Support", included: true },
      { feature: "Custom Integrations", included: true },
    ],
  },
];

export default function Pricing() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4 space-y-12">
      <h1 className="text-3xl font-bold text-center">Pricing & Service Fees</h1>
      <p className="text-center text-muted-foreground">
        Choose the plan that best fits your needs.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tiers.map((tier, idx) => (
          <Card
            key={idx}
            className="shadow-lg rounded-2xl hover:scale-105 transition-transform"
          >
            <CardHeader>
              <CardTitle className="text-xl font-bold">{tier.name}</CardTitle>
              <p className="text-2xl font-semibold mt-2">{tier.price}</p>
            </CardHeader>
            <CardContent className="space-y-2">
              {tier.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  {f.included ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <X className="w-4 h-4 text-red-600" />
                  )}
                  <span
                    className={
                      f.included
                        ? "text-muted-foreground"
                        : "text-muted-foreground line-through"
                    }
                  >
                    {f.feature}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
