import { guideConstants } from "../ui/user-feedback/guide/constants";

import useBoxCreatorGuide from "../ui/user-feedback/guide/hooks/useBoxCreatorGuide";

import StartCreationButton from "../ui/creator/StartCreationButton";

// counter 생성을 시작하는 컴포넌트.
const CounterCreationStart = ({
  startCreation,
}: {
  startCreation: () => void;
}) => {
  // 유저가 화면 상에서 이 컴포넌트를 보게 되었을 때, 해당하는 가이드를 동반하여 표시하기 위해 호출.
  useBoxCreatorGuide(guideConstants.guideIds["guideId4"]);

  return (
    <StartCreationButton
      startCreation={
        // counter 생성을 시작.
        startCreation
      }
      classes="w-8 h-8 inline-block"
      hover="p-2"
    />
  );
};

export default CounterCreationStart;
