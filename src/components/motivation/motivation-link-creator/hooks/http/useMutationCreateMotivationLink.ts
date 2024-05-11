import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createMotivationLink = (boxId: string, boxType: number) => {
  return async (motivationLinkData: { title: string; link: string }) => {
    return await axiosInstance.post(
      api.motivationLink.createMotivationLink(boxId, boxType),
      { title: motivationLinkData.title, link: motivationLinkData.link }
    );
  };
};

const useMutationCreateMotivationLink = (boxId: string, boxType: number) => {
  const queryClient = useQueryClient();
  const { mutate: mutateCreateMotivationLink } = useMutation({
    mutationFn: createMotivationLink(boxId, boxType),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.motivationLink.useQueryMotivationLinkIds(
          boxId,
          boxType
        ),
      });
    },
  });

  return { mutateCreateMotivationLink };
};

export default useMutationCreateMotivationLink;
