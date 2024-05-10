import { ChangeEventHandler, useState } from "react";

import useMutationEditMotivationText from "./hooks/http/useMutationEditMotivationText";
import CreationActionButton from "@/components/ui/creation-action/CreationActionButton";
import { creationActionConstants } from "@/components/ui/creation-action/constants";
import { MotivationTextEditPhasePropsType } from "./types";

const MotivationTextEditPhase = ({
  motivationTextId,
  motivationTextData,
  closeEditPhase,
}: MotivationTextEditPhasePropsType) => {
  const [userAnswers, setUserAnswers] = useState({
    text: motivationTextData.text,
  });

  const updateText: ChangeEventHandler<HTMLTextAreaElement> = (event) =>
    setUserAnswers((prev) => {
      return { ...prev, text: event.target.value };
    });

  const { mutateEditMotivationText } =
    useMutationEditMotivationText(motivationTextId);

  const submitMotivationTextEdit = () => {
    // 유효성 검사
    mutateEditMotivationText(userAnswers.text);
    closeEditPhase();
  };
  return (
    <>
      <textarea value={userAnswers.text} onChange={updateText}></textarea>
      <CreationActionButton
        isInLastPhase={true}
        type={creationActionConstants.creationActionType.submit}
        actionHandler={submitMotivationTextEdit}
      />
    </>
  );
};

export default MotivationTextEditPhase;
