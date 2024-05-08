import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { axiosInstance } from "@/axios/axiosInstance";
import { constantsInQueryKeys } from "@/tanstack-query/queryKeys";
import { api } from "@/tanstack-query/api";

const postLogout: () => Promise<void> = async () => {
  await axiosInstance.post(api.auth.postLogout);
};

const useMutationLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      queryClient.resetQueries({
        queryKey: [constantsInQueryKeys.auth],
      });
      navigate("/landing");
    },
  });

  return { mutatePostLogout: mutate };
};

export default useMutationLogout;
