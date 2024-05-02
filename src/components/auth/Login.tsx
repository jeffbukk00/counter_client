import {
  handleGoogleLogin,
  handleNaverLogin,
  handleKakaoLogin,
} from "@/components/auth/utils/getLoginUrlHandlers";

const Login = () => {
  return (
    <div>
      <button onClick={handleGoogleLogin}>google</button>
      <button onClick={handleNaverLogin}>naver</button>
      <button onClick={handleKakaoLogin}>kakao</button>
    </div>
  );
};

export default Login;
