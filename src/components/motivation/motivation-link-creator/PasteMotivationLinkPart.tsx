import { useEffect } from "react";

import { readClipboard } from "@/shared/utils/clipboard/readClipboard";

import useFeedbackToPaste from "@/components/ui/clipboard-feedback/hooks/useFeedbackToPaste";

import FeedbackToPaste from "@/components/ui/clipboard-feedback/FeedbackToPaste";
import PasteVector from "@/shared/assets/link/PasteVector";
import HoverWrapper from "@/components/styles/HoverWrapper";

// 유저가 복사한 link를 붙여 넣는 컴포넌트.
const PasteMotivationLinkPhase = ({
  linkIsValid,
  updateLinkIsValid,
  updateLink,
}: {
  linkIsValid: boolean;
  updateLinkIsValid: (isValid: boolean) => void;
  updateLink: (pastedLink: string) => void;
}) => {
  // 유저가 복사한 link가 붙여 넣어졌는지 여부를 관리하는 상태.
  const { isPasted, updateIsPasted } = useFeedbackToPaste();

  // 유저가 복사한 link를 유저의 클립보드로부터 가져옴.
  // 성공적으로 가져왔을 때, 관련 된 상태들 업데이트.
  const paste = async () => {
    const pasted = await readClipboard();
    updateIsPasted(true);
    updateLinkIsValid(true);
    updateLink(pasted);
  };

  useEffect(() => {
    // 붙여 넣은 link에 대한 유효성 검사가 실패 했을 때, 초기화.
    if (!linkIsValid) {
      updateIsPasted(false);
      updateLink("");
    }
  }, [linkIsValid, updateIsPasted, updateLink]);

  return (
    <>
      <HoverWrapper classes="p-1">
        <button onClick={paste}>
          <PasteVector classes="w-6 h-6 inline-block" />
        </button>
      </HoverWrapper>

      <FeedbackToPaste
        isPasted={isPasted || linkIsValid}
        fontSize="text-[0.5rem]"
      />
    </>
  );
};

export default PasteMotivationLinkPhase;
