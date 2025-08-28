"use client";

import { useState } from "react";
import Logo from "@/assets/Logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ModeToggle } from "./ModeToggle";
import { Link } from "react-router";
import {
  authApi,
  useGetUserInfoQuery,
  useLogoutMutation,
} from "@/Redux/features/auth/auth.api";
import { useAppDispatch } from "@/Redux/hook";
import { toast } from "sonner";
import { roles } from "@/constants/role";
import GuidedTourWrapper from "@/utils/Driver";

// Navigation links
const landingNavigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/features", label: "Features", role: "PUBLIC" },
  { href: "/pricing", label: "Pricing", role: "PUBLIC" },
  { href: "/contact", label: "Contact", role: "PUBLIC" },
  { href: "/faq", label: "FAQ", role: "PUBLIC" },
  { href: "/admin", label: "Dashboard", role: roles.admin },
  { href: "/agent", label: "Dashboard", role: roles.agent },
  { href: "/user", label: "Dashboard", role: roles.user },
];

export default function Navbar() {
  const dispatch = useAppDispatch();
  const { data } = useGetUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const [restartTour, setRestartTour] = useState(false);

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
    toast.success("Logged out successfully");
  };

  return (
    <>
      <GuidedTourWrapper restartTrigger={restartTour} />

      <header className="container mx-auto border-b px-4 md:px-6 sticky top-0 z-50">
        <div className="flex h-16 justify-between items-center gap-4">
          <div className="flex gap-2">
            <div className="flex items-center md:hidden">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="group size-8"
                    variant="ghost"
                    size="icon"
                    data-tour="mobile-menu"
                  >
                    <svg
                      className="pointer-events-none"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path
                        d="M4 12L20 12"
                        className="origin-center -translate-y-[7px] transition-all duration-300 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                      />
                      <path
                        d="M4 12H20"
                        className="origin-center transition-all duration-300 group-aria-expanded:rotate-45"
                      />
                      <path
                        d="M4 12H20"
                        className="origin-center translate-y-[7px] transition-all duration-300 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                      />
                    </svg>
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-36 p-1 md:hidden">
                  <NavigationMenu className="max-w-none *:w-full">
                    <NavigationMenuList className="flex-col items-start gap-2">
                      {landingNavigationLinks.map(
                        (link, index) =>
                          (link.role === "PUBLIC" ||
                            data?.data?.role === link.role) && (
                            <NavigationMenuItem key={index} className="h-full">
                              <NavigationMenuLink className="text-muted-foreground hover:text-primary h-full py-1.5 font-medium">
                                <Link to={link.href}>{link.label}</Link>
                              </NavigationMenuLink>
                            </NavigationMenuItem>
                          )
                      )}
                    </NavigationMenuList>
                  </NavigationMenu>
                </PopoverContent>
              </Popover>
            </div>

            {/* Main nav */}
            <div className="flex items-center gap-6">
              <a
                href="#home"
                className="text-primary hover:text-primary/90"
                data-tour="nav-logo"
              >
                <Logo />
              </a>
              <NavigationMenu className="h-full hidden md:flex">
                <NavigationMenuList className="h-full gap-2">
                  {landingNavigationLinks.map(
                    (link, index) =>
                      (link.role === "PUBLIC" ||
                        data?.data?.role === link.role) && (
                        <NavigationMenuItem
                          key={index}
                          className="h-full"
                          data-tour={
                            link.label === "Dashboard"
                              ? "nav-dashboard"
                              : undefined
                          }
                        >
                          <NavigationMenuLink>
                            <Link to={link.href}>{link.label}</Link>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      )
                  )}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <ModeToggle data-tour="theme-toggle" />
            <Button
              size="sm"
              variant="outline"
              onClick={() => setRestartTour((prev) => !prev)}
            >
              Restart Tour
            </Button>
            {data?.data?.email ? (
              <Button
                onClick={handleLogout}
                variant="outline"
                className="text-sm"
              >
                Logout
              </Button>
            ) : (
              <Button
                variant="outline"
                className="text-sm"
                onClick={() => window.location.assign("/login")}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
