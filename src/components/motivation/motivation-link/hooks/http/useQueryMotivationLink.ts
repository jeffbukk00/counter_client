import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";
import { useEffect } from "react";

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

const useQueryMotivationLink = (motivationLinkId: string) => {
  const { openAsyncError } = useAsyncErrorContext();
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: queryKeys.motivationLink.useQueryMotivationLink(motivationLinkId),
    queryFn: () => getMotivationLink(motivationLinkId),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isError) {
      openAsyncError("모티베이션 링크를 가져오는데 실패했습니다");
    }
  }, [isError, openAsyncError]);
  return { motivationLinkData: data?.motivationLink, isLoading, isFetching };
};

export default useQueryMotivationLink;
