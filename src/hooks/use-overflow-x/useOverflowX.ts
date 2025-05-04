import { useEffect, useRef, useState } from "react";

export const useOverflowX = <T extends HTMLElement = HTMLElement>() => {
  const containerRef = useRef<T>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const checkOverflow = () => {
      setIsOverflowing(el.scrollWidth > el.clientWidth);
    };

    checkOverflow();

    window.addEventListener("resize", checkOverflow);

    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  return { ref: containerRef, isOverflowing };
};
