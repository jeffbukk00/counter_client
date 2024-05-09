export interface BucketSelectionListPropsType {
  selectBucket: (bucketData: { id: string; title: string }) => void;
}

export interface BucketSelectionPropsType {
  title: string;
  selectBucketHandler: () => void;
}
