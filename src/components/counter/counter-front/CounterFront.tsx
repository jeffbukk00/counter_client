import { CounterFrontDataType } from "./types";
import { guideConstants } from "@/components/ui/user-feedback/guide/constants";

import useBoxGuide from "@/components/ui/user-feedback/guide/hooks/useBoxGuide";

import Count from "./Count";

// counter 앞면에 대한 최상위 컴포넌트.
const CounterFront = ({
  counterFrontData,
}: {
  counterFrontData: CounterFrontDataType;
}) => {
  // 유저가 화면 상에서 이 컴포넌트를 보게 되었을 때, 해당하는 가이드를 동반하여 표시하기 위해 호출.
  useBoxGuide(guideConstants.guideIds["guideId6"], counterFrontData.id);

  return (
    <>
      <Count counterFrontData={counterFrontData} />
      <div className="absolute w-full bottom-3 flex justify-center items-center">
        <h3 className="inline-block text-lg">{counterFrontData.title}</h3>
      </div>
    </>
  );
};

export default CounterFront;
