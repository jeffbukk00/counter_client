import { HasChildren } from "@/shared/types";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const Body = ({ children }: HasChildren) => {
  const location = useLocation();

  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (mainRef.current !== null) {
      mainRef.current.scroll({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname]);

  return (
    <main ref={mainRef} className="w-full h-9/10 overflow-y-scroll">
      {children}
    </main>
  );
};

export default Body;
