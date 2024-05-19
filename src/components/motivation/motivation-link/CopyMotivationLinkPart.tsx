import useFeedbackToCopy from "@/components/ui/clipboard-feedback/hooks/useFeedbackToCopy";

import { writeClipboard } from "@/shared/utils/clipboard/writeClipboard";

import FeedbackToCopy from "@/components/ui/clipboard-feedback/FeedbackToCopy";
import LinkVector from "@/shared/assets/link/LinkVector";
import HoverWrapper from "@/components/styles/HoverWrapper";

const CopyMotivationLinkPart = ({
  link,
  fontSize,
}: {
  link: string;
  fontSize: string;
}) => {
  const { isCopied, updateIsCopied } = useFeedbackToCopy();

  const copy = async () => {
    await writeClipboard(link);
    updateIsCopied(true);
  };
  return (
    <>
      <HoverWrapper classes="p-1">
        <button onClick={copy}>
          <LinkVector classes="w-6 h-6 inline-block" />
        </button>
      </HoverWrapper>
      <FeedbackToCopy fontSize={fontSize} isCopied={isCopied} />
    </>
  );
};

export default CopyMotivationLinkPart;
