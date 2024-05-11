import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";

const getMotivationLink: (
  motivationLinkId: string
) => Promise<{ motivationLink: { title: string; link: string } }> = async (
  motivationLinkId
) => {
  const { data } = await axiosInstance.get(
    api.motivationLink.getMotivationLink(motivationLinkId)
  );
  return data;
};

const useQueryMotivationLink = (motivationLinkId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.motivationLink.useQueryMotivationLink(motivationLinkId),
    queryFn: () => getMotivationLink(motivationLinkId),
  });

  return { motivationLinkData: data?.motivationLink, isLoading };
};

export default useQueryMotivationLink;
