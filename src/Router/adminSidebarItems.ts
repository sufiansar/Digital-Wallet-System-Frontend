import type { ISidebarItem } from "@/components/types/index.type";
import AdminOverview from "@/Pages/AdminDashboard/AdminOverview";
import Users from "@/Pages/AdminDashboard/Users";

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
        title: "Users",
        url: "/admin/users",
        component: Users,
      },
    ],
  },
];
