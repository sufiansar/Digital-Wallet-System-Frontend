import {
  Home,
  CreditCard,
  Wallet,
  UserCog,
  Users,
  History,
  Settings,
  LayoutDashboard,
  ArrowDownCircle,
  ArrowUpCircle,
  Send,
  User,
  PlusCircle,
  ClipboardList,
} from "lucide-react";

const DashBoardicons: Record<string, React.ReactNode> = {
  Dashboard: <LayoutDashboard className="h-4 w-4" />,
  Overview: <Home className="h-4 w-4" />,
  UserOverview: <Home className="h-4 w-4" />,
  Wallet: <Wallet className="h-4 w-4" />,
  Transactions: <CreditCard className="h-4 w-4" />,
  "All Transactions": <History className="h-4 w-4" />,
  History: <History className="h-4 w-4" />,

  Deposit: <ArrowDownCircle className="h-4 w-4" />,

  Withdraw: <ArrowUpCircle className="h-4 w-4" />,
  "Withdraw Money": <ArrowUpCircle className="h-4 w-4" />,
  "Send Money": <Send className="h-4 w-4" />,
  "Add Money": <PlusCircle className="h-4 w-4" />,

  Users: <Users className="h-4 w-4" />,
  "Manage Agents": <UserCog className="h-4 w-4" />,
  "Manage Users": <UserCog className="h-4 w-4" />,
  "Agent Management": <UserCog className="h-4 w-4" />,
  Reports: <ClipboardList className="h-4 w-4" />,

  Profile: <User className="h-4 w-4" />,
  "Agent Profile": <User className="h-4 w-4" />,

  Settings: <Settings className="h-4 w-4" />,
};

export default DashBoardicons;
