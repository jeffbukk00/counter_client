import { Outlet } from "react-router-dom";

import Top from "@/components/ui/Top";
import Body from "@/components/ui/Body";
import MainPageTop from "@/components/main/top/MainPageTop";

// 로그인 이후 라우터에서의 루트 경로에 해당하는 페이지.
const Main = () => {
  return (
    <div className="w-screen h-screen">
      <Top>
        <MainPageTop />
      </Top>
      <Body>
        <Outlet />
      </Body>
    </div>
  );
};

export default Main;
