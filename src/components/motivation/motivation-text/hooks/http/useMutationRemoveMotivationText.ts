import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";

const removeMotivationText = async (
  boxId: string,
  boxType: number,
  motivationTextId: string
) => {
  return await axiosInstance.delete(
    api.motivationText.removeMotivationText(boxId, boxType, motivationTextId)
  );
};

const useMutationRemoveMotivationText = (
  boxId: string,
  boxType: number,
  motivationTextId: string
) => {
  const queryClient = useQueryClient();
  const { mutate: mutateRemoveMotivationText } = useMutation({
    mutationFn: () => removeMotivationText(boxId, boxType, motivationTextId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.motivationText.useQueryMotivationTextIds(
          boxId,
          boxType
        ),
      });
    },
  });

  return { mutateRemoveMotivationText };
};

export default useMutationRemoveMotivationText;
