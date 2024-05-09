import { CountButtonPropsType } from "./types";
import { counterFrontConstants } from "./constants";

import PlusVector from "./assets/PlusVector";
import MinusVector from "./assets/MinusVector";

const CountButton = ({
  type,

  digit,
  direction,
  getCloseToEndCount,
  becomeDistantFromEndCount,
}: CountButtonPropsType) => {
  let isPositive: boolean;

  if (direction === counterFrontConstants.counterDirection.up) {
    if (type === counterFrontConstants.countButtonType.plus) {
      isPositive = true;
    } else {
      isPositive = false;
    }
  } else {
    if (type === counterFrontConstants.countButtonType.plus) {
      isPositive = false;
    } else {
      isPositive = true;
    }
  }
  return (
    <button
      onClick={() =>
        isPositive
          ? getCloseToEndCount(digit)
          : becomeDistantFromEndCount(digit)
      }
      className={`w-full h-1/2 ${
        isPositive ? "bg-positive" : "bg-negative"
      } opacity-50`}
    >
      {type === counterFrontConstants.countButtonType.plus ? (
        <PlusVector />
      ) : (
        <MinusVector />
      )}
    </button>
  );
};

export default CountButton;
