import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";

import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

// 단일 motivationText 데이터를 불러오는 비동기 요청.
const getMotivationText: (
  motivationTextId: string
) => Promise<{ motivationText: { text: string } }> = async (
  motivationTextId
) => {
  const { data } = await axiosInstance().get(
    api.motivationText.getMotivationText(motivationTextId)
  );
  return data;
};

// 단일 motivationText 데이터를 불러오는 비동기 요청을 호출하는 커스텀 훅.
const useQueryMotivationText = (motivationTextId: string) => {
  const { openAsyncError } = useAsyncErrorContext();
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: queryKeys.motivationText.useQueryMotivationText(motivationTextId),
    queryFn: () => getMotivationText(motivationTextId),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isError) {
      // 비동기 요청이 실패 했을 때, 유저 피드백.
      openAsyncError("모티베이션 텍스트를 가져오는데 실패했습니다");
    }
  }, [isError, openAsyncError]);

  return { motivationTextData: data?.motivationText, isLoading, isFetching };
};

export default useQueryMotivationText;
