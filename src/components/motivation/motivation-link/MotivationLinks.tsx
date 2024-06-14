import { MotivationLinksPropsType } from "./types";

import useNavigator from "@/components/ui/navigator/hooks/useNavigator";

import BackToNotSelectedButton from "../BackToNotSelectedButton";
import GotoPrevPhaseButton from "@/components/ui/navigator/GotoPrevPhaseButton";
import GotoNextPhaseButton from "@/components/ui/navigator/GotoNextPhaseButton";
import MotivationLink from "./MotivationLink";
import MotivationLinkCreator from "../motivation-link-creator/MotivationLinkCreator";

// 서버로부터 불러온 모든 motivationLink id들을 하위 컴포넌트들로 전달하는 컴포넌트.
const MotivationLinks = ({
  boxData,
  backToNotSelected,
  motivationLinkIds,
}: MotivationLinksPropsType) => {
  const lastPhase = motivationLinkIds.length;

  // 네비게이터 역할을 하는 상태를 관리하는 커스텀 훅.
  // 네비게이터란 연결 된 컴포넌트 간 번호를 부여하여, 버튼 클릭에 따라 앞뒤 컴포넌트로 이동할 수 있게 만드는 기능.
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
