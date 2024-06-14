import CallbackNaver from "@/components/auth/CallbackNaver";

// 네이버 로그인을 성공한 후, 자동으로 리다이렉트 되는 페이지.
const OauthCallbackNaverPage = () => {
  return (
    <>
      <CallbackNaver />
    </>
  );
};

export default OauthCallbackNaverPage;
