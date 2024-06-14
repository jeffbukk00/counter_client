import { useContext } from "react";

import { NotBoxLoadingContext } from "../NotBoxLoadingContext";

// NotBoxLoadingContext에 접근하기 위한 커스텀 훅.
const useNotBoxLoadingContext = () => {
  const {
    boxCreatorIsLoading,
    modalIsLoading,
    activateBoxCreator,
    inactivateBoxCreator,
    activateModal,
    inactivateModal,
  } = useContext(NotBoxLoadingContext);

  return {
    boxCreatorIsLoading,
    modalIsLoading,
    activateBoxCreator,
    inactivateBoxCreator,
    activateModal,
    inactivateModal,
  };
};

export default useNotBoxLoadingContext;
