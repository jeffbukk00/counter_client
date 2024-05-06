import useMutationLogout from "@/contexts/auth/hooks/http/useMutationLogout";
import useUserContext from "@/contexts/user/hooks/useUserContext";

const UserProfile = () => {
  const { mutatePostLogout } = useMutationLogout();
  const { email, username, profilePictureUrl } = useUserContext();

  const userProfile = (
    <>
      <span>email: {email}</span>
      <span>유저 이름: {username}</span>
      <img className="w-4 h-4 inline-block" src={profilePictureUrl} />
    </>
  );

  return (
    <div className="inline-block">
      {userProfile}
      <button onClick={() => mutatePostLogout()}>로그아웃</button>
    </div>
  );
};

export default UserProfile;
