import { useCallback, useState } from "react";

// 유저의 클립보드에 데이터가 저장되었는지에 대한 상태를 관리하는 커스텀 훅.
const useFeedbackToCopy = () => {
  const [isCopied, setIsCopied] = useState(false);

  const updateIsCopied = useCallback(
    (state: boolean) => setIsCopied(state),
    []
  );

  return { isCopied, updateIsCopied };
};

export default useFeedbackToCopy;
