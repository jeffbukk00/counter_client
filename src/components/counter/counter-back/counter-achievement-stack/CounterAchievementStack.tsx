import SelectedDigitalNumberVector from "@/shared/assets/digital-numbers/SelectedDigitalNumberVector";
import useMutationResetAchievementStack from "./hooks/http/useMutationResetAchievementStack";
import Control from "@/components/ui/control/Control";
import ResetControlVector from "@/components/ui/control/assets/ResetControlVector";

const CountDisplay = ({
  currentAchievementStack,
  counterId,
}: {
  currentAchievementStack: number;
  counterId: string;
}) => {
  const { mutateResetAchievementStack } =
    useMutationResetAchievementStack(counterId);

  let achievementStack = currentAchievementStack.toString();
  if (achievementStack.length < 6)
    achievementStack =
      "0".repeat(6 - achievementStack.length) + achievementStack;

  return (
    <>
      <Control title="리셋" action={mutateResetAchievementStack}>
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
    </>
  );
};

export default CountDisplay;
