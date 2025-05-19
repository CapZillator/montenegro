import { useEffect, useState } from "react";

import { DEBOUNCE_DELAY, ScreenSize } from "./constants";

export function useWindowSize() {
  const [size, setSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, DEBOUNCE_DELAY);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { width } = size;

  const isMobile = width < ScreenSize.MOBILE;
  const isTablet = width >= ScreenSize.MOBILE && width < ScreenSize.TABLET;
  const isDesktop = width >= ScreenSize.TABLET && width < ScreenSize.DESKTOP;
  const isLargeDesktop = width >= ScreenSize.DESKTOP;

  return {
    ...size,
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
  };
}
