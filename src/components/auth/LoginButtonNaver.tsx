import HoverWrapper from "../styles/HoverWrapper";
import NaverLoginImg from "./assets/NaverLoginImg.png";

import { getOauthLoginPage } from "./utils/getLoginUrlHandlers";

// (oauth)네이버 로그인을 시작하기 위한 버튼 컴포넌트.
const LoginButtonNaver = () => {
  return (
    <HoverWrapper classes="p-2">
      <button onClick={() => getOauthLoginPage("naver")}>
        <img src={NaverLoginImg} className="w-40 h-10 inline-block" />
      </button>
    </HoverWrapper>
  );
};

export default LoginButtonNaver;
