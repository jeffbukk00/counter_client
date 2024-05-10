import { ChangeEventHandler, useState } from "react";

import FinishCreationButton from "@/components/ui/creator/FinishCreationButton";
import { BoxDataType } from "../types";

import useMutationCreateMotivationText from "./hooks/http/useMutationCreateMotivationText";
import CreationActionButton from "@/components/ui/creation-action/CreationActionButton";
import { creationActionConstants } from "@/components/ui/creation-action/constants";

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

  const updateText: ChangeEventHandler<HTMLTextAreaElement> = (event) =>
    setUserAnswers((prev) => {
      return { ...prev, text: event.target.value };
    });

  const submitMotivationTextCreation = () => {
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
