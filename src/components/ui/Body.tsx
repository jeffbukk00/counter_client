import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { HasChildren } from "@/shared/types";

// 로그인 후 라우터에서의 메인 페이지의 body에 해당하는 컴포넌트.
const Body = ({ children }: HasChildren) => {
  const location = useLocation();

  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (mainRef.current !== null) {
      // 페이지가 전환될 때마다 맨 위로 스크롤.
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
