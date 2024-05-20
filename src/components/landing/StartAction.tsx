import HoverWrapper from "../styles/HoverWrapper";
import CounterLogoVector from "./assets/CounterLogoVector";

import { useState } from "react";
import Login from "../auth/Login";

const StartAction = () => {
  const [isAuth, setIsAuth] = useState(false);

  const openAuthPhase = () => setIsAuth(true);
  const closeAuthPhase = () => setIsAuth(false);

  return (
    <div className="w-full h-2/3 flex justify-center items-center">
      {isAuth && <Login closeAuthPhase={closeAuthPhase} />}

      {!isAuth && (
        <div className="animate-bounce">
          <HoverWrapper classes="p-2">
            <button onClick={openAuthPhase}>
              <CounterLogoVector classes="h-5 w-5 inline-block mb-3" />
              <span className="text-2xl flex justify-center items-center">
                카운터 시작하기
              </span>
            </button>
          </HoverWrapper>
        </div>
      )}
    </div>
  );
};

export default StartAction;
