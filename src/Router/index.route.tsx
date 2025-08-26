import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Features from "../Pages/Features";
import Pricing from "../Pages/Pricing";
import FAQSection from "../Pages/FAQSection";
import Contact from "../Pages/Contact";
import { Login } from "../Pages/Auth/Login";
import { Register } from "../Pages/Auth/Register";
import Verify from "@/Pages/Verify";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import { generateRoutes } from "@/utils/generateRoute";
import { userSidebarItems } from "./userSidebarItems";
import { adminSidebarItems } from "./adminSidebarItems";
import { agentSidebarItems } from "./agentSidebarItems";
import UnAuthorized from "@/Pages/UnAuthorized";

import { roles } from "@/constants/role";
import type { TRole } from "@/components/types/index.type";
import { withAuth } from "@/utils/withAuth";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "features",
        Component: Features,
      },
      {
        path: "pricing",
        Component: Pricing,
      },
      {
        path: "faq",
        Component: FAQSection,
      },
      {
        path: "contact",
        Component: Contact,
      },
    ],
  },

  {
    Component: withAuth(DashboardLayout, [roles.admin as TRole]),
    path: "/admin",

    children: [
      {
        index: true,
        element: <Navigate to="/admin/users" />,
      },
      ...generateRoutes(adminSidebarItems),
    ],
  },

  {
    Component: withAuth(DashboardLayout, [roles.user as TRole]),
    path: "/user",

    children: [
      {
        index: true,
        element: <Navigate to="/user/send-money" />,
      },
      ...generateRoutes(userSidebarItems),
    ],
  },

  {
    Component: withAuth(DashboardLayout, [roles.agent as TRole]),
    path: "/agent",

    children: [
      {
        index: true,
        element: <Navigate to="/agent/add-money" />,
      },
      ...generateRoutes(agentSidebarItems),
    ],
  },

  {
    path: "/login",
    Component: Login,
  },
  {
    path: "register",
    Component: Register,
  },
  {
    path: "/verify",
    Component: Verify,
  },
  {
    path: "/unauthorized",
    Component: UnAuthorized,
  },
]);
