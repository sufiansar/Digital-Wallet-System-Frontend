import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Features from "./Pages/Features";
import Pricing from "./Pages/Pricing";
import FAQSection from "./Pages/FAQSection";
import Contact from "./Pages/Contact";

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
]);
