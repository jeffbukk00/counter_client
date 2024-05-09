import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { CounterDataType } from "../../types";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";

const getCounter: (
  counterId: string
) => Promise<{ counter: CounterDataType }> = async (counterId) => {
  const { data } = await axiosInstance.get(api.counter.getCounter(counterId));

  return data;
};

const useQueryCounter = (counterId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.counter.useQueryCounter(counterId),
    queryFn: () => getCounter(counterId),
  });

  return { counterData: data?.counter, isLoading };
};

export default useQueryCounter;
