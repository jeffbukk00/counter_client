import { BucketControllerpPropsType } from "../types";

import BucketEditControl from "./BucketEditControl";

const BucketController = ({
  openBucketEditPhase,
  bucketBackData,
}: BucketControllerpPropsType) => {
  return (
    <>
      <BucketEditControl openBucketEditPhase={openBucketEditPhase} />
    </>
  );
};

export default BucketController;
