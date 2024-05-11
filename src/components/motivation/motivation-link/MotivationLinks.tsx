import { MotivationLinksPropsType } from "./types";

import useNavigator from "@/components/ui/navigator/hooks/useNavigator";

import BackToNotSelectedButton from "../BackToNotSelectedButton";
import GotoPrevPhaseButton from "@/components/ui/navigator/GotoPrevPhaseButton";
import GotoNextPhaseButton from "@/components/ui/navigator/GotoNextPhaseButton";
import MotivationLink from "./MotivationLink";
import MotivationLinkCreator from "../motivation-link-creator/MotivationLinkCreator";

const MotivationLinks = ({
  boxData,
  backToNotSelected,
  motivationLinkIds,
}: MotivationLinksPropsType) => {
  const lastPhase = motivationLinkIds.length;

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
      {motivationLinkIds.map((e, i) => {
        return (
          currentPhase === i && (
            <MotivationLink key={e} boxData={boxData} motivationLinkId={e} />
          )
        );
      })}
      {isInLastPhase && <MotivationLinkCreator boxData={boxData} />}
    </>
  );
};

export default MotivationLinks;
