import HoverWrapper from "../styles/HoverWrapper";
import KakaoLoginImg from "./assets/KakaoLoginImg.png";

import { getOauthLoginPage } from "./utils/getLoginUrlHandlers";

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
