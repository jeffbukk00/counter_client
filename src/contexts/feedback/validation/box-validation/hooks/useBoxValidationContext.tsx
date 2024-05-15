import { useContext } from "react";
import { BoxValidationContext } from "../BoxValidationContext";

const useBoxValidationContext = () => {
  const { invalidBoxes, addInvalidBox, removeInvalidBox } =
    useContext(BoxValidationContext);

  return { invalidBoxes, addInvalidBox, removeInvalidBox };
};

export default useBoxValidationContext;
