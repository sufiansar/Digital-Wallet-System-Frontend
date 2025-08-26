import type { ISidebarItem } from "@/components/types/index.type";
import Deposit from "@/Pages/UserDashboard/Deposit";
import OverView from "@/Pages/UserDashboard/OverView";
import Profile from "@/Pages/UserDashboard/Profile";
import { SendMoney } from "@/Pages/UserDashboard/SendMoney";

import Transactions from "@/Pages/UserDashboard/Transactions";
import { Withdraw } from "@/Pages/UserDashboard/Withdraw";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "User Dashboard",

    items: [
      {
        title: "OverView",
        url: "/user/overview",
        component: OverView,
      },
      {
        title: "Send Money",
        url: "/user/send-money",
        component: SendMoney,
      },
      {
        title: "Deposit",
        url: "/user/deposit",
        component: Deposit,
      },
      {
        title: "Withdraw",
        url: "/user/withdraw",
        component: Withdraw,
      },
      {
        title: "Transactions",
        url: "/user/transactions",
        component: Transactions,
      },
      {
        title: "Profile",
        url: "/user/profile",
        component: Profile,
      },
    ],
  },
];
