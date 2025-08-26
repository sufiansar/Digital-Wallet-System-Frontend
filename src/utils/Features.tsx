import { ArrowDown, ArrowUp, CreditCard, History, User } from "lucide-react";

const FeaturesAll = [
  {
    title: "Wallet Balance",
    description: "Check your wallet balance in real-time",
    icon: <CreditCard className="w-6 h-6" />,
    color: "bg-blue-100 text-blue-800",
    url: "/user/overview",
  },
  {
    title: "Deposit Money",
    description: "Deposit money via agent cash-in simulation",
    icon: <ArrowUp className="w-6 h-6" />,
    color: "bg-green-100 text-green-800",
    url: "/user/deposit",
  },
  {
    title: "Withdraw Money",
    description: "Withdraw cash from your wallet easily",
    icon: <ArrowDown className="w-6 h-6" />,
    color: "bg-red-100 text-red-800",
    url: "/user/withdraw",
  },
  {
    title: "Send Money",
    description: "Send money to other users quickly",
    icon: <ArrowUp className="w-6 h-6 rotate-45" />,
    color: "bg-yellow-100 text-yellow-800",
    url: "/user/send-money",
  },
  {
    title: "Transaction History",
    description: "View, filter, and paginate your transaction history",
    icon: <History className="w-6 h-6" />,
    color: "bg-purple-100 text-purple-800",
    url: "/user/transactions",
  },
  {
    title: "Profile Management",
    description: "Update your name, phone, and password securely",
    icon: <User className="w-6 h-6" />,
    color: "bg-pink-100 text-pink-800",
    url: "/user/profile",
  },
];

export default FeaturesAll;
