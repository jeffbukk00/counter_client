import axiosInstance from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateUnreadGuideIds = async (checkedGuideId: string) => {
  return await axiosInstance().patch(api.user.updateUnreadGuideIds, {
    checkedGuideId,
  });
};

const useMutationUpdateUnreadGuideIds = () => {
  const queryClient = useQueryClient();
  const { mutate: mutateUpdateUnreadGuideIds } = useMutation({
    mutationFn: updateUnreadGuideIds,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.useQueryUserData,
      });
    },
  });

  return { mutateUpdateUnreadGuideIds };
};

export default useMutationUpdateUnreadGuideIds;
