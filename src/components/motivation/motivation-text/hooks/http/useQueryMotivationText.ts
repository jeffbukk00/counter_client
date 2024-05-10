import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";

const getMotivation: (
  motivationTextId: string
) => Promise<{ motivationText: { text: string } }> = async (
  motivationTextId
) => {
  const { data } = await axiosInstance.get(
    api.motivationText.getMotivationText(motivationTextId)
  );
  return data;
};

const useQueryMotivationText = (motivationTextId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.motivationText.useQueryMotivationText(motivationTextId),
    queryFn: () => getMotivation(motivationTextId),
  });

  return { motivationTextData: data?.motivationText, isLoading };
};

export default useQueryMotivationText;
