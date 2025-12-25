import { useState } from "react";
import Logo from "@/assets/Logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./ModeToggle";
import { Link, useLocation } from "react-router";
import {
  authApi,
  useGetUserInfoQuery,
  useLogoutMutation,
} from "@/Redux/features/auth/auth.api";
import { useAppDispatch } from "@/Redux/hook";
import { toast } from "sonner";
import { roles } from "@/constants/role";
import GuidedTourWrapper from "@/utils/Driver";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Navigation links
const landingNavigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/features", label: "Features", role: "PUBLIC" },
  { href: "/pricing", label: "Pricing", role: "PUBLIC" },
  { href: "/contact", label: "Contact", role: "PUBLIC" },
  { href: "/faq", label: "FAQ", role: "PUBLIC" },
  { href: "/blog", label: "Blog", role: "PUBLIC" }, 
];

const dashboardLinks = [
  { href: "/admin", label: "Dashboard", role: roles.admin },
  { href: "/agent", label: "Dashboard", role: roles.agent },
  { href: "/user", label: "Dashboard", role: roles.user },
];

export default function Navbar() {
  const dispatch = useAppDispatch();
  const { data } = useGetUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const [restartTour, setRestartTour] = useState(false);
  const location = useLocation();

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
    toast.success("Logged out successfully");
  };

  const user = data?.data;
  const userInitials =
    user?.name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "US";

  const getUserDashboardLink = () => {
    if (!user?.role) return "/login";
    const dashboardLink = dashboardLinks.find(
      (link) => link.role === user.role
    );
    return dashboardLink?.href || "/login";
  };

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <GuidedTourWrapper restartTrigger={restartTour} />

      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left section - Logo & Desktop Navigation */}
            <div className="flex items-center gap-4 md:gap-8">
              {/* Logo */}
              <Link
                to="/"
                className="flex items-center gap-2"
                data-tour="nav-logo"
              >
                <Logo />
              </Link>

              {/* Desktop Navigation */}
              <NavigationMenu className="hidden lg:flex">
                <NavigationMenuList className="gap-1">
                  {landingNavigationLinks.map(
                    (link) =>
                      (link.role === "PUBLIC" || user?.role === link.role) && (
                        <NavigationMenuItem key={link.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={link.href}
                              className={cn(
                                "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
                                "hover:bg-accent hover:text-accent-foreground",
                                "focus:bg-accent focus:text-accent-foreground focus:outline-none",
                                "disabled:pointer-events-none disabled:opacity-50",
                                isActive(link.href)
                                  ? "bg-accent text-accent-foreground"
                                  : "text-muted-foreground"
                              )}
                              data-tour={
                                link.label === "Features"
                                  ? "nav-features"
                                  : undefined
                              }
                            >
                              {link.label}
                            </Link>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      )
                  )}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Right section - Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Desktop Dashboard Link */}
              {user?.role && (
                <Link
                  to={getUserDashboardLink()}
                  className={cn(
                    "hidden items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors sm:inline-flex",
                    "bg-primary text-primary-foreground hover:bg-primary/90",
                    "shadow-sm"
                  )}
                  data-tour="nav-dashboard"
                >
                  Dashboard
                </Link>
              )}

              {/* Restart Tour Button */}
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setRestartTour((prev) => !prev)}
                className="hidden gap-2 sm:inline-flex"
              >
                Tour
              </Button>

              {/* Theme Toggle */}
              <div className="h-9 w-9" data-tour="theme-toggle">
                <ModeToggle />
              </div>

              {/* User Actions */}
              {user?.email ? (
                <div className="flex items-center gap-2">
                  {/* Mobile Dashboard Button */}
                  <Link
                    to={getUserDashboardLink()}
                    className="inline-flex items-center justify-center rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow-sm sm:hidden"
                  >
                    Dashboard
                  </Link>

                  {/* User Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative h-9 w-9 rounded-full p-0"
                      >
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={user?.avatar} alt={user?.name} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {userInitials}
                          </AvatarFallback>
                        </Avatar>
                        <Badge
                          variant="secondary"
                          className="absolute -bottom-1 -right-1 h-4 px-1 text-[10px]"
                        >
                          {user?.role?.charAt(0).toUpperCase()}
                        </Badge>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {user?.name || "User"}
                          </p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user?.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link
                          to={getUserDashboardLink()}
                          className="cursor-pointer"
                        >
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        {user?.role === roles.user ? (
                          <Link to="/user/profile" className="cursor-pointer">
                            Profile
                          </Link>
                        ) : user?.role === roles.agent ? (
                          <Link to="/agent/profile" className="cursor-pointer">
                            Profile
                          </Link>
                        ) : user?.role === roles.admin ? (
                          <Link to="/admin/profile" className="cursor-pointer">
                            Profile
                          </Link>
                        ) : null}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="cursor-pointer text-red-600 focus:text-red-600"
                      >
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {/* Mobile Login Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.location.assign("/login")}
                    className="sm:hidden"
                  >
                    Login
                  </Button>

                  {/* Desktop Login/Register */}
                  <div className="hidden items-center gap-2 sm:flex">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.location.assign("/login")}
                    >
                      Sign In
                    </Button>
                  </div>
                </div>
              )}

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    data-tour="mobile-menu"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[85vw] sm:w-[350px]">
                  <div className="flex flex-col gap-6">
                    {/* Mobile Logo */}
                    <div className="flex items-center">
                      <Logo className="h-8 w-8" />
                    </div>

                    {/* Mobile Navigation Links */}
                    <nav className="flex flex-col gap-1">
                      {landingNavigationLinks.map(
                        (link) =>
                          (link.role === "PUBLIC" ||
                            user?.role === link.role) && (
                            <Link
                              key={link.href}
                              to={link.href}
                              className={cn(
                                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                isActive(link.href)
                                  ? "bg-accent text-accent-foreground"
                                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                              )}
                              onClick={(e) => {
                                const sheet = e.currentTarget.closest(
                                  '[data-state="open"]'
                                );
                                if (sheet) {
                                  (sheet as HTMLElement).click();
                                }
                              }}
                            >
                              {link.label}
                            </Link>
                          )
                      )}
                    </nav>

                    {/* User Section in Mobile */}
                    {user?.email ? (
                      <>
                        <div className="border-t pt-4">
                          <div className="mb-4 flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={user?.avatar}
                                alt={user?.name}
                              />
                              <AvatarFallback>{userInitials}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user?.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {user?.email}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button
                              variant="outline"
                              className="w-full justify-start"
                              onClick={() => {
                                setRestartTour((prev) => !prev);
                                const sheet = document.querySelector(
                                  '[data-state="open"]'
                                );
                                if (sheet) (sheet as HTMLElement).click();
                              }}
                            >
                              Restart Tour
                            </Button>
                            <Button
                              variant="destructive"
                              className="w-full justify-start"
                              onClick={handleLogout}
                            >
                              Logout
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="border-t pt-4">
                        <div className="flex flex-col gap-2">
                          <Button
                            variant="default"
                            className="w-full"
                            onClick={() => window.location.assign("/login")}
                          >
                            Sign In
                          </Button>
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => {
                              setRestartTour((prev) => !prev);
                              const sheet = document.querySelector(
                                '[data-state="open"]'
                              );
                              if (sheet) (sheet as HTMLElement).click();
                            }}
                          >
                            Restart Tour
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
