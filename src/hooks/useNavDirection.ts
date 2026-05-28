import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

const getDepth = (pathname: string) => pathname.split("/").filter(Boolean).length;

// Tracks navigation direction (forward/back)
export const useNavDirection = () => {
  const { pathname } = useLocation();
  const prevDepth = useRef(getDepth(pathname));

  useEffect(() => {
    const depth = getDepth(pathname);
    // set attribute data-nav-dir = "forward" or "back"
    document.documentElement.dataset.navDir = depth > prevDepth.current ? "forward" : "back";
    prevDepth.current = depth;
  }, [pathname]);
};
