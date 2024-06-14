/*
  같은 디렉토리 위치에 있는 컴포넌트 등에서 사용하는 타입들.
*/

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

export interface BucketBackBodyPropsType {
  currentBucketBackType: number;
  bucketBackData: { id: string; title: string | undefined };
}

export interface BucketEditPhasePropsType {
  closeBucketEditPhase: () => void;
  bucketBackData: { id: string; title: string | undefined };
}
