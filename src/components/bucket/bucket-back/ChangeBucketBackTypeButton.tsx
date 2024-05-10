import { ChangeBucketBackTypeButtonPropsType } from "./types";
import { bucketBackConstants } from "./constants";

import ChangeToControllerButtonVector from "../../../shared/assets/box-back-types/ChangeToControllerButtonVector";
import ChangeToMotivationButtonVector from "../../../shared/assets/box-back-types/ChangeToMotivationButtonVector";

const ChangeBucketBackTypeButton = ({
  type,
  currentBucketBackType,
  setCurrentBucketBackType,
}: ChangeBucketBackTypeButtonPropsType) => {
  const isSelected = type === currentBucketBackType;

  return (
    <>
      {type === bucketBackConstants.bucketBackType.controller && (
        <button
          onClick={() =>
            setCurrentBucketBackType(
              bucketBackConstants.bucketBackType.controller
            )
          }
        >
          <ChangeToControllerButtonVector
            onSelected={isSelected ? "text-black" : "text-gray-300"}
          />
        </button>
      )}
      {type === bucketBackConstants.bucketBackType.motivation && (
        <button
          onClick={() =>
            setCurrentBucketBackType(
              bucketBackConstants.bucketBackType.motivation
            )
          }
        >
          <ChangeToMotivationButtonVector
            onSelected={isSelected ? "#000" : "#ccc"}
          />
        </button>
      )}
    </>
  );
};

export default ChangeBucketBackTypeButton;
