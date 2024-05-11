import { GeneratedShareLinkPhasePropsType } from "./types";
import { creationActionConstants } from "@/components/ui/creation-action/constants";

import useFeedbackToCopy from "@/components/ui/clipboard-feedback/hooks/useFeedbackToCopy";

import { writeClipboard } from "@/shared/utils/clipboard/writeClipboard";

import FeedbackToCopy from "@/components/ui/clipboard-feedback/FeedbackToCopy";
import LinkVector from "@/shared/assets/link/LinkVector";
import CreationActionButton from "@/components/ui/creation-action/CreationActionButton";

const GeneratedShareLinkPhase = ({
  createdShareLink,
  closeModal,
}: GeneratedShareLinkPhasePropsType) => {
  const { isCopied, updateIsCopied } = useFeedbackToCopy();

  const copy = async () => {
    await writeClipboard(createdShareLink);
    updateIsCopied(true);
  };
  return (
    <>
      <p>생성된 공유 링크</p>
      <button onClick={copy}>
        <LinkVector classes="w-6 h-6 inline-block" />
      </button>
      <FeedbackToCopy isCopied={isCopied} />
      <CreationActionButton
        isInLastPhase={true}
        type={creationActionConstants.creationActionType.submit}
        actionHandler={() => closeModal()}
      />
    </>
  );
};

export default GeneratedShareLinkPhase;
