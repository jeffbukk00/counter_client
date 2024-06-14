import { useState } from "react";

// box의 대표적인 두가지 상태(앞면 또는 뒷면)를 관리하는 커스텀 훅.
const useFlip = () => {
  const [isFront, setIsFront] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const flip = () => setIsFront((prev) => !prev);
  const showFlipButton = () => setIsVisible(true);
  const hideFlipButton = () => setIsVisible(false);

  return { isFront, isVisible, flip, showFlipButton, hideFlipButton };
};

export default useFlip;
