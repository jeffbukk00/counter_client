import { ChangeEventHandler, useState } from "react";

import { MotivationLinkEditPhasePropsType } from "./types";
import { creationActionConstants } from "@/components/ui/creation-action/constants";

import useMutationEditMotivationLink from "./hooks/http/useMutationEditMotivationLink";

import CreationActionButton from "@/components/ui/creation-action/CreationActionButton";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";
import useBoxValidationContext from "@/contexts/feedback/validation/box-validation/hooks/useBoxValidationContext";
import { below15Letters, required, validate } from "@/shared/utils/validation";
import useInputFocus from "@/shared/hooks/useInputFocus";

const MotivationLinkEditPhase = ({
  boxId,
  motivationLinkId,
  motivationLinkData,
  closeEditPhase,
}: MotivationLinkEditPhasePropsType) => {
  const [userAnswers, setUserAnswers] = useState({
    title: motivationLinkData.title,
    link: motivationLinkData.link,
  });

  const { inputRef } = useInputFocus();

  const updateTitle: ChangeEventHandler<HTMLInputElement> = (event) =>
    setUserAnswers((prev) => {
      return { ...prev, title: event.target.value };
    });

  const { mutateEditMotivationLink } = useMutationEditMotivationLink(
    motivationLinkId,
    boxId
  );
  const { activate } = useBoxLoadingContext();
  const { addInvalidBox } = useBoxValidationContext();

  const submitMotivationLinkEdit = () => {
    // 유효성 검사
    const validationResult = validate([
      required(userAnswers.title),
      below15Letters(userAnswers.title),
    ]);
    if (!validationResult.isValid)
      return addInvalidBox(boxId, validationResult.messages);

    activate(boxId);
    mutateEditMotivationLink({
      title: userAnswers.title,
      link: userAnswers.link,
    });
    closeEditPhase();
  };
  return (
    <>
      <div className="w-full h-full flex justify-center">
        <div className="w-9/10 h-[55%] mt-10  border border-gray-300 flex flex-col justify-center items-center gap-1 relative">
          <div className="">
            <input
              type="text"
              placeholder="여기에 입력해주세요..."
              value={userAnswers.title}
              onChange={updateTitle}
              className="text-xs outline-none caret-gray-400 text-center w-56"
              ref={inputRef}
            />
            <div className="flex justify-center items-center">
              <p className="text-xs font-medium text-gray-300">
                링크의 이름을 수정합니다
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-1 left-0 w-full flex justify-center items-center">
        <CreationActionButton
          isInLastPhase={true}
          type={creationActionConstants.creationActionType.submit}
          actionHandler={submitMotivationLinkEdit}
          classes="w-5 h-5 inline-block"
          hover=""
        />
      </div>
    </>
  );
};

export default MotivationLinkEditPhase;
