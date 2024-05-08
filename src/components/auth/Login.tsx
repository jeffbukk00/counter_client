import { getOauthLoginPage } from "@/components/auth/utils/getLoginUrlHandlers";

const Login = () => {
  return (
    <div>
      <button onClick={() => getOauthLoginPage("google")}>google</button>
      <button onClick={() => getOauthLoginPage("naver")}>naver</button>
      <button onClick={() => getOauthLoginPage("kakao")}>kakao</button>
    </div>
  );
};

export default Login;
