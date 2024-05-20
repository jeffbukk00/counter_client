import { counterFrontConstants } from "../counter/counter-front/constants";
import CountCircle from "../counter/counter-front/CountCircle";
import SampleCounterDisplay from "./SampleCounterDisplay";

const SampleCounter = () => {
  return (
    <div className="w-full h-1/3 flex justify-center items-start">
      <div className="w-80 h-40 border border-gray-300 relative">
        <CountCircle
          countCircleType={counterFrontConstants.countCircleType.negative}
          startCount={0}
          currentCount={15}
          endCount={30}
          direction={counterFrontConstants.counterDirection.up}
        />
        <CountCircle
          countCircleType={counterFrontConstants.countCircleType.positive}
          startCount={0}
          currentCount={15}
          endCount={30}
          direction={counterFrontConstants.counterDirection.up}
        />
        <SampleCounterDisplay />
        <div className="absolute w-full bottom-3 flex justify-center items-center">
          <h3 className="inline-block text-lg">카운터</h3>
        </div>
      </div>
    </div>
  );
};

export default SampleCounter;
