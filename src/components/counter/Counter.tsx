import { CounterPropsType } from "./types";
import { CounterBackDataType } from "./counter-back/types";
import { CounterFrontDataType } from "./counter-front/types";

import useQueryCounter from "./hooks/http/useQueryCounter";

import CounterBack from "./counter-back/CounterBack";
import CounterFront from "./counter-front/CounterFront";
import LoadingFeedbackBox from "../ui/user-feedback/loading/LoadingFeedbackBox";

// 단일 counter에 대한 컴포넌트들 중, 최상위 컴포넌트.
const Counter = ({ counterId, bucketId, isFront }: CounterPropsType) => {
  // 단일 counter에 대한 데이터를 불러오는 비동기 요청을 호출하는 커스텀 훅.
  const { counterData, isLoading, isFetching } = useQueryCounter(counterId);

  // 단일 counter에 대한 데이터를 불러오는 비동기 요청이 로딩 중일 때, 유저 피드백.
  if (isLoading) return <LoadingFeedbackBox />;

  // counter이 대표적인 두가지 상태: counter 앞면과 뒷면.
  // counter의 상태에 따른 데이터들을 정리.
  let counterFrontData: CounterFrontDataType;
  let counterBackData: CounterBackDataType;

  if (counterData) {
    // counter 데이터를 불러오는 비동기 요청이 성공한 경우, 할당.
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
      {isFetching && <LoadingFeedbackBox />}
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
