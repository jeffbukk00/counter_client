import { useCallback, useState } from "react";

const useFeedbackToPaste = () => {
  const [isPasted, setIsPasted] = useState(false);

  const updateIsPasted = useCallback(
    (state: boolean) => setIsPasted(state),
    []
  );

  return { isPasted, updateIsPasted };
};

export default useFeedbackToPaste;
