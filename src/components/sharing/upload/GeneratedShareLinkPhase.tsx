import { GeneratedShareLinkPhasePropsType } from "./types";
import { creationActionConstants } from "@/components/ui/creation-action/constants";

import useFeedbackToCopy from "@/components/ui/clipboard-feedback/hooks/useFeedbackToCopy";

import { writeClipboard } from "@/shared/utils/clipboard/writeClipboard";

import FeedbackToCopy from "@/components/ui/clipboard-feedback/FeedbackToCopy";
import LinkVector from "@/shared/assets/link/LinkVector";
import CreationActionButton from "@/components/ui/creation-action/CreationActionButton";
import HoverWrapper from "@/components/styles/HoverWrapper";

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
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div>
          <p>생성된 공유 링크</p>
        </div>
        <div className="mt-3">
          <HoverWrapper classes="p-2">
            <button onClick={copy}>
              <LinkVector classes="w-8 h-8 inline-block" />
            </button>
          </HoverWrapper>
        </div>
        <div>
          <FeedbackToCopy isCopied={isCopied} fontSize="text-sm" />
        </div>
      </div>
      <div className="absolute bottom-1 left-0 w-full flex justify-center items-center">
        <CreationActionButton
          isInLastPhase={true}
          type={creationActionConstants.creationActionType.submit}
          classes="w-7 h-7 inline-block"
          hover="p-1"
          actionHandler={() => closeModal()}
        />
      </div>
    </>
  );
};

export default GeneratedShareLinkPhase;
