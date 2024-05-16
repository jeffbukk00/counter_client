import { axiosInstance } from "@/axios/axiosInstance";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const getMotivationTextIds: (
  boxId: string,
  boxType: number
) => Promise<{ motivationTextIds: string[] }> = async (boxId, boxType) => {
  const { data } = await axiosInstance.get(
    api.motivationText.getMotivationTextIds(boxId, boxType)
  );
  return data;
};

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
      openAsyncError("모티베이션 텍스트들을 가져오는데 실패했습니다");
    }
  }, [isError, openAsyncError]);

  return { motivationTextIds: data?.motivationTextIds, isLoading, isFetching };
};

export default useQueryMotivationTextIds;
