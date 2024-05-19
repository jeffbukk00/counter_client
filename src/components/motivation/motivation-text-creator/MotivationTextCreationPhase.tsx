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
      <div className="w-full h-full flex justify-center">
        <div className="w-9/10 h-[55%] mt-10 relative">
          <span className="absolute top-1 right-1">
            <FinishCreationButton
              finishCreation={finishCreation}
              classes="w-4 h-4 inline-block"
              hover=""
            />
          </span>
          <textarea
            placeholder="여기에 입력해주세요..."
            value={userAnswers.text}
            onChange={updateText}
            className="w-full h-full pt-3 pb-2 px-2 border border-gray-300 outline-none text-xs resize-none caret-gray-400"
          ></textarea>
        </div>
      </div>
      <div className="absolute bottom-1 left-0 w-full flex justify-center items-center">
        <CreationActionButton
          isInLastPhase={true}
          type={creationActionConstants.creationActionType.submit}
          actionHandler={submitMotivationTextCreation}
          classes="w-5 h-5 inline-block"
          hover=""
        />
      </div>
    </>
  );
};

export default MotivationTextCreationPhase;
