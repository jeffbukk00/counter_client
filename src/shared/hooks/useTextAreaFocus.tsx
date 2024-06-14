import { useEffect, useRef } from "react";

// textarea 요소가 화면에 보여졌을 때, 자동으로 포커스 하기 위한 커스텀 훅.
const useTextareaFocus = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);
  return { textareaRef };
};

export default useTextareaFocus;
