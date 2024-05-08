import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import { queryKeys } from "@/tanstack-query/queryKeys";

const getBucket: (
  bucketId: string
) => Promise<{ bucket: { title: string } }> = async (bucketId) => {
  const { data } = await axiosInstance.get(api.bucket.getBucket(bucketId));
  return data;
};

const useQueryBucket = (bucketId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.bucket.useQueryBucket(bucketId),
    queryFn: () => getBucket(bucketId),
  });

  return { bucketData: data?.bucket, isLoading };
};

export default useQueryBucket;
