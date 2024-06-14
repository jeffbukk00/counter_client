import { useContext } from "react";

import { BoxLoadingContext } from "../BoxLoadingContext";

// BoxLoadingContext에 접근하기 위한 커스텀 훅.
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
