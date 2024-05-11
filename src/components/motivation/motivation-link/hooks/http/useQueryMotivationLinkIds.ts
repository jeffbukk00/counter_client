import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";

const getMotivationLinkIds: (
  boxId: string,
  boxType: number
) => Promise<{ motivationLinkIds: string[] }> = async (boxId, boxType) => {
  const { data } = await axiosInstance.get(
    api.motivationLink.getMotivationLinkIds(boxId, boxType)
  );
  return data;
};

const useQueryMotivationLinkIds = (boxId: string, boxType: number) => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.motivationLink.useQueryMotivationLinkIds(
      boxId,
      boxType
    ),
    queryFn: () => getMotivationLinkIds(boxId, boxType),
  });

  return { motivationLinkIds: data?.motivationLinkIds, isLoading };
};

export default useQueryMotivationLinkIds;
