import HoverWrapper from "../styles/HoverWrapper";
import NaverLoginImg from "./assets/NaverLoginImg.png";

import { getOauthLoginPage } from "./utils/getLoginUrlHandlers";

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
