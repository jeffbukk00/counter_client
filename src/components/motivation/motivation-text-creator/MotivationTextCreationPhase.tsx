import { ChangeEventHandler, useState } from "react";

import FinishCreationButton from "@/components/ui/creator/FinishCreationButton";
import { BoxDataType } from "../types";
import { required, validate } from "@/shared/utils/validation";
import { creationActionConstants } from "@/components/ui/creation-action/constants";

import useMutationCreateMotivationText from "./hooks/http/useMutationCreateMotivationText";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";
import useBoxValidationContext from "@/contexts/feedback/validation/box-validation/hooks/useBoxValidationContext";
import useTextareaFocus from "@/shared/hooks/useTextAreaFocus";

import CreationActionButton from "@/components/ui/creation-action/CreationActionButton";

// motivationText 생성이 진행 중인 컴포넌트.
const MotivationTextCreationPhase = ({
  boxData,
  finishCreation,
}: {
  boxData: BoxDataType;
  finishCreation: () => void;
}) => {
  // motivationText 생성을 위한 모든 유저 입력들을 관리 하는 상태.
  const [userAnswers, setUserAnswers] = useState({ text: "" });

  // motivationText 생성을 위한 유저 입력을 받는 요소에 대한 참조를 저장.
  const { textareaRef } = useTextareaFocus();

  // motivationText 생성을 위한 비동기 요청을 담고 있는 커스텀 훅.
  const { mutateCreateMotivationText } = useMutationCreateMotivationText(
    boxData.boxId,
    boxData.boxType
  );

  // box의 로딩 상태에 따른 유저 피드백을 관리하는 커스텀 훅.
  // 여기서는 box가 로딩 상태로 전환되었을 때, 유저 피드백을 화면 상에 표시하기 위해 호출하는 함수를 반환.
  const { activate } = useBoxLoadingContext();

  // 유저 입력이 유효하지 않을 경우에 대한 유저 피드백.
  const { addInvalidBox } = useBoxValidationContext();

  // motivationText 생성을 위한 유지 입력들 중, text를 업데이트 하는 함수.
  const updateText: ChangeEventHandler<HTMLTextAreaElement> = (event) =>
    setUserAnswers((prev) => {
      return { ...prev, text: event.target.value };
    });

  // motivationText 생성을 최종적으로 제출하는 함수.
  const submitMotivationTextCreation = () => {
    // motivationText 생성을 위한 유효성 검사 진행.

    // motivationText 생성을 위한 유저 입력들 중, title에 대한 유효성 검사 진행.
    const validationResult = validate([required(userAnswers.text)]);
    if (!validationResult.isValid)
      return addInvalidBox(boxData.boxId, validationResult.messages);

    // motivationText 생성을 위한 비동기 요청이 호출 될 때, 로딩 상태에 대한 유저 피드백.
    activate(boxData.boxId);

    // motivationText 생성을 위한 비동기 요청 호출.
    mutateCreateMotivationText(userAnswers.text);

    // motivationText 생성 종료.
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
            ref={textareaRef}
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
