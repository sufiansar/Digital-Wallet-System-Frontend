import type { ISidebarItem } from "@/components/types/index.type";
// import AdminOverview from "@/Pages/AdminDashboard/AdminOverview";
// import ProfilePage from "@/Pages/AdminDashboard/AdminProfile";
// import AgentManagement from "@/Pages/AdminDashboard/AgentManagement";
// import AllTransactions from "@/Pages/AdminDashboard/AllTransaction";
// import ManageUsers from "@/Pages/AdminDashboard/ManageUsers";
import { lazy } from "react";

const AdminOverview = lazy(
  () => import("@/Pages/AdminDashboard/AdminOverview")
);
const ProfilePage = lazy(() => import("@/Pages/AdminDashboard/AdminProfile"));
const AgentManagement = lazy(
  () => import("@/Pages/AdminDashboard/AgentManagement")
);
const AllTransactions = lazy(
  () => import("@/Pages/AdminDashboard/AllTransaction")
);
const ManageUsers = lazy(() => import("@/Pages/AdminDashboard/ManageUsers"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",

    items: [
      {
        title: "UserOverview",
        url: "/admin/users-stats",
        component: AdminOverview,
      },
      {
        title: "Manage Users",
        url: "/admin/manage-users",
        component: ManageUsers,
      },
      {
        title: "Agent Management",
        url: "/admin/manage-agents",
        component: AgentManagement,
      },
      {
        title: "All Transactions",
        url: "/admin/all-transactions",
        component: AllTransactions,
      },
      {
        title: "Profile",
        url: "/admin/profile",
        component: ProfilePage,
      },
    ],
  },
];
