import { useState } from "react";

// box 생성이 시작되었는지에 대한 상태를 관리하는 커스텀 훅.
const useCreationStart = () => {
  const [creationIsStarted, setCreationIsStarted] = useState(false);

  const startCreation = () => setCreationIsStarted(true);
  const finishCreation = () => setCreationIsStarted(false);

  return { creationIsStarted, startCreation, finishCreation };
};

export default useCreationStart;
