export interface BucketBackPropsType {
  bucketBackData: { id: string; title: string | undefined };
}

export interface BucketBackTopPropsType {
  currentBucketBackType: number;
  setCurrentBucketBackType: React.Dispatch<React.SetStateAction<number>>;
}

export interface ChangeBucketBackTypeButtonPropsType {
  type: number;
  currentBucketBackType: number;
  setCurrentBucketBackType: React.Dispatch<React.SetStateAction<number>>;
}
