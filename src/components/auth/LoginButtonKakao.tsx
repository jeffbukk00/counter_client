import HoverWrapper from "../styles/HoverWrapper";
import KakaoLoginImg from "./assets/KakaoLoginImg.png";

import { getOauthLoginPage } from "./utils/getLoginUrlHandlers";

// (oauth)카카오 로그인을 시작하기 위한 버튼 컴포넌트.
const LoginButtonKakao = () => {
  return (
    <HoverWrapper classes="p-2">
      <button onClick={() => getOauthLoginPage("kakao")}>
        <img src={KakaoLoginImg} className="w-40 h-10 inline-block" />
      </button>
    </HoverWrapper>
  );
};

export default LoginButtonKakao;
