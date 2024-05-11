import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";

const editMotivationLink = (motivationLinkId: string) => {
  return async (motivationLinkData: { title: string; link: string }) => {
    return axiosInstance.put(
      api.motivationLink.editMotivationLink(motivationLinkId),
      { title: motivationLinkData.title, link: motivationLinkData.link }
    );
  };
};

const useMutationEditMotivationLink = (motivationLinkId: string) => {
  const queryClient = useQueryClient();
  const { mutate: mutateEditMotivationLink } = useMutation({
    mutationFn: editMotivationLink(motivationLinkId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          queryKeys.motivationLink.useQueryMotivationLink(motivationLinkId),
      });
    },
  });

  return { mutateEditMotivationLink };
};

export default useMutationEditMotivationLink;
