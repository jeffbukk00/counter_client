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
