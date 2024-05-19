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
      <div className="w-full h-full flex justify-center">
        <div className="w-9/10 h-[55%] mt-10 relative">
          <textarea
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
          actionHandler={submitMotivationTextEdit}
          classes="w-5 h-5 inline-block"
          hover=""
        />
      </div>
    </>
  );
};

export default MotivationTextEditPhase;
