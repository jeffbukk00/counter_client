import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";
import { useQuery } from "@tanstack/react-query";

const getMotivationTextIds: (
  boxId: string,
  boxType: number
) => Promise<{ motivationTextIds: string[] }> = async (boxId, boxType) => {
  const { data } = await axiosInstance.get(
    api.motivationText.getMotivationTextIds(boxId, boxType)
  );
  return data;
};

const useQueryMotivationTextIds = (boxId: string, boxType: number) => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.motivationText.useQueryMotivationTextIds(
      boxId,
      boxType
    ),
    queryFn: () => getMotivationTextIds(boxId, boxType),
  });

  return { motivationTextIds: data?.motivationTextIds, isLoading };
};

export default useQueryMotivationTextIds;
