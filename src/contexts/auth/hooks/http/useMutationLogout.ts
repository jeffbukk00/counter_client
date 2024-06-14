import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import axiosInstance from "@/axios/axiosInstance";
import { constantsInQueryKeys } from "@/tanstack-query/queryKeys";
import { api } from "@/tanstack-query/api";

// 유저의 로그아웃을 위한 비동기 요청.
const postLogout: () => Promise<void> = async () => {
  await axiosInstance().post(api.auth.postLogout);
};

// 유저의 로그아웃을 위한 비동기 요청을 담고 있는 커스텀 훅.
const useMutationLogout = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      // 로그아웃이 성공했을 때,
      // 로컬 스토리지로부터 로그인 상태를 보장했던 jwt 토큰을 삭제.
      localStorage.removeItem("token");

      // 유저의 로그인 상태를 관리하는 비동기 요청의 캐시 업데이트.
      queryClient.resetQueries({
        queryKey: [constantsInQueryKeys.auth],
      });

      // 로그인 이전 라우터의 메인 페이지로 이동.
      navigate("/landing");
    },
  });

  return { mutatePostLogout: mutate };
};

export default useMutationLogout;
