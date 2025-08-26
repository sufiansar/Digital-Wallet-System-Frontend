import type { ISidebarItem } from "@/components/types/index.type";
import { AddMoney } from "@/Pages/AgentDashboard/AddMoney";

import AgentOverview from "@/Pages/AgentDashboard/AgentOverview";
import AgentProfile from "@/Pages/AgentDashboard/AgentProfile";
import TransactionHistory from "@/Pages/AgentDashboard/TransactionHistory";

import WithdrawMoney from "@/Pages/AgentDashboard/WithdrawMoney";

export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "Agent Dashboard",

    items: [
      {
        title: "Overview",
        url: "/agent/overview",
        component: AgentOverview,
      },

      {
        title: "Add Money",
        url: "/agent/add-money",
        component: AddMoney,
      },
      {
        title: "Withdraw Money",
        url: "/agent/withdraw",
        component: WithdrawMoney,
      },

      {
        title: "Transactions",
        url: "/agent/transactions",
        component: TransactionHistory,
      },
      {
        title: "Agent Profile",
        url: "/agent/profile",
        component: AgentProfile,
      },
    ],
  },
];
