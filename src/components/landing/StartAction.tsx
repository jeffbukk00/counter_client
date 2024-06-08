import HoverWrapper from "../styles/HoverWrapper";

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
        <div className="animate-bounceY">
          <HoverWrapper classes="p-2">
            <button onClick={openAuthPhase}>
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
