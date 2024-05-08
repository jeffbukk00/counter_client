import { useState } from "react";

const useFlip = () => {
  const [isFront, setIsFront] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const flip = () => setIsFront((prev) => !prev);
  const showFlipButton = () => setIsVisible(true);
  const hideFlipButton = () => setIsVisible(false);

  return { isFront, isVisible, flip, showFlipButton, hideFlipButton };
};

export default useFlip;
