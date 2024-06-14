import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";

import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

// 단일 motivationLink 데이터를 불러오는 비동기 요청.
const getMotivationLink: (
  motivationLinkId: string
) => Promise<{ motivationLink: { title: string; link: string } }> = async (
  motivationLinkId
) => {
  const { data } = await axiosInstance().get(
    api.motivationLink.getMotivationLink(motivationLinkId)
  );
  return data;
};

// 단일 motivationLink 데이터를 불러오는 비동기 요청을 호출하는 커스텀 훅.
const useQueryMotivationLink = (motivationLinkId: string) => {
  const { openAsyncError } = useAsyncErrorContext();

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: queryKeys.motivationLink.useQueryMotivationLink(motivationLinkId),
    queryFn: () => getMotivationLink(motivationLinkId),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isError) {
      // 비동기 요청이 실패 했을 때, 유저 피드백.
      openAsyncError("모티베이션 링크를 가져오는데 실패했습니다");
    }
  }, [isError, openAsyncError]);
  return { motivationLinkData: data?.motivationLink, isLoading, isFetching };
};

export default useQueryMotivationLink;
