import { useState } from "react";

import { PasteShareLinkPhasePropsType } from "./type";

import useFeedbackToPaste from "@/components/ui/clipboard-feedback/hooks/useFeedbackToPaste";
import useMutationValidateShareLink from "./hooks/useMutationValidateShareLink";
import { creationActionConstants } from "@/components/ui/creation-action/constants";

import { readClipboard } from "@/shared/utils/clipboard/readClipboard";

import PasteVector from "@/shared/assets/link/PasteVector";
import FeedbackToPaste from "@/components/ui/clipboard-feedback/FeedbackToPaste";
import CreationActionButton from "@/components/ui/creation-action/CreationActionButton";
import useNotBoxLoadingContext from "@/contexts/loading/not-box-loading/hooks/useNotBoxLoadingContext";
import useNotBoxValidationContext from "@/contexts/feedback/validation/not-box-validation/hooks/useNotBoxValidationContext";
import {
  isValidShareLink,
  linkIsNotPasted,
  validate,
} from "@/shared/utils/validation";
import HoverWrapper from "@/components/styles/HoverWrapper";

const PasteShareLinkPhase = ({
  gotoNextPhase,
  updateDownloadLink,
  updateUsername,
}: PasteShareLinkPhasePropsType) => {
  const [pastedLink, setPastedLink] = useState("");

  const { isPasted, updateIsPasted } = useFeedbackToPaste();

  const paste = async () => {
    const pasted = await readClipboard();

    updateIsPasted(true);
    setPastedLink(pasted);
  };

  const { activateModal } = useNotBoxLoadingContext();
  const { updateIsModalInvalid } = useNotBoxValidationContext();

  const onValidationSuccessHandler = (username: string) => {
    updateDownloadLink(pastedLink);
    updateUsername(username);
    gotoNextPhase();
  };

  const onValidationErrorHandler = () => {
    updateIsPasted(false);
    updateIsModalInvalid(true, ["존재하지 않는 공유 링크입니다"]);
  };

  const { mutateValidateShareLink } = useMutationValidateShareLink(
    onValidationSuccessHandler,
    onValidationErrorHandler
  );
  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div>
          <p>공유 링크 붙여넣기</p>
        </div>
        <div className="mt-3">
          <HoverWrapper classes="p-2">
            <button onClick={paste}>
              <PasteVector classes="w-8 h-8 inline-block" />
            </button>
          </HoverWrapper>
        </div>
        <div>
          <FeedbackToPaste isPasted={isPasted} fontSize="text-sm" />
        </div>
      </div>
      <div className="absolute bottom-1 left-0 w-full flex justify-center items-center">
        <CreationActionButton
          isInLastPhase={false}
          type={creationActionConstants.creationActionType.click}
          classes="w-7 h-7 inline-block"
          hover="p-1"
          actionHandler={() => {
            // 유효성 검사
            const validationResult = validate([
              linkIsNotPasted(pastedLink),
              isValidShareLink(pastedLink),
            ]);
            if (!validationResult.isValid) {
              updateIsPasted(false);
              return updateIsModalInvalid(true, validationResult.messages);
            }

            activateModal();
            mutateValidateShareLink(pastedLink);
          }}
        />
      </div>
    </>
  );
};

export default PasteShareLinkPhase;
