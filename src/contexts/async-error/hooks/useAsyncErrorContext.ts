import { useContext } from "react";

import { AsyncErrorContext } from "../AsyncErrorContext";

// AsyncErrorContext에 접근하는 커스텀 훅.
const useAsyncErrorContext = () => {
  const { asyncErrorState, openAsyncError, closeAsyncError } =
    useContext(AsyncErrorContext);

  return { asyncErrorState, openAsyncError, closeAsyncError };
};

export default useAsyncErrorContext;
