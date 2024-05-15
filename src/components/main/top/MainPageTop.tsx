import UserProfile from "@/components/main/top/UserProfile";
import OpenSharingModalButton from "./OpenSharingModalButton";
import HttpErrorFeedback from "./HttpErrorFeedback";

const MainPageTop = () => {
  return (
    <div className="flex justify-between">
      <UserProfile />
      <OpenSharingModalButton />
      <HttpErrorFeedback />
    </div>
  );
};

export default MainPageTop;
