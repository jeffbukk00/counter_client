import { useState } from "react";

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
