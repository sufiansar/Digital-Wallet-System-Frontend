import type { ISidebarItem } from "@/components/types/index.type";

// import Deposit from "@/Pages/UserDashboard/Deposit";
// import OverView from "@/Pages/UserDashboard/OverView";
// import Profile from "@/Pages/UserDashboard/Profile";

// import Transactions from "@/Pages/UserDashboard/Transactions";
// import Withdraw from "@/Pages/UserDashboard/Withdraw";

import { lazy } from "react";
const Deposit = lazy(() => import("@/Pages/UserDashboard/Deposit"));
const OverView = lazy(() => import("@/Pages/UserDashboard/OverView"));
const Profile = lazy(() => import("@/Pages/UserDashboard/Profile"));
const SendMoney = lazy(() => import("@/Pages/UserDashboard/SendMoney"));
const Transactions = lazy(() => import("@/Pages/UserDashboard/Transactions"));
const Withdraw = lazy(() => import("@/Pages/UserDashboard/Withdraw"));

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "User Dashboard",

    items: [
      {
        title: "Overview",
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
