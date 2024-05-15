import { useContext } from "react";
import { NotBoxGuideContext } from "../NotBoxGuideContext";

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
