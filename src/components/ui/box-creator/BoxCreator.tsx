import { BoxCreatorPropsType } from "./types";
import { boxCreatorConstants } from "./constants";

import BucketCreator from "@/components/bucket-creator/BucketCreator";
import CounterCreator from "@/components/counter-creator/CounterCreator";

const BoxCreator = ({ boxCreatorType, bucketId }: BoxCreatorPropsType) => {
  return (
    <div className="w-full h-40vh flex justify-center items-center">
      <div className="w-80 h-40 border">
        {boxCreatorType ===
          boxCreatorConstants.boxCreatorType.bucketCreator && <BucketCreator />}
        {/* {boxCreatorType ===
          boxCreatorConstants.boxCreatorType.counterCreator && (
          <CounterCreator bucketId={bucketId} />
        )} */}
      </div>
    </div>
  );
};

export default BoxCreator;
