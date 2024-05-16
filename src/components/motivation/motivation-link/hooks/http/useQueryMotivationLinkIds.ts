import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";
import { useEffect } from "react";

import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

const getMotivationLinkIds: (
  boxId: string,
  boxType: number
) => Promise<{ motivationLinkIds: string[] }> = async (boxId, boxType) => {
  const { data } = await axiosInstance.get(
    api.motivationLink.getMotivationLinkIds(boxId, boxType)
  );
  return data;
};

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
      openAsyncError("모티베이션 링크들을 가져오는데 실패했습니다");
    }
  }, [isError, openAsyncError]);
  return { motivationLinkIds: data?.motivationLinkIds, isLoading, isFetching };
};

export default useQueryMotivationLinkIds;
