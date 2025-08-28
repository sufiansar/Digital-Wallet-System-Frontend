"use client";

import { useEffect, useState } from "react";
import type { Step } from "react-joyride";
import Joyride from "react-joyride";

const TOUR_STORAGE_KEY = "guidedTourCompleted";

export default function GuidedTourWrapper({
  restartTrigger,
}: {
  restartTrigger?: boolean;
}) {
  const [runTour, setRunTour] = useState(false);
  const [steps, setSteps] = useState<Step[]>([]);

  useEffect(() => {
    // build steps dynamically depending on screen size
    const isMobile = window.innerWidth < 768;

    const baseSteps: Step[] = [
      {
        target: '[data-tour="nav-logo"]',
        content: "This is your app logo. Click here to go home.",
        placement: "bottom",
      },
      {
        target: isMobile
          ? '[data-tour="mobile-menu"]'
          : '[data-tour="nav-dashboard"]',
        content: isMobile
          ? "Open the mobile menu to navigate through sections."
          : "Access your dashboard based on your role.",
        placement: isMobile ? "bottom" : "bottom",
      },
      {
        target: '[data-tour="theme-toggle"]',
        content: "Switch between light and dark mode.",
        placement: "left",
      },
      {
        target: '[data-tour="dashboard-stats"]',
        content: "Quick summary of key metrics in your stats cards.",
        placement: "top",
      },
      {
        target: '[data-tour="dashboard-chart"]',
        content: "Visualize trends in this chart section.",
        placement: "top",
      },
      {
        target: '[data-tour="dashboard-table"]',
        content: "Use this table to search and filter records.",
        placement: "top",
      },
    ];

    setSteps(baseSteps);

    const completed = localStorage.getItem(TOUR_STORAGE_KEY);
    if (!completed) setRunTour(true);
  }, []);

  useEffect(() => {
    if (restartTrigger) {
      localStorage.removeItem(TOUR_STORAGE_KEY);
      setRunTour(true);
    }
  }, [restartTrigger]);

  const handleTourCallback = (data: any) => {
    if (data.status === "finished" || data.status === "skipped") {
      localStorage.setItem(TOUR_STORAGE_KEY, "true");
      setRunTour(false);
    }
  };

  return (
    <Joyride
      steps={steps}
      run={runTour}
      continuous
      showSkipButton
      showProgress
      scrollToFirstStep
      callback={handleTourCallback}
      styles={{
        options: {
          zIndex: 9999,
        },
      }}
    />
  );
}
