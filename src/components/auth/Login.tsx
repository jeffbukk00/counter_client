import LoginButtonGoogle from "./LoginButtonGoogle";
import LoginButtonNaver from "./LoginButtonNaver";
import LoginButtonKakao from "./LoginButtonKakao";
import CloseVector from "@/shared/assets/CloseVector";

import HoverWrapper from "../styles/HoverWrapper";

// 로그인을 위한 컴포넌트.
const Login = ({ closeAuthPhase }: { closeAuthPhase: () => void }) => {
  return (
    <div className="p-4 rounded-xl border border-gray-300 bg-white w-[100%] h-64 flex flex-col justify-center items-center gap-1 absolute top-0 left-0">
      <span className="absolute top-1 right-1">
        <button onClick={closeAuthPhase}>
          <HoverWrapper classes="p-1 flex justify-center items-center">
            <CloseVector classes="w-5 h-5 inline-block" />
          </HoverWrapper>
        </button>
      </span>
      <div>
        <LoginButtonKakao />
      </div>
      <div>
        <LoginButtonNaver />
      </div>
      <div>
        <LoginButtonGoogle />
      </div>
    </div>
  );
};

export default Login;
