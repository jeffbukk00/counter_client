import { counterFrontConstants } from "./constants";

const CountDisplayScreen = ({
  countDisplayScreenType,
}: {
  countDisplayScreenType: number;
}) => {
  if (
    countDisplayScreenType ===
    counterFrontConstants.counterDisplayScreenType.default
  )
    return null;

  const isPositive =
    countDisplayScreenType ===
    counterFrontConstants.counterDisplayScreenType.positive;

  return (
    <div
      className={`w-full h-full absolute top-0 left-0 ${
        isPositive
          ? "animate-countDisplayScreenPositive bg-positive"
          : "animate-countDisplayScreenNegative"
      }`}
    ></div>
  );
};

export default CountDisplayScreen;
