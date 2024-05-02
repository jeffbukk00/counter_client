import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { axiosInstance } from "@/axios/axiosInstance";
import { constantsInQueryKeys } from "@/tanstack-query/queryKeys";

const postAuthorizationCode: (provider: string) => Promise<void> = async (
  provider: string
) => {
  await axiosInstance.post(
    `/auth/oauth/token/${provider}${window.location.search}`
  );
};

const useMutationPostAuthorizationCode = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: postAuthorizationCode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [constantsInQueryKeys.auth] });
      navigate("/main/buckets");
    },
  });

  return { mutatePostAuthorizationCode: mutate };
};

export default useMutationPostAuthorizationCode;
