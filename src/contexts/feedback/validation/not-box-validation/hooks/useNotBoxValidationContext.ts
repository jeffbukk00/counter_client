import { useContext } from "react";

import { NotBoxValidationContext } from "../NotBoxValidationContext";

// NotBoxValidationContext에 접근하기 위한 커스텀 훅.
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
