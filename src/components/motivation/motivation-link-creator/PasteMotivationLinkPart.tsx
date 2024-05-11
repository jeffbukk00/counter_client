import { readClipboard } from "@/shared/utils/clipboard/readClipboard";

import FeedbackToPaste from "@/components/ui/clipboard-feedback/FeedbackToPaste";
import useFeedbackToPaste from "@/components/ui/clipboard-feedback/hooks/useFeedbackToPaste";
import PasteVector from "@/shared/assets/link/PasteVector";

const PasteMotivationLinkPhase = ({
  updateLink,
}: {
  updateLink: (pastedLink: string) => void;
}) => {
  const { isPasted, updateIsPasted } = useFeedbackToPaste();

  const paste = async () => {
    const pasted = await readClipboard();
    // 붙여넣은 링크에 대한 유효성 검사
    // 유효하지 않은 링크라면, return

    updateLink(pasted);
    updateIsPasted(true);
  };

  return (
    <>
      <button onClick={paste}>
        <PasteVector classes="w-6 h-6 inline-block" />
      </button>
      <FeedbackToPaste isPasted={isPasted} />
    </>
  );
};

export default PasteMotivationLinkPhase;
