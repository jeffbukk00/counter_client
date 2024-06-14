/*
  같은 디렉토리 위치에 있는 컴포넌트 등에서 사용하는 타입들.
*/

export interface BucketSelectionListPropsType {
  selectBucket: (bucketData: { id: string; title: string }) => void;
}

export interface BucketSelectionPropsType {
  title: string;
  selectBucketHandler: () => void;
}
