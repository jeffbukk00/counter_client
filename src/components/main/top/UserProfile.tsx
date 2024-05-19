import useMutationLogout from "@/contexts/auth/hooks/http/useMutationLogout";
import useUserContext from "@/contexts/user/hooks/useUserContext";
import { useState } from "react";
import UserProfileVector from "./assets/UserProfileVector";
import HoverWrapper from "@/components/styles/HoverWrapper";
import LogoutVector from "./assets/LogoutVector";

const UserProfile = () => {
  const [userProfileIsVisible, setUserProfileIsVisible] = useState(false);

  const { mutatePostLogout } = useMutationLogout();
  const { email, username, profilePictureUrl } = useUserContext();

  return (
    <>
      <span
        className="ml-[5vw] relative cursor-pointer"
        onMouseOver={() => setUserProfileIsVisible(true)}
        onMouseOut={() => setUserProfileIsVisible(false)}
      >
        <HoverWrapper classes="p-2">
          <UserProfileVector classes="w-10 h-10" />
        </HoverWrapper>
        {userProfileIsVisible && (
          <div
            className="z-[1] absolute left-0 bottom-2 translate-y-[100%] border border-gray-300 bg-white min-w-64 min-h-32 p-2 cursor-default"
            onMouseOver={() => setUserProfileIsVisible(true)}
            onMouseOut={() => setUserProfileIsVisible(false)}
          >
            <div>
              <div>
                <p className="text-xs mb-2">환영합니다!</p>
                <p className="text-sm font-medium">{username}</p>
                <p className="text-xs text-gray-300">{email}</p>
              </div>
              <img
                src={profilePictureUrl}
                className="absolute bottom-3 right-3 w-7 h-7"
              ></img>
              <div className="absolute bottom-2 left-2 cursor-pointer">
                <HoverWrapper classes="p-1">
                  <button onClick={() => mutatePostLogout()}>
                    <LogoutVector classes="w-5 h-5 inline-block" />
                    <span className="text-xs ml-1">로그아웃</span>
                  </button>
                </HoverWrapper>
              </div>
            </div>
          </div>
        )}
      </span>
    </>
  );
};

export default UserProfile;
