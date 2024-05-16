import { ChangeEventHandler, useState } from "react";

import useMutationEditMotivationText from "./hooks/http/useMutationEditMotivationText";
import CreationActionButton from "@/components/ui/creation-action/CreationActionButton";
import { creationActionConstants } from "@/components/ui/creation-action/constants";
import { MotivationTextEditPhasePropsType } from "./types";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";

import useBoxValidationContext from "@/contexts/feedback/validation/box-validation/hooks/useBoxValidationContext";
import { required, validate } from "@/shared/utils/validation";

const MotivationTextEditPhase = ({
  boxId,
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

  const { mutateEditMotivationText } = useMutationEditMotivationText(
    motivationTextId,
    boxId
  );
  const { activate } = useBoxLoadingContext();
  const { addInvalidBox } = useBoxValidationContext();

  const submitMotivationTextEdit = () => {
    // 유효성 검사
    const validationResult = validate([required(userAnswers.text)]);
    if (!validationResult.isValid)
      return addInvalidBox(boxId, validationResult.messages);

    activate(boxId);
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
