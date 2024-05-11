import useFeedbackToCopy from "@/components/ui/clipboard-feedback/hooks/useFeedbackToCopy";

import { writeClipboard } from "@/shared/utils/clipboard/writeClipboard";

import FeedbackToCopy from "@/components/ui/clipboard-feedback/FeedbackToCopy";
import LinkVector from "@/shared/assets/link/LinkVector";

const CopyMotivationLinkPart = ({ link }: { link: string }) => {
  const { isCopied, updateIsCopied } = useFeedbackToCopy();

  const copy = async () => {
    await writeClipboard(link);
    updateIsCopied(true);
  };
  return (
    <>
      <button onClick={copy}>
        <LinkVector classes="w-6 h-6 inline-block" />
      </button>
      <FeedbackToCopy isCopied={isCopied} />
    </>
  );
};

export default CopyMotivationLinkPart;
