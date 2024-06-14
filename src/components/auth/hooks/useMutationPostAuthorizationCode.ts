import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import axiosInstance from "@/axios/axiosInstance";
import { constantsInQueryKeys } from "@/tanstack-query/queryKeys";
import { api } from "@/tanstack-query/api";

import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

// (oauth) 로그인 한 플랫폼의 인증 서버로부터 엑세스 토큰을 얻기 위한 권한 토큰을 서버로 보내는 비동기 요청.
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

// 위 비동기 요청에 대한 커스텀 훅.
const useMutationPostAuthorizationCode = () => {
  const navigate = useNavigate();

  const { openAsyncError } = useAsyncErrorContext();

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: postAuthorizationCode,
    onSuccess: (data) => {
      // 해당 요청이 성공한다면, 로그인을 위한 jwt 토큰을 응답 받음.
      const { token } = data;

      // 응답 받은 jwt 토큰을 로컬 스토리지에 저장.
      localStorage.setItem("token", token);

      // 인증과 관련된 비동기 요청들의 캐시를 업데이트.
      queryClient.invalidateQueries({
        queryKey: [constantsInQueryKeys.auth],
      });

      // 로그인 이후의 라우터의 메인 페이지로 이동.
      navigate("/main/buckets");
    },
    onError: () => {
      // 비동기 요청 실패 시, 유저 피드백.
      openAsyncError("로그인에 실패했습니다");

      // 로그인 이전의 라우터의 메인 페이지로 이동.
      navigate("/landing");
    },
  });

  return { mutatePostAuthorizationCode: mutate };
};

export default useMutationPostAuthorizationCode;
