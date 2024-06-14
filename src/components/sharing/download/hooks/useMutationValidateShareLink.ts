import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";

import useNotBoxLoadingContext from "@/contexts/loading/not-box-loading/hooks/useNotBoxLoadingContext";

// 공유 받은 shareLink의 유효성 및 안정성을 검증하는 비동기 요청.
const validateShareLink: (
  shareLink: string
) => Promise<{ isValid: boolean; username: string }> = async (shareLink) => {
  const { data } = await axiosInstance().post(
    api.sharing.validateShareLink(shareLink)
  );
  return data;
};

// 공유 받은 shareLink의 유효성 및 안정성을 검증하는 비동기 요청을 담고 있는 커스텀 훅.
const useMutationValidateShareLink = (
  onValidationSuccessHandler: (username: string) => void,
  onValidationErrorHandler: () => void
) => {
  const { inactivateModal } = useNotBoxLoadingContext();

  const { mutate: mutateValidateShareLink, isPending } = useMutation({
    mutationFn: validateShareLink,
    onSuccess: (data) => {
      if (data && data.isValid) {
        // 공유 받은 shareLink의 유효성 및 안정성을 검증하는 비동기 요청이 성공 했을 시,
        // 비동기 요청이 끝난 후, 로딩 상태에 대한 유저 피드백 종료.
        inactivateModal();

        // 비동기 요청 성공 시 호출하고자 했던 함수 호출.
        onValidationSuccessHandler(data.username);
      }
    },
    onError: () => {
      // 공유 받은 shareLink의 유효성 및 안정성을 검증하는 비동기 요청이 실패 했을 시,
      // 비동기 요청이 끝난 후, 로딩 상태에 대한 유저 피드백 종료.
      inactivateModal();

      // 비동기 요청이 실패 했을 때, 호출하고자 했던 함수 호출.
      onValidationErrorHandler();
    },
  });

  return { mutateValidateShareLink, isPending };
};

export default useMutationValidateShareLink;
