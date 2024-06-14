import { CountDisplayPropsType } from "./types";

import CountDigit from "./CountDigit";
import CountDisplayScreen from "./CountDisplayScreen";

// 변화하는 currentCount를 유저에게 보여주는 ui를 위한 컴포넌트.
// currentCount를 유저가 조작할 수 있게 하는 컴포넌트.
const CountDisplay = ({
  direction,
  currentCount,
  isInEndCount,
  getCloseToEndCount,
  becomeDistantFromEndCount,
  countDisplayScreenType,
}: CountDisplayPropsType) => {
  // currentCount를 6자리의 10진수로 변환.
  // 6자리 미만의 자릿 수를 가지고 있다면, 부족한 자릿 수에 대해 "0"으로 표현.
  let count = currentCount.toString();
  if (count.length < 6) count = "0".repeat(6 - count.length) + count;

  return (
    <div className="w-full h-full flex justify-center items-center">
      <ul className="relative w-full grid grid-cols-6">
        <CountDisplayScreen countDisplayScreenType={countDisplayScreenType} />
        {count.split("").map((e, i) => {
          const digit = 6 - i;
          return (
            <CountDigit
              key={digit}
              number={Number(e)}
              digit={digit}
              direction={direction}
              isInEndCount={isInEndCount}
              getCloseToEndCount={getCloseToEndCount}
              becomeDistantFromEndCount={becomeDistantFromEndCount}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default CountDisplay;
