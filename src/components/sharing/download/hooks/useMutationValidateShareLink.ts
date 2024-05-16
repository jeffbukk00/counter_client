import { useMutation } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import useNotBoxLoadingContext from "@/contexts/loading/not-box-loading/hooks/useNotBoxLoadingContext";

const validateShareLink: (
  shareLink: string
) => Promise<{ isValid: boolean; username: string }> = async (shareLink) => {
  const { data } = await axiosInstance.post(
    api.sharing.validateShareLink(shareLink)
  );
  return data;
};

const useMutationValidateShareLink = (
  onValidationSuccessHandler: (username: string) => void,
  onValidationErrorHandler: () => void
) => {
  const { inactivateModal } = useNotBoxLoadingContext();
  const { mutate: mutateValidateShareLink, isPending } = useMutation({
    mutationFn: validateShareLink,
    onSuccess: (data) => {
      if (data && data.isValid) {
        inactivateModal();
        onValidationSuccessHandler(data.username);
      }
    },
    onError: () => {
      inactivateModal();
      onValidationErrorHandler();
    },
  });

  return { mutateValidateShareLink, isPending };
};

export default useMutationValidateShareLink;
