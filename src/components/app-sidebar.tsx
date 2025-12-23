import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "@/assets/Logo";
import { Link, useLocation } from "react-router";
import { getSidebarItems } from "@/utils/getSidebar";
import { useGetUserInfoQuery } from "@/Redux/features/auth/auth.api";

import DashBoardicons from "@/utils/Icons";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useGetUserInfoQuery(undefined);
  const location = useLocation();

  const data = {
    navMain: getSidebarItems(userData?.data?.role),
  };

  // Icon map for sidebar items

  return (
    <Sidebar
      {...props}
      className="bg-white dark:bg-neutral-950 border-r shadow-sm"
    >
      <SidebarHeader className="flex items-center justify-center py-4 border-b">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title} className="mt-2">
            <SidebarGroupLabel className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-wide px-2">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = location.pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          to={item.url}
                          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all
                            ${
                              isActive
                                ? "bg-blue-500 text-white shadow"
                                : "hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-700 dark:text-gray-300"
                            }`}
                        >
                          {DashBoardicons[item.title] ?? (
                            <span className="w-4" />
                          )}
                          {item.title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Bottom pinned section */}
      <div className="mt-auto border-t py-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild></SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </div>

      <SidebarRail />
    </Sidebar>
  );
}
