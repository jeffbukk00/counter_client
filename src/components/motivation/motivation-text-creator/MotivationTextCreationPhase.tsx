import { ChangeEventHandler, useState } from "react";

import FinishCreationButton from "@/components/ui/creator/FinishCreationButton";
import { BoxDataType } from "../types";

import useMutationCreateMotivationText from "./hooks/http/useMutationCreateMotivationText";
import CreationActionButton from "@/components/ui/creation-action/CreationActionButton";
import { creationActionConstants } from "@/components/ui/creation-action/constants";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";
import useBoxValidationContext from "@/contexts/feedback/validation/box-validation/hooks/useBoxValidationContext";
import { required, validate } from "@/shared/utils/validation";

const MotivationTextCreationPhase = ({
  boxData,
  finishCreation,
}: {
  boxData: BoxDataType;
  finishCreation: () => void;
}) => {
  const [userAnswers, setUserAnswers] = useState({ text: "" });
  const { mutateCreateMotivationText } = useMutationCreateMotivationText(
    boxData.boxId,
    boxData.boxType
  );
  const { activate } = useBoxLoadingContext();
  const { addInvalidBox } = useBoxValidationContext();

  const updateText: ChangeEventHandler<HTMLTextAreaElement> = (event) =>
    setUserAnswers((prev) => {
      return { ...prev, text: event.target.value };
    });

  const submitMotivationTextCreation = () => {
    // 유효성 검사
    const validationResult = validate([required(userAnswers.text)]);
    if (!validationResult.isValid)
      return addInvalidBox(boxData.boxId, validationResult.messages);

    activate(boxData.boxId);
    mutateCreateMotivationText(userAnswers.text);
    finishCreation();
  };

  return (
    <>
      <FinishCreationButton finishCreation={finishCreation} />
      <textarea
        placeholder="여기에 입력해주세요..."
        value={userAnswers.text}
        onChange={updateText}
      ></textarea>
      <CreationActionButton
        isInLastPhase={true}
        type={creationActionConstants.creationActionType.submit}
        actionHandler={submitMotivationTextCreation}
      />
    </>
  );
};

export default MotivationTextCreationPhase;
