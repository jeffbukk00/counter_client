import UserProfile from "@/components/main/top/UserProfile";
import OpenSharingModalButton from "./OpenSharingModalButton";
import HttpErrorFeedback from "./HttpErrorFeedback";
import GoBackPageAction from "./GoBackPageAction";
import { useLocation } from "react-router-dom";

const MainPageTop = () => {
  const location = useLocation();
  console.log(location.pathname);
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
