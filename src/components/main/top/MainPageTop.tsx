import { useLocation } from "react-router-dom";

import UserProfile from "@/components/main/top/UserProfile";
import OpenSharingModalButton from "./OpenSharingModalButton";
import HttpErrorFeedback from "./HttpErrorFeedback";
import GoBackPageAction from "./GoBackPageAction";

// MainPage의 상단을 구성하는 컴포넌트.
const MainPageTop = () => {
  const location = useLocation();

  return (
    <div className="h-full flex justify-between items-center relative">
      <UserProfile />
      <OpenSharingModalButton />
      {location.pathname.includes("counters") && <GoBackPageAction />}
      <HttpErrorFeedback />
    </div>
  );
};

export default MainPageTop;
