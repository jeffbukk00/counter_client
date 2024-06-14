import { CounterControllerPropsType } from "./types";
import { guideConstants } from "@/components/ui/user-feedback/guide/constants";

import useBoxGuide from "@/components/ui/user-feedback/guide/hooks/useBoxGuide";

import CounterDuplicateControl from "./CounterDuplicateControl";
import CounterEditControl from "./CounterEditControl";
import CounterMoveControl from "./CounterMoveControl";
import CounterResetControl from "./CounterResetControl";
import CounterRemoveControl from "./CounterRemoveControl";

// counter의 controller의 최상위 컴포넌트.
// controller는 수정, 복제, 삭제 등 counter에 대한 기본적인 조작을 담당.
const CounterController = ({
  openCounterEditPhase,
  counterBackData,
}: CounterControllerPropsType) => {
  // 유저가 화면 상에서 이 컴포넌트를 보게 되었을 때, 해당하는 가이드를 동반하여 표시하기 위해 호출.
  useBoxGuide(guideConstants.guideIds["guideId7"], counterBackData.id);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex justify-center items-center gap-2">
        <CounterEditControl openCounterEditPhase={openCounterEditPhase} />
        <CounterDuplicateControl
          bucketId={counterBackData.bucketId}
          counterId={counterBackData.id}
        />
        <CounterMoveControl counterBackData={counterBackData} />
        <CounterResetControl counterId={counterBackData.id} />
        <CounterRemoveControl
          bucketId={counterBackData.bucketId}
          counterId={counterBackData.id}
        />
      </div>
    </div>
  );
};

export default CounterController;
