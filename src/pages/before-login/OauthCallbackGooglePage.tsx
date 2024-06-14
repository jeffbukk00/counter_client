import CallbackGoogle from "@/components/auth/CallbackGoogle";

// 구글 로그인을 성공한 후, 자동으로 리다이렉트 되는 페이지.
const OauthCallbackGooglePage = () => {
  return (
    <>
      <CallbackGoogle />
    </>
  );
};

export default OauthCallbackGooglePage;
