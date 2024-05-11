import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";

const createMotivationText = (boxId: string, boxType: number) => {
  return async (text: string) => {
    return await axiosInstance.post(
      api.motivationText.createMotivationText(boxId, boxType),
      { text }
    );
  };
};

const useMutationCreateMotivationText = (boxId: string, boxType: number) => {
  const queryClient = useQueryClient();
  const { mutate: mutateCreateMotivationText } = useMutation({
    mutationFn: createMotivationText(boxId, boxType),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.motivationText.useQueryMotivationTextIds(
          boxId,
          boxType
        ),
      });
    },
  });

  return { mutateCreateMotivationText };
};

export default useMutationCreateMotivationText;
