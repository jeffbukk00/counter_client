import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";

const removeMotivationLink = (
  boxId: string,
  boxType: number,
  motivationLinkId: string
) => {
  return axiosInstance.delete(
    api.motivationLink.removeMotivationLink(boxId, boxType, motivationLinkId)
  );
};

const useMutationRemoveMotivationLink = (
  boxId: string,
  boxType: number,
  motivationLinkId: string
) => {
  const queryClient = useQueryClient();
  const { mutate: mutateRemoveMotivationLink } = useMutation({
    mutationFn: () => removeMotivationLink(boxId, boxType, motivationLinkId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.motivationLink.useQueryMotivationLinkIds(
          boxId,
          boxType
        ),
      });
    },
  });

  return { mutateRemoveMotivationLink };
};

export default useMutationRemoveMotivationLink;
