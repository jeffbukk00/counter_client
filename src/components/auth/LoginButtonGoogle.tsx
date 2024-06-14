import HoverWrapper from "../styles/HoverWrapper";
import GoogleLoginImg from "./assets/GoogleLoginImg.png";

import { getOauthLoginPage } from "./utils/getLoginUrlHandlers";

// (oauth)구글 로그인을 시작하기 위한 버튼 컴포넌트.
const LoginButtonGoogle = () => {
  return (
    <HoverWrapper classes="p-2">
      <button onClick={() => getOauthLoginPage("google")}>
        <img src={GoogleLoginImg} className="w-40 h-10 inline-block" />
      </button>
    </HoverWrapper>
  );
};

export default LoginButtonGoogle;
