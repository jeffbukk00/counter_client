import { counterFrontConstants } from "./constants";

// currentCount가 업데이트 됨에 따라 변화하는 countDisplayScreenType에맞는, CountDisplay를 뒤덮는 screen을 띄우는 컴포넌트.
const CountDisplayScreen = ({
  countDisplayScreenType,
}: {
  countDisplayScreenType: number;
}) => {
  // countDisplayScreenType이 default라면, screen을 없앰.
  if (
    countDisplayScreenType ===
    counterFrontConstants.counterDisplayScreenType.default
  )
    return null;

  // countDisplayScreenType이 positive 혹은 negative인지 판별하는 변수.
  const isPositive =
    countDisplayScreenType ===
    counterFrontConstants.counterDisplayScreenType.positive;

  return (
    <div
      className={`w-full h-20 absolute top-0 left-0 ${
        // countDisplayType에 따른 애니메이션. 반응형 ui.
        isPositive
          ? "animate-countDisplayScreenPositive bg-positive"
          : "animate-countDisplayScreenNegative"
      }`}
    ></div>
  );
};

export default CountDisplayScreen;
