import { useState } from "react";

import Login from "@/components/auth/Login";
import ArrowRightVector from "@/shared/assets/ArrowRightVector";

// 이 어플리케이션을 처음으로 시작할 때 클릭하는 버튼 컴포넌트.
const HeroAction = () => {
  const [isAuthPhase, setIsAuthPhase] = useState(false);

  const openAuthPhase = () => setIsAuthPhase(true);
  const closeAuthPhase = () => setIsAuthPhase(false);

  return (
    <div className="relative">
      <button
        onClick={openAuthPhase}
        className="px-4 py-4 border border-gray-300 rounded-xl flex items-center gap-2 hover:border-positive hover:text-positive active:border-positive active:text-positive text-sm font-bold tracking-wider transition-colors duration-300 ease-in"
      >
        카운터와 함께 시작하기
        <ArrowRightVector classes="w-6 h-6 inline-block stroke-2 animate-bounceX stroke-positive" />
      </button>
      {isAuthPhase && <Login closeAuthPhase={closeAuthPhase} />}
    </div>
  );
};

export default HeroAction;
