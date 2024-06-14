import { useMutation, useQueryClient } from "@tanstack/react-query";

import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

import axiosInstance from "@/axios/axiosInstance";
import { queryKeys } from "@/tanstack-query/queryKeys";
import { api } from "@/tanstack-query/api";

// bucket의 수정에 대한 비동기 요청.
const editBucket = (bucketId: string) => {
  return async (bucketData: { title: string }) => {
    return await axiosInstance().put(
      api.bucket.editBucket(bucketId),
      bucketData
    );
  };
};

// bucket의 수정에 대한 비동기 요청을 담고 있는 커스텀 훅.
const useMutationEditBucket = (bucketId: string) => {
  const { inactivate } = useBoxLoadingContext();

  const { openAsyncError } = useAsyncErrorContext();

  const queryClient = useQueryClient();
  const { mutate: mutateEditBucket } = useMutation({
    mutationFn: editBucket(bucketId),
    onSuccess: () => {
      // bucket의 수정에 대한 비동기 요청 성공 시,
      // 같은 bucket을 가져오는 비동기 요청의 캐시를 업데이트.
      queryClient.invalidateQueries({
        queryKey: queryKeys.bucket.useQueryBucket(bucketId),
      });

      // 비동기 요청의 로딩 상태에 대한 유저 피드백 종료.
      inactivate(bucketId);
    },
    onError: () => {
      // bucket의 수정에 대한 비동기 요청 실패 시,
      // 비동기 요청의 로딩 상태에 대한 유저 피드백 종료.
      inactivate(bucketId);

      // 비동기 요청에서 에러 발생 시, 유저 피드백.
      openAsyncError("버킷 수정에 실패했습니다");
    },
  });

  return { mutateEditBucket };
};

export default useMutationEditBucket;
