import { useCallback, useState } from "react";

const useFeedbackToCopy = () => {
  const [isCopied, setIsCopied] = useState(false);

  const updateIsCopied = useCallback(
    (state: boolean) => setIsCopied(state),
    []
  );

  return { isCopied, updateIsCopied };
};

export default useFeedbackToCopy;
