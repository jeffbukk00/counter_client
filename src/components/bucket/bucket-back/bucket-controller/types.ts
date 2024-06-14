/*
  같은 디렉토리 위치에 있는 컴포넌트 등에서 사용하는 타입들.
*/

export interface BucketBackData {
  id: string;
  title: string | undefined;
}

export interface BucketControllerPropsType {
  openBucketEditPhase: () => void;
  bucketBackData: BucketBackData;
}

export interface BucketMergePhasePropsType {
  closeModal: () => void;
  bucketBackData: BucketBackData;
}
