import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";
import { useEffect } from "react";

const getMotivation: (
  motivationTextId: string
) => Promise<{ motivationText: { text: string } }> = async (
  motivationTextId
) => {
  const { data } = await axiosInstance.get(
    api.motivationText.getMotivationText(motivationTextId)
  );
  return data;
};

const useQueryMotivationText = (motivationTextId: string) => {
  const { openAsyncError } = useAsyncErrorContext();
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: queryKeys.motivationText.useQueryMotivationText(motivationTextId),
    queryFn: () => getMotivation(motivationTextId),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isError) {
      openAsyncError("모티베이션 텍스트를 가져오는데 실패했습니다");
    }
  }, [isError, openAsyncError]);

  return { motivationTextData: data?.motivationText, isLoading, isFetching };
};

export default useQueryMotivationText;
