import { useCallback, useState } from "react";

// 유저의 클립보드로부터 데이터가 붙여 넣어졌는지에 대한 상태를 관리하는 커스텀 훅.
const useFeedbackToPaste = () => {
  const [isPasted, setIsPasted] = useState(false);

  const updateIsPasted = useCallback(
    (state: boolean) => setIsPasted(state),
    []
  );

  return { isPasted, updateIsPasted };
};

export default useFeedbackToPaste;
