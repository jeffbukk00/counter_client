import { readClipboard } from "@/shared/utils/clipboard/readClipboard";

import FeedbackToPaste from "@/components/ui/clipboard-feedback/FeedbackToPaste";
import useFeedbackToPaste from "@/components/ui/clipboard-feedback/hooks/useFeedbackToPaste";
import PasteVector from "@/shared/assets/link/PasteVector";
import { useEffect } from "react";

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
      <button onClick={paste}>
        <PasteVector classes="w-6 h-6 inline-block" />
      </button>
      <FeedbackToPaste isPasted={isPasted || linkIsValid} />
    </>
  );
};

export default PasteMotivationLinkPhase;
