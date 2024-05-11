import { useState } from "react";

import { PasteShareLinkPhasePropsType } from "./type";

import useFeedbackToPaste from "@/components/ui/clipboard-feedback/hooks/useFeedbackToPaste";
import useMutationValidateShareLink from "./hooks/useMutationValidateShareLink";
import { creationActionConstants } from "@/components/ui/creation-action/constants";

import { readClipboard } from "@/shared/utils/clipboard/readClipboard";

import PasteVector from "@/shared/assets/link/PasteVector";
import FeedbackToPaste from "@/components/ui/clipboard-feedback/FeedbackToPaste";
import CreationActionButton from "@/components/ui/creation-action/CreationActionButton";

const PasteShareLinkPhase = ({
  gotoNextPhase,
  updateDownloadLink,
  updateUsername,
}: PasteShareLinkPhasePropsType) => {
  const [pastedLink, setPastedLink] = useState("");

  const { isPasted, updateIsPasted } = useFeedbackToPaste();

  const paste = async () => {
    const pasted = await readClipboard();
    // 유효성 검사
    updateIsPasted(true);
    setPastedLink(pasted);
  };

  const onValidationSuccessHandler = (username: string) => {
    updateDownloadLink(pastedLink);
    updateUsername(username);
    gotoNextPhase();
  };

  const { mutateValidateShareLink, isPending } = useMutationValidateShareLink(
    onValidationSuccessHandler
  );

  if (isPending)
    return <p>다운로드 할 공유 링크에 대한 유효성 검사 중입니다...</p>;

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
        actionHandler={() => mutateValidateShareLink(pastedLink)}
      />
    </>
  );
};

export default PasteShareLinkPhase;
