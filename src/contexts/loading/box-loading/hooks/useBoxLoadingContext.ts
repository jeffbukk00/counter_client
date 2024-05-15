import { useContext } from "react";
import { BoxLoadingContext } from "../BoxLoadingContext";

const useBoxLoadingContext = () => {
  const { activatedBoxIds, activate, inactivate } =
    useContext(BoxLoadingContext);

  return {
    activatedBoxIds,
    activate,
    inactivate,
  };
};

export default useBoxLoadingContext;
