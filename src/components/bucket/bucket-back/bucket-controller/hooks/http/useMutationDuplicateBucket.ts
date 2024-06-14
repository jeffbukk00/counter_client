import { useMutation, useQueryClient } from "@tanstack/react-query";

import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

import axiosInstance from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import { constantsInQueryKeys } from "@/tanstack-query/queryKeys";

// bucket의 복제를 위한 비동기 요청.
const duplicateBucket = async (bucketId: string) => {
  return await axiosInstance().post(api.bucket.duplicateBucket(bucketId));
};

// bucket의 복제를 위한 비동기 요청을 담고 있는 커스텀 훅.
const useMutationDuplicateBucket = (bucketId: string) => {
  const { inactivate } = useBoxLoadingContext();

  const { openAsyncError } = useAsyncErrorContext();

  const queryClient = useQueryClient();
  const { mutate: mutateDuplicateBucket } = useMutation({
    mutationFn: () => duplicateBucket(bucketId),
    onSuccess: () => {
      // bucket의 복제에 대한 비동기 요청 성공 시
      // bucket들의 id 리스트를 관리하는 비동기 요청의 캐시를 업데이트.
      queryClient.invalidateQueries({
        queryKey: [constantsInQueryKeys.buckets],
      });

      // 비동기 요청의 로딩 상태에 대한 유저 피드백 종료.
      inactivate(bucketId);
    },
    onError: () => {
      // bucket의 복제에 대한 비동기 요청 실패 시,
      // 비동기 요청의 로딩 상태에 대한 유저 피드백 종료.
      inactivate(bucketId);

      // 비동기 요청에서 에러 발생 시, 유저 피드백.
      openAsyncError("버킷 복제에 실패했습니다");
    },
  });

  return { mutateDuplicateBucket };
};

export default useMutationDuplicateBucket;
