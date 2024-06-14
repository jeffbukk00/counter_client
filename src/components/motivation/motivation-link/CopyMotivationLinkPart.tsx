import useFeedbackToCopy from "@/components/ui/clipboard-feedback/hooks/useFeedbackToCopy";

import { writeClipboard } from "@/shared/utils/clipboard/writeClipboard";

import FeedbackToCopy from "@/components/ui/clipboard-feedback/FeedbackToCopy";
import LinkVector from "@/shared/assets/link/LinkVector";
import HoverWrapper from "@/components/styles/HoverWrapper";

// 저장된 motivationLink를 자동으로 클립보드에 저장하는 기능을 하는 컴포넌트.
const CopyMotivationLinkPart = ({
  link,
  fontSize,
}: {
  link: string;
  fontSize: string;
}) => {
  // motivationLink가 유저의 클립보드에 저장되었는지 여부를 관리하는 상태.
  const { isCopied, updateIsCopied } = useFeedbackToCopy();

  // motivationLink를 유저의 클립보드에 저장하는 함수.
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
