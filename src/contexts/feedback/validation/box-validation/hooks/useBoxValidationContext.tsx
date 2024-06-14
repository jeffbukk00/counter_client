import { useContext } from "react";

import { BoxValidationContext } from "../BoxValidationContext";

// BoxValidationContext에 접근하기 위한 커스텀 훅.
const useBoxValidationContext = () => {
  const { invalidBoxes, addInvalidBox, removeInvalidBox } =
    useContext(BoxValidationContext);

  return { invalidBoxes, addInvalidBox, removeInvalidBox };
};

export default useBoxValidationContext;
