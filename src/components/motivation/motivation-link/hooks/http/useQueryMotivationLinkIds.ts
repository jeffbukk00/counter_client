import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";

import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

// 박스의 모든 motivationLink들의 id를 불러오는 비동기 요청.
const getMotivationLinkIds: (
  boxId: string,
  boxType: number
) => Promise<{ motivationLinkIds: string[] }> = async (boxId, boxType) => {
  const { data } = await axiosInstance().get(
    api.motivationLink.getMotivationLinkIds(boxId, boxType)
  );
  return data;
};

// 박스의 모든 motivationLink들의 id를 불러오는 비동기 요청을 호출하는 커스텀 훅.
const useQueryMotivationLinkIds = (boxId: string, boxType: number) => {
  const { openAsyncError } = useAsyncErrorContext();

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: queryKeys.motivationLink.useQueryMotivationLinkIds(
      boxId,
      boxType
    ),
    queryFn: () => getMotivationLinkIds(boxId, boxType),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isError) {
      // 비동기 요청이 실패 했을 때, 유저 피드백.
      openAsyncError("모티베이션 링크들을 가져오는데 실패했습니다");
    }
  }, [isError, openAsyncError]);
  return { motivationLinkIds: data?.motivationLinkIds, isLoading, isFetching };
};

export default useQueryMotivationLinkIds;
