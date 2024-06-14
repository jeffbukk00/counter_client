import CallbackKakao from "@/components/auth/CallbackKakao";

// 카카오 로그인을 성공한 후, 자동으로 리다이렉트 되는 페이지.
const OauthCallbackKakaoPage = () => {
  return (
    <>
      <CallbackKakao />
    </>
  );
};

export default OauthCallbackKakaoPage;
