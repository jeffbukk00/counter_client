import { MotivationTextsPropsType } from "./types";

import useNavigator from "@/components/ui/navigator/hooks/useNavigator";

import MotivationText from "./MotivationText";
import BackToNotSelectedButton from "../BackToNotSelectedButton";
import GotoPrevPhaseButton from "@/components/ui/navigator/GotoPrevPhaseButton";
import GotoNextPhaseButton from "@/components/ui/navigator/GotoNextPhaseButton";
import MotivationTextCreator from "../motivation-text-creator/MotivationTextCreator";

const MotivationTexts = ({
  boxData,
  backToNotSelected,
  motivationTextIds,
}: MotivationTextsPropsType) => {
  const lastPhase = motivationTextIds.length;

  const {
    currentPhase,
    isInFirstPhase,
    isInLastPhase,
    gotoPrevPhase,
    gotoNextPhase,
  } = useNavigator(0, lastPhase);

  return (
    <>
      {isInFirstPhase && (
        <span className="absolute top-[50%] -left-10 translate-y-[-50%]">
          <BackToNotSelectedButton
            classes="w-7 h-7 inline-block "
            backToNotSelected={backToNotSelected}
          />
        </span>
      )}
      {!isInFirstPhase && (
        <span className="absolute top-[50%] -left-10 translate-y-[-50%]">
          <GotoPrevPhaseButton
            classes="w-7 h-7 inline-block "
            gotoPrevPhase={gotoPrevPhase}
          />
        </span>
      )}
      {!isInLastPhase && (
        <span className="absolute top-[50%] -right-10 translate-y-[-50%]">
          <GotoNextPhaseButton
            classes="w-7 h-7 inline-block "
            gotoNextPhase={gotoNextPhase}
          />
        </span>
      )}
      {motivationTextIds.map((e, i) => {
        return (
          currentPhase === i && (
            <MotivationText key={e} boxData={boxData} motivationTextId={e} />
          )
        );
      })}
      {isInLastPhase && <MotivationTextCreator boxData={boxData} />}
    </>
  );
};

export default MotivationTexts;
