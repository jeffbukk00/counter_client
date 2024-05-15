import { useContext } from "react";
import { NotBoxValidationContext } from "../NotBoxValidationContext";

const useNotBoxValidationContext = () => {
  const {
    isBoxCreatorInvalid,
    isModalInvalid,
    updateIsBoxCreatorInvalid,
    updateIsModalInvalid,
  } = useContext(NotBoxValidationContext);

  return {
    isBoxCreatorInvalid,
    isModalInvalid,
    updateIsBoxCreatorInvalid,
    updateIsModalInvalid,
  };
};

export default useNotBoxValidationContext;
