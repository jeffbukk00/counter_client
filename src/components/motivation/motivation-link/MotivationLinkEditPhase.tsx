import { ChangeEventHandler, useState } from "react";

import { MotivationLinkEditPhasePropsType } from "./types";
import { creationActionConstants } from "@/components/ui/creation-action/constants";
import { below15Letters, required, validate } from "@/shared/utils/validation";

import useMutationEditMotivationLink from "./hooks/http/useMutationEditMotivationLink";
import useInputFocus from "@/shared/hooks/useInputFocus";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";
import useBoxValidationContext from "@/contexts/feedback/validation/box-validation/hooks/useBoxValidationContext";

import CreationActionButton from "@/components/ui/creation-action/CreationActionButton";

// motivationLink를 수정하는 페이즈를 나타내는 컴포넌트.
const MotivationLinkEditPhase = ({
  boxId,
  motivationLinkId,
  motivationLinkData,
  closeEditPhase,
}: MotivationLinkEditPhasePropsType) => {
  // motivationLink를 수정하기 위한 모든 유저 입력들을 관리하는 상태.
  const [userAnswers, setUserAnswers] = useState({
    title: motivationLinkData.title,
    link: motivationLinkData.link,
  });

  // motivationLink를 수정하기 위해 유저 입력을 받는 요소에 대한 참조를 저장.
  const { inputRef } = useInputFocus();

  // motivationLink를 수정하기 위한 비동기 요청을 담고 있는 커스텀 훅.
  const { mutateEditMotivationLink } = useMutationEditMotivationLink(
    motivationLinkId,
    boxId
  );

  // box의 로딩 상태에 따른 유저 피드백을 관리하는 커스텀 훅.
  // 여기서는 box가 로딩 상태로 전환되었을 때, 유저 피드백을 화면 상에 표시하기 위해 호출하는 함수를 반환.
  const { activate } = useBoxLoadingContext();

  // 유저 입력이 유효하지 않을 경우에 대한 유저 피드백.
  const { addInvalidBox } = useBoxValidationContext();

  // motivationLink 수정에 대한 유저 입력들 중, title을 업데이트 하기 위한 함수.
  const updateTitle: ChangeEventHandler<HTMLInputElement> = (event) =>
    setUserAnswers((prev) => {
      return { ...prev, title: event.target.value };
    });

  // motivationLink 수정을 최종적으로 제출하는 함수.
  const submitMotivationLinkEdit = () => {
    // motivationLink 수정에 대한 유효성 검사 진행.

    // motivationLink 수정에 대한 유저 입력들 중, title에 대한 유효성 검사.
    const validationResult = validate([
      required(userAnswers.title),
      below15Letters(userAnswers.title),
    ]);
    if (!validationResult.isValid)
      return addInvalidBox(boxId, validationResult.messages);

    // motivationLink 수정을 위한 비동기 요청이 호출 될 때, 로딩 상태에 대한 유저 피드백.
    activate(boxId);

    // motivationLink 수정을 위한 비동기 요청이 호출.
    mutateEditMotivationLink({
      title: userAnswers.title,
      link: userAnswers.link,
    });

    // motivationLink 수정 종료.
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
