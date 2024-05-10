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
        <BackToNotSelectedButton backToNotSelected={backToNotSelected} />
      )}
      {!isInFirstPhase && <GotoPrevPhaseButton gotoPrevPhase={gotoPrevPhase} />}
      {!isInLastPhase && <GotoNextPhaseButton gotoNextPhase={gotoNextPhase} />}
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
