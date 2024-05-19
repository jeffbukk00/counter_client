import CountDigit from "./CountDigit";
import CountDisplayScreen from "./CountDisplayScreen";
import { CountDisplayPropsType } from "./types";

const CountDisplay = ({
  direction,
  currentCount,
  isInEndCount,
  getCloseToEndCount,
  becomeDistantFromEndCount,
  countDisplayScreenType,
}: CountDisplayPropsType) => {
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
