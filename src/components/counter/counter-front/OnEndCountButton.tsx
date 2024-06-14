import { OnEndCountButtonPropsType } from "./types";
import { counterFrontConstants } from "./constants";

import useMutationResetCount from "../counter-back/counter-controller/hooks/http/useMutationResetCount";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";

import ResetControlVector from "../../ui/control/assets/ResetControlVector";
import Control from "@/components/ui/control/Control";

// 현재 count가 endCount와 같아졌을 때, 이를 리셋하기 위한 버튼 컴포넌트.
const OnEndCountButton = ({
  changeCountDisplayScreenType,
  resetCurrentCount,
  counterId,
}: OnEndCountButtonPropsType) => {
  // count를 리셋하는 비동기 요청을 담은 커스텀 훅.
  const { mutateResetCount } = useMutationResetCount(counterId);

  // box의 로딩 상태에 따른 유저 피드백을 관리하는 커스텀 훅.
  // 여기서는 box가 로딩 상태로 전환되었을 때, 유저 피드백을 화면 상에 표시하기 위해 호출하는 함수를 반환.
  const { activate } = useBoxLoadingContext();

  return (
    <span className="absolute top-3 left-[50%] translate-x-[-50%]">
      <Control
        title="리셋"
        action={() => {
          // counterDisplayScreenType을 default로 바꿈.
          changeCountDisplayScreenType(
            counterFrontConstants.counterDisplayScreenType.default
          );
          // 현재 count를 관리하는 상태의 리셋.
          resetCurrentCount();
          // 현재 count를 리셋하는 비동기 요청이 호출 되었을 때, 로딩에 대한 유저 피드백.
          activate(counterId);

          // 현재 count를 리셋하는 비동기 요청 호출.
          // count history를 리셋하지 않음.
          mutateResetCount(false);
        }}
      >
        <ResetControlVector classes="w-5 h-5 inline-block" />
      </Control>
    </span>
  );
};

export default OnEndCountButton;
