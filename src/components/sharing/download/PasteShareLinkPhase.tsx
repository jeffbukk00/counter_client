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
      <p>공유 링크 붙여넣기</p>
      <button onClick={paste}>
        <PasteVector classes="w-6 h-6 inline-block" />
      </button>
      <FeedbackToPaste isPasted={isPasted} />
      <CreationActionButton
        isInLastPhase={false}
        type={creationActionConstants.creationActionType.click}
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
    </>
  );
};

export default PasteShareLinkPhase;
