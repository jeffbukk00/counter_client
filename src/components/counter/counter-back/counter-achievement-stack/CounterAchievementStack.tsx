import useMutationResetAchievementStack from "./hooks/http/useMutationResetAchievementStack";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";

import SelectedDigitalNumberVector from "@/shared/assets/digital-numbers/SelectedDigitalNumberVector";
import Control from "@/components/ui/control/Control";
import ResetControlVector from "@/components/ui/control/assets/ResetControlVector";

// counter의 여태까지의 누적된 achievementStack을 유저에게 시각적으로 보여주는 컴포넌트.
const CounterAchievementStack = ({
  currentAchievementStack,
  counterId,
}: {
  currentAchievementStack: number;
  counterId: string;
}) => {
  // counter의 achievementStack을 리셋하는 비동기 요청을 담은 커스텀 훅.
  const { mutateResetAchievementStack } =
    useMutationResetAchievementStack(counterId);

  // box의 로딩 상태에 따른 유저 피드백을 관리하는 커스텀 훅.
  // 여기서는 box가 로딩 상태로 전환되었을 때, 유저 피드백을 화면 상에 표시하기 위해 호출하는 함수를 반환.
  const { activate } = useBoxLoadingContext();

  // achievementStack을 6자리의 10진수로 변환.
  // 6자리보다 작은 자릿수라면, 6자리가 될 때까지 "0"으로 채움.
  let achievementStack = currentAchievementStack.toString();
  if (achievementStack.length < 6)
    achievementStack =
      "0".repeat(6 - achievementStack.length) + achievementStack;

  return (
    <>
      <span className="absolute top-5 left-[50%] translate-x-[-50%]">
        <Control
          title="리셋"
          action={() => {
            // counter의 achievementStack을 리셋하는 비동기 요청 호출 시, 로딩 상태에 대한 유저 피드백.
            activate(counterId);
            // counter의 achievementStack을 리셋하는 비동기 요청 호출
            mutateResetAchievementStack();
          }}
        >
          <ResetControlVector classes="w-5 h-5 inline-block" />
        </Control>
      </span>
      <div className="w-full h-full flex justify-center items-center">
        <ul className="w-full grid grid-cols-6">
          {achievementStack.split("").map((e, i) => {
            return (
              <li key={i}>
                <SelectedDigitalNumberVector
                  classes="w-full h-10"
                  number={Number(e)}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <div className="absolute bottom-6 w-full flex justify-center">
        <p className="text-sm">번 목표 카운트를 달성했습니다</p>
      </div>
    </>
  );
};

export default CounterAchievementStack;
