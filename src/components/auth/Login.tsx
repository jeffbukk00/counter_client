import LoginButtonGoogle from "./LoginButtonGoogle";
import LoginButtonNaver from "./LoginButtonNaver";
import LoginButtonKakao from "./LoginButtonKakao";
import CloseVector from "@/shared/assets/CloseVector";

import HoverWrapper from "../styles/HoverWrapper";

const Login = ({ closeAuthPhase }: { closeAuthPhase: () => void }) => {
  return (
    <div className="border border-gray-300 w-56 h-64 flex flex-col justify-center items-center gap-1 relative">
      <span className="absolute top-0 right-0">
        <button onClick={closeAuthPhase}>
          <HoverWrapper classes="p-1 flex justify-center items-center">
            <CloseVector classes="w-5 h-5 inline-block" />
          </HoverWrapper>
        </button>
      </span>
      <div>
        <LoginButtonGoogle />
      </div>
      <div>
        <LoginButtonNaver />
      </div>
      <div>
        <LoginButtonKakao />
      </div>
    </div>
  );
};

export default Login;
