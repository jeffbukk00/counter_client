import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";

import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

// motivationLink를 제거하는 비동기 요청.
const removeMotivationLink = (
  boxId: string,
  boxType: number,
  motivationLinkId: string
) => {
  return axiosInstance().delete(
    api.motivationLink.removeMotivationLink(boxId, boxType, motivationLinkId)
  );
};

// motivationLink를 제거하는 비동기 요청을 담고 있는 커스텀 훅.
const useMutationRemoveMotivationLink = (
  boxId: string,
  boxType: number,
  motivationLinkId: string
) => {
  const { inactivate } = useBoxLoadingContext();

  const { openAsyncError } = useAsyncErrorContext();

  const queryClient = useQueryClient();
  const { mutate: mutateRemoveMotivationLink } = useMutation({
    mutationFn: () => removeMotivationLink(boxId, boxType, motivationLinkId),
    onSuccess: () => {
      // motivationLink를 제거하는 비동기 요청이 성공 했을 시,
      // box의 모든 motivationLink들의 id 리스트를 불러오는 비동기 요청의 캐시 업데이트.
      queryClient.invalidateQueries({
        queryKey: queryKeys.motivationLink.useQueryMotivationLinkIds(
          boxId,
          boxType
        ),
      });

      // 비동기 요청이 끝난 후, 로딩 상태에 대한 유저 피드백 종료.
      inactivate(boxId);
    },
    onError: () => {
      // motivationLink를 제거하는 비동기 요청이 실패 했을 시,
      // 비동기 요청이 끝난 후, 로딩 상태에 대한 유저 피드백 종료.
      inactivate(boxId);

      // 비동기 요청이 실패 했을 때, 유저 피드백.
      openAsyncError("모티베이션 링크 삭제에 실패했습니다");
    },
  });

  return { mutateRemoveMotivationLink };
};

export default useMutationRemoveMotivationLink;
