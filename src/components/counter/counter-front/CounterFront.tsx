import Count from "./Count";
import { CounterFrontDataType } from "./types";

const CounterFront = ({
  counterFrontData,
}: {
  counterFrontData: CounterFrontDataType;
}) => {
  return (
    <>
      <Count counterFrontData={counterFrontData} />
      <p>{counterFrontData.title}</p>
    </>
  );
};

export default CounterFront;
