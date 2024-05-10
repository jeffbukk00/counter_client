import { counterBackConstants } from "./constants";
import { ChangeCounterBackButtonPropsType } from "./types";

import ChangeToControllerButtonVector from "@/shared/assets/box-back-types/ChangeToControllerButtonVector";
import ChangeToAchievementStackButtonVector from "@/shared/assets/box-back-types/ChangeToAchievementStackButtonVector";
import ChangeToMotivationButtonVector from "@/shared/assets/box-back-types/ChangeToMotivationButtonVector";

const ChangeCounterBackTypeButton = ({
  type,
  currentCounterBackType,
  setCurrentCounterBackType,
}: ChangeCounterBackButtonPropsType) => {
  const isSelected = type === currentCounterBackType;

  return (
    <>
      {type === counterBackConstants.counterBackType.controller && (
        <button
          onClick={() =>
            setCurrentCounterBackType(
              counterBackConstants.counterBackType.controller
            )
          }
        >
          <ChangeToControllerButtonVector
            onSelected={isSelected ? "text-black" : "text-gray-300"}
          />
        </button>
      )}
      {type === counterBackConstants.counterBackType.achievementStack && (
        <button
          onClick={() =>
            setCurrentCounterBackType(
              counterBackConstants.counterBackType.achievementStack
            )
          }
        >
          <ChangeToAchievementStackButtonVector
            onSelected={isSelected ? "text-black" : "text-gray-300"}
          />
        </button>
      )}
      {type === counterBackConstants.counterBackType.motivation && (
        <button
          onClick={() =>
            setCurrentCounterBackType(
              counterBackConstants.counterBackType.motivation
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

export default ChangeCounterBackTypeButton;
