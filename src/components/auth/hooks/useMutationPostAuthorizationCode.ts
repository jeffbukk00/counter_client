import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import axiosInstance from "@/axios/axiosInstance";
import { constantsInQueryKeys } from "@/tanstack-query/queryKeys";
import { api } from "@/tanstack-query/api";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

const postAuthorizationCode: (
  provider: string
) => Promise<{ loggedIn: boolean; token: string }> = async (
  provider: string
) => {
  const { data } = await axiosInstance().post(
    api.auth.postAuthorizationCode(provider)
  );
  return data;
};

const useMutationPostAuthorizationCode = () => {
  const navigate = useNavigate();
  const { openAsyncError } = useAsyncErrorContext();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: postAuthorizationCode,
    onSuccess: (data) => {
      const { token } = data;
      localStorage.setItem("token", token);
      console.log(1);
      queryClient.invalidateQueries({
        queryKey: [constantsInQueryKeys.auth],
      });
      navigate("/main/buckets");
    },
    onError: () => {
      openAsyncError("로그인에 실패했습니다");
      navigate("/landing");
    },
  });

  return { mutatePostAuthorizationCode: mutate };
};

export default useMutationPostAuthorizationCode;
