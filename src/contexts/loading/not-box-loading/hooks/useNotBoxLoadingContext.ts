import { useContext } from "react";
import { NotBoxLoadingContext } from "../NotBoxLoadingContext";

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
