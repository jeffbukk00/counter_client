import HoverWrapper from "../styles/HoverWrapper";
import GoogleLoginImg from "./assets/GoogleLoginImg.png";

import { getOauthLoginPage } from "./utils/getLoginUrlHandlers";

const LoginButtonGoogle = () => {
  return (
    <HoverWrapper classes="p-2">
      <button onClick={() => getOauthLoginPage("google")}>
        <img src={GoogleLoginImg} className="w-40 h-9 inline-block" />
      </button>
    </HoverWrapper>
  );
};

export default LoginButtonGoogle;
