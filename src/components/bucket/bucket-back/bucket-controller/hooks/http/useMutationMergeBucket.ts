import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import { constantsInQueryKeys } from "@/tanstack-query/queryKeys";

import useNotBoxLoadingContext from "@/contexts/loading/not-box-loading/hooks/useNotBoxLoadingContext";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

// bucket의 병합에 대한 비동기 요청.
const mergeBucket = (bucketIdSubject: string) => {
  return async (bucketIdObject: string) => {
    return await axiosInstance().post(api.bucket.mergeBucket(bucketIdSubject), {
      bucketIdObject,
    });
  };
};

// bucket의 병합에 대한 비동기 요청을 담은 커스텀 훅.
const useMutationMergeBucket = (
  bucketIdSubject: string,
  closeModal: () => void
) => {
  const { inactivateModal } = useNotBoxLoadingContext();

  const { openAsyncError } = useAsyncErrorContext();

  const queryClient = useQueryClient();
  const { mutate: mutateMergeBucket } = useMutation({
    mutationFn: mergeBucket(bucketIdSubject),
    onSuccess: () => {
      // bucket의 병합에 대한 비동기 요청 성공 시
      // bucket들의 id 리스트를 관리하는 비동기 요청의 캐시를 업데이트.
      queryClient.invalidateQueries({
        queryKey: [constantsInQueryKeys.buckets],
      });

      // 비동기 요청의 로딩 상태에 대한 유저 피드백 종료.
      inactivateModal();

      // 모달 닫기
      closeModal();
    },
    onError: () => {
      // 비동기 요청의 로딩 상태에 대한 유저 피드백 종료.
      inactivateModal();

      // 비동기 요청에서 에러 발생 시, 유저 피드백.
      openAsyncError("버킷 병합에 실패했습니다");

      // 모달 닫기
      closeModal();
    },
  });

  return { mutateMergeBucket };
};

export default useMutationMergeBucket;
