import SelectedDigitalNumberVector from "@/shared/assets/digital-numbers/SelectedDigitalNumberVector";
import useMutationResetAchievementStack from "./hooks/http/useMutationResetAchievementStack";
import Control from "@/components/ui/control/Control";
import ResetControlVector from "@/components/ui/control/assets/ResetControlVector";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";

const CountDisplay = ({
  currentAchievementStack,
  counterId,
}: {
  currentAchievementStack: number;
  counterId: string;
}) => {
  const { mutateResetAchievementStack } =
    useMutationResetAchievementStack(counterId);
  const { activate } = useBoxLoadingContext();

  let achievementStack = currentAchievementStack.toString();
  if (achievementStack.length < 6)
    achievementStack =
      "0".repeat(6 - achievementStack.length) + achievementStack;

  return (
    <>
      <Control
        title="리셋"
        action={() => {
          activate(counterId);
          mutateResetAchievementStack();
        }}
      >
        <ResetControlVector />
      </Control>
      <ul className="relative">
        {achievementStack.split("").map((e, i) => {
          return (
            <li key={i} className="w-12 h-10 relative inline-block">
              <SelectedDigitalNumberVector number={Number(e)} />
            </li>
          );
        })}
      </ul>
      <p>번 목표 카운트를 달성했습니다</p>
    </>
  );
};

export default CountDisplay;
