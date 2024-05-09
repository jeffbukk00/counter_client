import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";

const getBuckets: () => Promise<{
  buckets: { _id: string; title: string }[];
}> = async () => {
  const { data } = await axiosInstance.get(api.bucket.getBuckets);

  return data;
};

const useQueryBuckets = () => {
  const { data: bucketsData, isLoading } = useQuery({
    queryKey: queryKeys.bucket.useQueryBuckets,
    queryFn: getBuckets,
  });

  return { buckets: bucketsData?.buckets, isLoading };
};

export default useQueryBuckets;
