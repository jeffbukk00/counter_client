import { useMutation } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";

const validateShareLink: (
  shareLink: string
) => Promise<{ isValid: boolean; username: string }> = async (shareLink) => {
  const { data } = await axiosInstance.post(
    api.sharing.validateShareLink(shareLink)
  );
  return data;
};

const useMutationValidateShareLink = (
  onValidationSuccessHandler: (username: string) => void
) => {
  const { mutate: mutateValidateShareLink, isPending } = useMutation({
    mutationFn: validateShareLink,
    onSuccess: (data) => {
      if (data && data.isValid) {
        onValidationSuccessHandler(data.username);
      }
    },
  });

  return { mutateValidateShareLink, isPending };
};

export default useMutationValidateShareLink;
