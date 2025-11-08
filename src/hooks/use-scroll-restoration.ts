import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Store scroll positions for each route
const scrollPositions: Record<string, number> = {};

export const useScrollRestoration = () => {
  const location = useLocation();

  useEffect(() => {
    // Save current scroll position before navigating away
    const handleScroll = () => {
      scrollPositions[location.pathname] = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    // Restore scroll position when component mounts
    const savedPosition = scrollPositions[location.pathname];
    if (savedPosition !== undefined) {
      // Use setTimeout to ensure DOM is ready
      setTimeout(() => {
        window.scrollTo(0, savedPosition);
      }, 0);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      // Save position when component unmounts
      scrollPositions[location.pathname] = window.scrollY;
    };
  }, [location.pathname]);
};

