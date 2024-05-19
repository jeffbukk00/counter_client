import { counterBackConstants } from "./constants";
import { ChangeCounterBackButtonPropsType } from "./types";

import ChangeToControllerButtonVector from "@/shared/assets/box-back-types/ChangeToControllerButtonVector";
import ChangeToAchievementStackButtonVector from "@/shared/assets/box-back-types/ChangeToAchievementStackButtonVector";
import ChangeToMotivationButtonVector from "@/shared/assets/box-back-types/ChangeToMotivationButtonVector";
import HoverWrapper from "@/components/styles/HoverWrapper";

const ChangeCounterBackTypeButton = ({
  type,
  currentCounterBackType,
  setCurrentCounterBackType,
}: ChangeCounterBackButtonPropsType) => {
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
