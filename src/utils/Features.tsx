import {
  ArrowDown,
  ArrowUp,
  CreditCard,
  History,
  User,
  Sparkles,
  Shield,
  Zap,
  Globe,
} from "lucide-react";

const FeaturesAll = [
  {
    title: "Wallet Balance",
    description: "Real-time balance tracking with instant updates",
    icon: <CreditCard className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-400",
    url: "#",
    stats: "Instant",
  },
  {
    title: "Deposit Money",
    description: "Secure deposits via agents, banks, or cards",
    icon: <ArrowUp className="w-6 h-6" />,
    color: "from-emerald-500 to-green-400",
    url: "#",
    stats: "0% Fees",
  },
  {
    title: "Withdraw Money",
    description: "Instant cash withdrawals worldwide",
    icon: <ArrowDown className="w-6 h-6" />,
    color: "from-rose-500 to-pink-400",
    url: "#",
    stats: "24/7 Access",
  },
  {
    title: "Send Money",
    description: "Send funds instantly to anyone",
    icon: <ArrowUp className="w-6 h-6 rotate-45" />,
    color: "from-amber-500 to-orange-400",
    url: "#",
    stats: "< 1min",
  },
  {
    title: "Transaction History",
    description: "Advanced analytics with filters",
    icon: <History className="w-6 h-6" />,
    color: "from-violet-500 to-purple-400",
    url: "#",
    stats: "AI Powered",
  },
  {
    title: "Profile Management",
    description: "Multi-factor authentication and privacy controls",
    icon: <User className="w-6 h-6" />,
    color: "from-fuchsia-500 to-pink-400",
    url: "#",
    stats: "Bank-Level",
  },
];

// Duplicate PremiumFeatures and extra default export removed

export const PremiumFeatures = [
  {
    title: "Multi-Currency",
    description: "Hold and exchange 50+ currencies",
    icon: <Globe className="w-5 h-5" />,
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Priority Support",
    description: "24/7 dedicated support",
    icon: <Sparkles className="w-5 h-5" />,
    color: "from-amber-500 to-yellow-500",
  },
  {
    title: "Advanced Security",
    description: "Military-grade encryption",
    icon: <Shield className="w-5 h-5" />,
    color: "from-emerald-500 to-green-500",
  },
  {
    title: "Instant Processing",
    description: "Priority transaction processing",
    icon: <Zap className="w-5 h-5" />,
    color: "from-red-500 to-rose-500",
  },
];

export default FeaturesAll;
