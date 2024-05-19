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
      <span className="absolute top-5 left-[50%] translate-x-[-50%]">
        <Control
          title="리셋"
          action={() => {
            activate(counterId);
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

export default CountDisplay;
