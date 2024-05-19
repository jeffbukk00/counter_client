import UserProfile from "@/components/main/top/UserProfile";
import OpenSharingModalButton from "./OpenSharingModalButton";
import HttpErrorFeedback from "./HttpErrorFeedback";

const MainPageTop = () => {
  return (
    <div className="h-full flex justify-between items-center relative">
      <UserProfile />
      <OpenSharingModalButton />
      <HttpErrorFeedback />
    </div>
  );
};

export default MainPageTop;
