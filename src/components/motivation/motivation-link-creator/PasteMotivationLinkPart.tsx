import { readClipboard } from "@/shared/utils/clipboard/readClipboard";

import FeedbackToPaste from "@/components/ui/clipboard-feedback/FeedbackToPaste";
import useFeedbackToPaste from "@/components/ui/clipboard-feedback/hooks/useFeedbackToPaste";
import PasteVector from "@/shared/assets/link/PasteVector";
import { useEffect } from "react";
import HoverWrapper from "@/components/styles/HoverWrapper";

const PasteMotivationLinkPhase = ({
  linkIsValid,
  updateLinkIsValid,
  updateLink,
}: {
  linkIsValid: boolean;
  updateLinkIsValid: (isValid: boolean) => void;
  updateLink: (pastedLink: string) => void;
}) => {
  const { isPasted, updateIsPasted } = useFeedbackToPaste();

  const paste = async () => {
    const pasted = await readClipboard();
    updateIsPasted(true);
    updateLinkIsValid(true);
    updateLink(pasted);
  };

  useEffect(() => {
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
