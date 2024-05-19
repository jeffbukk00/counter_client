import { ChangeBucketBackTypeButtonPropsType } from "./types";
import { bucketBackConstants } from "./constants";

import ChangeToControllerButtonVector from "../../../shared/assets/box-back-types/ChangeToControllerButtonVector";
import ChangeToMotivationButtonVector from "../../../shared/assets/box-back-types/ChangeToMotivationButtonVector";
import HoverWrapper from "@/components/styles/HoverWrapper";

const ChangeBucketBackTypeButton = ({
  type,
  currentBucketBackType,
  setCurrentBucketBackType,
}: ChangeBucketBackTypeButtonPropsType) => {
  const isSelected = type === currentBucketBackType;

  return (
    <>
      {type === bucketBackConstants.bucketBackType.controller && (
        <HoverWrapper
          classes={`flex justify-center items-center transition-transform duration-200 ease-in p-[2px] ${
            isSelected ? "translate-y-8" : ""
          }`}
        >
          <button
            onClick={() =>
              setCurrentBucketBackType(
                bucketBackConstants.bucketBackType.controller
              )
            }
          >
            <ChangeToControllerButtonVector
              classes="w-6 h-6"
              isSelected={isSelected}
            />
          </button>
        </HoverWrapper>
      )}
      {type === bucketBackConstants.bucketBackType.motivation && (
        <HoverWrapper
          classes={`flex justify-center items-center transition-transform duration-200 ease-in p-[4px] ${
            isSelected ? "translate-y-8" : ""
          }`}
        >
          <button
            onClick={() =>
              setCurrentBucketBackType(
                bucketBackConstants.bucketBackType.motivation
              )
            }
          >
            <ChangeToMotivationButtonVector
              classes="w-5 h-5 "
              onSelected={isSelected ? "#232323" : "#ccc"}
            />
          </button>
        </HoverWrapper>
      )}
    </>
  );
};

export default ChangeBucketBackTypeButton;
