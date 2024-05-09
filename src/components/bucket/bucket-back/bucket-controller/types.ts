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
