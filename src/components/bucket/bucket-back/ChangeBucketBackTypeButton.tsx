import { ChangeBucketBackTypeButtonPropsType } from "./types";
import { bucketBackConstants } from "./constants";

import ChangeToControllerButtonVector from "../../../shared/assets/box-back-types/ChangeToControllerButtonVector";
import ChangeToMotivationButtonVector from "../../../shared/assets/box-back-types/ChangeToMotivationButtonVector";
import HoverWrapper from "@/components/styles/HoverWrapper";

// 클릭하면, 스스로가 해당하는 bucket 뒷면의 타입으로 전환 시키는 역할을 하는 버튼 컴포넌트.
const ChangeBucketBackTypeButton = ({
  type,
  currentBucketBackType,
  setCurrentBucketBackType,
}: ChangeBucketBackTypeButtonPropsType) => {
  // 이 컴포넌트가 해당 되는 bucket 뒷면의 타입이 현재 유저 선택한 bucket 뒷면의 타입인지 판별하는 변수.
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
