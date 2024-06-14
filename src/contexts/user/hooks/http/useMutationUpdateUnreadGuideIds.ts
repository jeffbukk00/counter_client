import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";

// 유저 가이드를 읽음 처리 하기 위한 비동기 요청.
const updateUnreadGuideIds = async (checkedGuideId: string) => {
  return await axiosInstance().patch(api.user.updateUnreadGuideIds, {
    checkedGuideId,
  });
};

// 유저 가이드를 읽음 처리 하기 위한 비동기 요청을 담고 있는 커스텀 훅.
const useMutationUpdateUnreadGuideIds = () => {
  const queryClient = useQueryClient();

  const { mutate: mutateUpdateUnreadGuideIds } = useMutation({
    mutationFn: updateUnreadGuideIds,
    onSuccess: () => {
      // 요청 성공 시,
      // 유저 데이터를 불러오는 비동기 요청의 캐시를 업데이트.
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.useQueryUserData,
      });
    },
  });

  return { mutateUpdateUnreadGuideIds };
};

export default useMutationUpdateUnreadGuideIds;
