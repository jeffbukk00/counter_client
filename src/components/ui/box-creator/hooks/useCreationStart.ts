import { useState } from "react";

const useCreationStart = () => {
  const [creationIsStarted, setCreationIsStarted] = useState(false);

  const startCreation = () => setCreationIsStarted(true);
  const finishCreation = () => setCreationIsStarted(false);

  return { creationIsStarted, startCreation, finishCreation };
};

export default useCreationStart;
