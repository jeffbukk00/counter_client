import { CounterFrontDataType } from "./types";
import { guideConstants } from "@/components/ui/user-feedback/guide/constants";

import useBoxGuide from "@/components/ui/user-feedback/guide/hooks/useBoxGuide";

import Count from "./Count";

const CounterFront = ({
  counterFrontData,
}: {
  counterFrontData: CounterFrontDataType;
}) => {
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
