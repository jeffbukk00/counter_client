import { CounterPropsType } from "./types";
import { CounterBackDataType } from "./counter-back/types";
import { CounterFrontDataType } from "./counter-front/types";

import useQueryCounter from "./hooks/http/useQueryCounter";

import CounterBack from "./counter-back/CounterBack";
import CounterFront from "./counter-front/CounterFront";

const Counter = ({ counterId, bucketId, isFront }: CounterPropsType) => {
  const { counterData, isLoading } = useQueryCounter(counterId);

  if (isLoading) return <p>카운터를 요청 중입니다...</p>;

  let counterFrontData: CounterFrontDataType;
  let counterBackData: CounterBackDataType;

  if (counterData) {
    counterFrontData = {
      id: counterId,
      title: counterData.title,
      startCount: counterData.startCount,
      currentCount: counterData.currentCount,
      endCount: counterData.endCount,
      direction: counterData.direction,
      achievementStack: counterData.achievementStack,
    };

    counterBackData = { ...counterFrontData, bucketId };
  }

  return (
    <>
      {isFront ? (
        //@ts-expect-error counterFrontData는 이미 할당 된 상태
        <CounterFront counterFrontData={counterFrontData} />
      ) : (
        //@ts-expect-error counterBackData는 이미 할당 된 상태
        <CounterBack counterBackData={counterBackData} />
      )}
    </>
  );
};

export default Counter;
