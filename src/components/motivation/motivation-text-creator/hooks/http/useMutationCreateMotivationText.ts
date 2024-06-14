import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";

import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

// motivationText를 생성하는 비동기 요청.
const createMotivationText = (boxId: string, boxType: number) => {
  return async (text: string) => {
    return await axiosInstance().post(
      api.motivationText.createMotivationText(boxId, boxType),
      { text }
    );
  };
};

// motivationText를 생성하는 비동기 요청을 담고 있는 커스텀 훅.
const useMutationCreateMotivationText = (boxId: string, boxType: number) => {
  const { inactivate } = useBoxLoadingContext();

  const { openAsyncError } = useAsyncErrorContext();

  const queryClient = useQueryClient();
  const { mutate: mutateCreateMotivationText } = useMutation({
    mutationFn: createMotivationText(boxId, boxType),
    onSuccess: () => {
      // motivationText를 생성하는 비동기 요청이 성공 했을 시,
      //  box가 담고 있는 모든 motivationText들의 id 리스트를 불러오는 비동기 요청의 캐시 업데이트.
      queryClient.invalidateQueries({
        queryKey: queryKeys.motivationText.useQueryMotivationTextIds(
          boxId,
          boxType
        ),
      });

      // 비동기 요청이 끝난 후, 로딩 상태에 대한 유저 피드백 종료.
      inactivate(boxId);
    },
    onError: () => {
      // motivationText를 생성하는 비동기 요청이 실패 했을 시,
      // 비동기 요청이 끝난 후, 로딩 상태에 대한 유저 피드백 종료.
      inactivate(boxId);

      // 비동기 요청이 실패 했을 때, 유저 피드백.
      openAsyncError("모티베이션 텍스트 생성에 실패했습니다");
    },
  });

  return { mutateCreateMotivationText };
};

export default useMutationCreateMotivationText;
