import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";

import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

// box가 담고 있는 모든 motivationText들의 id를 불러오는 비동기 요청.
const getMotivationTextIds: (
  boxId: string,
  boxType: number
) => Promise<{ motivationTextIds: string[] }> = async (boxId, boxType) => {
  const { data } = await axiosInstance().get(
    api.motivationText.getMotivationTextIds(boxId, boxType)
  );
  return data;
};

// box가 담고 있는 모든 motivationText들의 id를 불러오는 비동기 요청을 호출하는 커스텀 훅.
const useQueryMotivationTextIds = (boxId: string, boxType: number) => {
  const { openAsyncError } = useAsyncErrorContext();

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: queryKeys.motivationText.useQueryMotivationTextIds(
      boxId,
      boxType
    ),
    queryFn: () => getMotivationTextIds(boxId, boxType),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isError) {
      // 비동기 요청이 실패 했을 때, 유저 피드백.
      openAsyncError("모티베이션 텍스트들을 가져오는데 실패했습니다");
    }
  }, [isError, openAsyncError]);

  return { motivationTextIds: data?.motivationTextIds, isLoading, isFetching };
};

export default useQueryMotivationTextIds;
