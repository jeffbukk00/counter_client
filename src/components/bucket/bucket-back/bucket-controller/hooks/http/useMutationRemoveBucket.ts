import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import { constantsInQueryKeys } from "@/tanstack-query/queryKeys";

import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

// bucket의 제거에 대한 비동기 요청.
const removeBucket = async (bucketId: string) => {
  return axiosInstance().delete(api.bucket.deleteBucket(bucketId));
};

// bucket의 제거에 대한 비동기 요청을 담은 커스텀 훅.
const useMutationRemoveBucket = (bucketId: string) => {
  const { inactivate } = useBoxLoadingContext();

  const { openAsyncError } = useAsyncErrorContext();

  const queryClient = useQueryClient();
  const { mutate: mutateRemoveBucket } = useMutation({
    mutationFn: () => removeBucket(bucketId),
    onSuccess: () => {
      // bucket의 제거에 대한 비동기 요청 성공 시
      // bucket들의 id 리스트를 관리하는 비동기 요청의 캐시를 업데이트.
      queryClient.invalidateQueries({
        queryKey: [constantsInQueryKeys.buckets],
      });

      // 비동기 요청의 로딩 상태에 대한 유저 피드백 종료.
      inactivate(bucketId);
    },
    onError: () => {
      // 비동기 요청의 로딩 상태에 대한 유저 피드백 종료.
      inactivate(bucketId);

      // 비동기 요청에서 에러 발생 시, 유저 피드백.
      openAsyncError("버킷 삭제에 실패했습니다");
    },
  });

  return { mutateRemoveBucket };
};

export default useMutationRemoveBucket;
