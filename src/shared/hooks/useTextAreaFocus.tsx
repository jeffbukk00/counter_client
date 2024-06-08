import { useEffect, useRef } from "react";

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
