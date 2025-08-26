import type { TRole } from "@/components/types/index.type";
import { roles } from "@/constants/role";
import { adminSidebarItems } from "@/Router/adminSidebarItems";
import { agentSidebarItems } from "@/Router/agentSidebarItems";
import { userSidebarItems } from "@/Router/userSidebarItems";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case roles.user:
      return [...userSidebarItems];
    case roles.admin:
      return [...adminSidebarItems];
    case roles.agent:
      return [...agentSidebarItems];
    default:
      return [];
  }
};
