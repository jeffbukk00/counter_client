import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { queryKeys } from "@/tanstack-query/queryKeys";
import { api } from "@/tanstack-query/api";

const getBucketIds: () => Promise<{ bucketIds: string[] }> = async () => {
  const { data } = await axiosInstance.get(api.bucket.getBucketIds);
  return data;
};

const useQueryBucketIds = () => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.bucket.useQueryBucketIds,
    queryFn: getBucketIds,
  });

  return { bucketIds: data?.bucketIds, isLoading };
};

export default useQueryBucketIds;
