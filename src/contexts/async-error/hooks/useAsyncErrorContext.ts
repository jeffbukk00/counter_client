import { useContext } from "react";

import { AsyncErrorContext } from "../AsyncErrorContext";

const useAsyncErrorContext = () => {
  const { asyncErrorState, openAsyncError, closeAsyncError } =
    useContext(AsyncErrorContext);

  return { asyncErrorState, openAsyncError, closeAsyncError };
};

export default useAsyncErrorContext;
