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
      <p>{counterFrontData.title}</p>
    </>
  );
};

export default CounterFront;
