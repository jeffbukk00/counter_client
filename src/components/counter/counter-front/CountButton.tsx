import { CountButtonPropsType } from "./types";
import { counterFrontConstants } from "./constants";

import PlusVector from "./assets/PlusVector";
import MinusVector from "./assets/MinusVector";

// count를 업데이트 하는 버튼 컴포넌트.
const CountButton = ({
  type,
  digit,
  direction,
  getCloseToEndCount,
  becomeDistantFromEndCount,
}: CountButtonPropsType) => {
  // counter의 direction과 버튼의 부호를 고려한 타입이 존재.
  let isPositive: boolean;

  if (direction === counterFrontConstants.counterDirection.up) {
    if (type === counterFrontConstants.countButtonType.plus) {
      // counter의 dicrection이 up, 버튼의 부호가 "+"
      isPositive = true;
    } else {
      // counter의 dicrection이 up, 버튼의 부호가 "-"
      isPositive = false;
    }
  } else {
    if (type === counterFrontConstants.countButtonType.plus) {
      // counter의 dicrection이 down, 버튼의 부호가 "+"
      isPositive = false;
    } else {
      // counter의 dicrection이 down, 버튼의 부호가 "-"
      isPositive = true;
    }
  }
  return (
    <button
      onClick={() =>
        // 버튼의 타입이 positive라면, 현재의 count를 endCount와 가까워지는 방향으로 업데이트.
        // 버튼이 타입이 positive가 아니라면, 현재의 count가 endCount로부터 멀어지는 방향으로 업데이트.
        isPositive
          ? getCloseToEndCount(digit)
          : becomeDistantFromEndCount(digit)
      }
      className={`w-full h-10 ${
        isPositive ? "bg-positive" : "bg-negative"
      } opacity-30`}
    >
      {type === counterFrontConstants.countButtonType.plus ? (
        <PlusVector direction={direction} />
      ) : (
        <MinusVector direction={direction} />
      )}
    </button>
  );
};

export default CountButton;
