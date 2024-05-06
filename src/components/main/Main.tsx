import { Outlet } from "react-router-dom";

import Top from "@/components/ui/Top";
import Body from "@/components/ui/Body";
import MainPageTop from "@/components/main/top/MainPageTop";

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
