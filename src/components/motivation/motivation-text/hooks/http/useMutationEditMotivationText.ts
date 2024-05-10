import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";

const editMotivationText = (motivationTextId: string) => {
  return async (text: string) => {
    return await axiosInstance.put(
      api.motivationText.editMotivationText(motivationTextId),
      { text }
    );
  };
};

const useMutationEditMotivationText = (motivationTextId: string) => {
  const queryClient = useQueryClient();
  const { mutate: mutateEditMotivationText } = useMutation({
    mutationFn: editMotivationText(motivationTextId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          queryKeys.motivationText.useQueryMotivationText(motivationTextId),
      });
    },
  });

  return { mutateEditMotivationText };
};

export default useMutationEditMotivationText;
