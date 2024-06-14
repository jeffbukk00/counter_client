import { counterBackConstants } from "./constants";
import { ChangeCounterBackButtonPropsType } from "./types";

import ChangeToControllerButtonVector from "@/shared/assets/box-back-types/ChangeToControllerButtonVector";
import ChangeToAchievementStackButtonVector from "@/shared/assets/box-back-types/ChangeToAchievementStackButtonVector";
import ChangeToMotivationButtonVector from "@/shared/assets/box-back-types/ChangeToMotivationButtonVector";
import HoverWrapper from "@/components/styles/HoverWrapper";
import ChangeToHistoryButtonVector from "@/shared/assets/box-back-types/ChangeToHistoryButtonVector";

// 클릭하면, 스스로가 해당하는 counter 뒷면의 타입으로 전환 시키는 역할을 하는 버튼 컴포넌트.
const ChangeCounterBackTypeButton = ({
  type,
  currentCounterBackType,
  setCurrentCounterBackType,
}: ChangeCounterBackButtonPropsType) => {
  // 이 컴포넌트가 해당 되는 counter 뒷면의 타입이 현재 유저 선택한 counter 뒷면의 타입인지 판별하는 변수.
  const isSelected = type === currentCounterBackType;

  return (
    <>
      {type === counterBackConstants.counterBackType.controller && (
        <HoverWrapper
          classes={`flex justify-center items-center transition-transform duration-200 ease-in p-[2px] ${
            isSelected ? "translate-y-8" : ""
          }`}
        >
          <button
            onClick={() =>
              setCurrentCounterBackType(
                counterBackConstants.counterBackType.controller
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
      {type === counterBackConstants.counterBackType.achievementStack && (
        <HoverWrapper
          classes={`flex justify-center items-center transition-transform duration-200 ease-in p-[4px] ${
            isSelected ? "translate-y-8" : ""
          }`}
        >
          <button
            onClick={() =>
              setCurrentCounterBackType(
                counterBackConstants.counterBackType.achievementStack
              )
            }
          >
            <ChangeToAchievementStackButtonVector
              isSelected={isSelected}
              classes="w-5 h-5"
            />
          </button>
        </HoverWrapper>
      )}
      {type === counterBackConstants.counterBackType.history && (
        <HoverWrapper
          classes={`flex justify-center items-center transition-transform duration-200 ease-in p-[4px] ${
            isSelected ? "translate-y-8" : ""
          }`}
        >
          <button
            onClick={() =>
              setCurrentCounterBackType(
                counterBackConstants.counterBackType.history
              )
            }
          >
            <ChangeToHistoryButtonVector
              classes="w-5 h-5 "
              onSelected={isSelected ? "#232323" : "#ccc"}
            />
          </button>
        </HoverWrapper>
      )}
      {type === counterBackConstants.counterBackType.motivation && (
        <HoverWrapper
          classes={`flex justify-center items-center transition-transform duration-200 ease-in p-[4px] ${
            isSelected ? "translate-y-8" : ""
          }`}
        >
          <button
            onClick={() =>
              setCurrentCounterBackType(
                counterBackConstants.counterBackType.motivation
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

export default ChangeCounterBackTypeButton;
