import { ChangeEventHandler, useCallback, useState } from "react";

import { BoxDataType } from "../types";
import { creationActionConstants } from "@/components/ui/creation-action/constants";
import { guideConstants } from "@/components/ui/user-feedback/guide/constants";
import {
  below15Letters,
  isValidUrl,
  linkIsNotPasted,
  required,
  validate,
} from "@/shared/utils/validation";

import useMutationCreateMotivationLink from "./hooks/http/useMutationCreateMotivationLink";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";
import useBoxGuide from "@/components/ui/user-feedback/guide/hooks/useBoxGuide";
import useBoxValidationContext from "@/contexts/feedback/validation/box-validation/hooks/useBoxValidationContext";
import useInputFocus from "@/shared/hooks/useInputFocus";

import FinishCreationButton from "@/components/ui/creator/FinishCreationButton";
import PasteMotivationLinkPart from "./PasteMotivationLinkPart";
import CreationActionButton from "@/components/ui/creation-action/CreationActionButton";

// motivationLink 생성이 진행 중인 컴포넌트.
const MotivationLinkCreationPhase = ({
  boxData,
  finishCreation,
}: {
  boxData: BoxDataType;
  finishCreation: () => void;
}) => {
  // 유저가 화면 상에서 이 컴포넌트를 보게 되었을 때, 해당하는 가이드를 동반하여 표시하기 위해 호출.
  useBoxGuide(guideConstants.guideIds["guideId9"], boxData.boxId);

  // motivationLink 생성을 위한 모든 유저 입력들을 관리 하는 상태.
  const [userAnswers, setUserAnswers] = useState({
    title: "",
    link: "",
  });
  // motivationLink 생성을 위해 복사된 링크가 유효한 링크인지를 관리 하는 상태.
  const [linkIsValid, setLinkIsValid] = useState(false);

  // motivationLink 생성을 위한 유저 입력을 받는 요소에 대한 참조를 저장.
  const { inputRef } = useInputFocus();

  // motivationLink 생성을 위한 비동기 요청을 담고 있는 커스텀 훅.
  const { mutateCreateMotivationLink } = useMutationCreateMotivationLink(
    boxData.boxId,
    boxData.boxType
  );

  // box의 로딩 상태에 따른 유저 피드백을 관리하는 커스텀 훅.
  // 여기서는 box가 로딩 상태로 전환되었을 때, 유저 피드백을 화면 상에 표시하기 위해 호출하는 함수를 반환.
  const { activate } = useBoxLoadingContext();

  // 유저 입력이 유효하지 않을 경우에 대한 유저 피드백.
  const { addInvalidBox } = useBoxValidationContext();

  // motivationLink 생성을 위한 유지 입력들 중, link를 업데이트 하는 함수.
  const updateLink = useCallback(
    (pastedLink: string) =>
      setUserAnswers((prev) => {
        return { ...prev, link: pastedLink };
      }),
    []
  );

  // motivationLink 생성을 위한 유지 입력들 중, title을 업데이트 하는 함수.
  const updateTitle: ChangeEventHandler<HTMLInputElement> = (event) =>
    setUserAnswers((prev) => {
      return { ...prev, title: event.target.value };
    });

  // motivationLink 생성을 위해 복사된 링크가 유효한 링크인지를 관리 하는 상태를 업데이트 하는 함수
  const updateLinkIsValid = (isValid: boolean) => setLinkIsValid(isValid);

  // motivationLink 생성을 최종적으로 제출하는 함수.
  const submitMotivationLinkCreation = () => {
    // motivationLink 생성을 위한 유효성 검사 진행.

    // motivationLink 생성을 위한 유저 입력들 중, title에 대한 유효성 검사 진행.
    let validationResult = validate([
      required(userAnswers.title),
      below15Letters(userAnswers.title),
    ]);
    if (!validationResult.isValid)
      return addInvalidBox(boxData.boxId, validationResult.messages);

    // motivationLink 생성을 위한 유저 입력들 중, link에 대한 유효성 검사 진행.
    validationResult = validate([
      linkIsNotPasted(userAnswers.link),
      isValidUrl(userAnswers.link),
    ]);
    if (!validationResult.isValid) {
      updateLinkIsValid(false);
      return addInvalidBox(boxData.boxId, validationResult.messages);
    }

    // motivationLink 생성을 위한 비동기 요청이 호출 될 때, 로딩 상태에 대한 유저 피드백.
    activate(boxData.boxId);

    // motivationLink 생성을 위한 비동기 요청 호출.
    mutateCreateMotivationLink({
      title: userAnswers.title,
      link: userAnswers.link,
    });

    // motivationLink 생성 종료.
    finishCreation();
  };

  return (
    <>
      <div className="w-full h-full flex justify-center">
        <div className="w-9/10 h-[55%] mt-10  border border-gray-300 flex flex-col justify-center items-center gap-1 relative">
          <FinishCreationButton
            finishCreation={finishCreation}
            classes="w-4 h-4 inline-block absolute top-2 right-2"
            hover=""
          />
          <div className="absolute top-3 left-[50%] translate-x-[-50%] h-4 flex items-center">
            <input
              type="text"
              placeholder="생성할 링크의 이름을 입력해주세요..."
              value={userAnswers.title}
              onChange={updateTitle}
              className="text-xs outline-none caret-gray-400 text-center w-56"
              ref={inputRef}
            />
          </div>
          <div className="mt-5 flex flex-col justify-center items-center gap-[2px]">
            <PasteMotivationLinkPart
              updateLink={updateLink}
              linkIsValid={linkIsValid}
              updateLinkIsValid={updateLinkIsValid}
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-1 left-0 w-full flex justify-center items-center">
        <CreationActionButton
          isInLastPhase={true}
          type={creationActionConstants.creationActionType.submit}
          actionHandler={submitMotivationLinkCreation}
          classes="w-5 h-5 inline-block"
          hover=""
        />
      </div>
    </>
  );
};

export default MotivationLinkCreationPhase;
