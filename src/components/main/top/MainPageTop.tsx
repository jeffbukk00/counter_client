import UserProfile from "@/components/main/top/UserProfile";
import OpenSharingModalButton from "./OpenSharingModalButton";

const MainPageTop = () => {
  return (
    <div className="flex justify-between">
      <UserProfile />
      <OpenSharingModalButton />
    </div>
  );
};

export default MainPageTop;
