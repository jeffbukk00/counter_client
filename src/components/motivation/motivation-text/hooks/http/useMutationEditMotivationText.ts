import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";

import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

// motivationText를 수정하는 비동기 요청.
const editMotivationText = (motivationTextId: string) => {
  return async (text: string) => {
    return await axiosInstance().put(
      api.motivationText.editMotivationText(motivationTextId),
      { text }
    );
  };
};

// motivationText를 수정하는 비동기 요청을 담고 있는 커스텀 훅.
const useMutationEditMotivationText = (
  motivationTextId: string,
  boxId: string
) => {
  const { inactivate } = useBoxLoadingContext();

  const { openAsyncError } = useAsyncErrorContext();

  const queryClient = useQueryClient();
  const { mutate: mutateEditMotivationText } = useMutation({
    mutationFn: editMotivationText(motivationTextId),
    onSuccess: () => {
      // motivationText를 수정하는 비동기 요청이 성공 했을 시,
      // 해당 motivationText를 불러오는 비동기 요청의 캐시 업데이트.
      queryClient.invalidateQueries({
        queryKey:
          queryKeys.motivationText.useQueryMotivationText(motivationTextId),
      });

      // 비동기 요청이 끝난 후, 로딩 상태에 대한 유저 피드백 종료.
      inactivate(boxId);
    },
    onError: () => {
      // motivationText를 수정하는 비동기 요청이 성공 실패 시,
      // 비동기 요청이 끝난 후, 로딩 상태에 대한 유저 피드백 종료.
      inactivate(boxId);

      // 비동기 요청이 실패 했을 때, 유저 피드백.
      openAsyncError("모티베이션 텍스트 수정에 실패했습니다");
    },
  });

  return { mutateEditMotivationText };
};

export default useMutationEditMotivationText;
