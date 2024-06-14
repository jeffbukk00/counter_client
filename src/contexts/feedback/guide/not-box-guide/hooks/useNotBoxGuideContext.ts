import { useContext } from "react";

import { NotBoxGuideContext } from "../NotBoxGuideContext";

// NotBoxGuideContext에 접근하기 위한 커스텀 훅.
const useNotBoxGuideContext = () => {
  const {
    boxCreatorGuide,
    modalGuide,
    updateBoxCreatorGuide,
    updateModalGuide,
  } = useContext(NotBoxGuideContext);

  return {
    boxCreatorGuide,
    modalGuide,
    updateBoxCreatorGuide,
    updateModalGuide,
  };
};

export default useNotBoxGuideContext;
