import { useState } from "react";

// 현재 페이즈가 전체 페이즈들 중 어디에 해당하는지에 대한 상태를 관리하는 커스텀 훅.
const useNavigator = (firstPhase: number, lastPhase: number) => {
  const [currentPhase, setCurrentPhase] = useState(firstPhase);

  const isInFirstPhase = currentPhase === firstPhase;
  const isInLastPhase = currentPhase === lastPhase;

  const gotoPrevPhase = () => setCurrentPhase((prev) => prev - 1);
  const gotoNextPhase = () => setCurrentPhase((prev) => prev + 1);

  return {
    currentPhase,
    isInFirstPhase,
    isInLastPhase,
    gotoPrevPhase,
    gotoNextPhase,
  };
};

export default useNavigator;
