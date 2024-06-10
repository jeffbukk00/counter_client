import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/axios/axiosInstance";
import { CounterDataType } from "../../types";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";
import { useEffect } from "react";

const getCounter: (
  counterId: string
) => Promise<{ counter: CounterDataType }> = async (counterId) => {
  const { data } = await axiosInstance().get(api.counter.getCounter(counterId));

  return data;
};

const useQueryCounter = (counterId: string) => {
  const { openAsyncError } = useAsyncErrorContext();
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: queryKeys.counter.useQueryCounter(counterId),
    queryFn: () => getCounter(counterId),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isError) {
      openAsyncError("카운터를 가져오는데 실패했습니다");
    }
  }, [openAsyncError, isError]);

  return { counterData: data?.counter, isLoading, isFetching };
};

export default useQueryCounter;
