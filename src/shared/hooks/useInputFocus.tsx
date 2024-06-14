import { useEffect, useRef } from "react";

// input 요소가 화면에 보여졌을 때, 자동으로 포커스 하기 위한 커스텀 훅.
const useInputFocus = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return { inputRef };
};

export default useInputFocus;
