import { ChangeEventHandler, useState } from "react";

import { MotivationLinkEditPhasePropsType } from "./types";
import { creationActionConstants } from "@/components/ui/creation-action/constants";

import useMutationEditMotivationLink from "./hooks/http/useMutationEditMotivationLink";

import LinkVector from "@/shared/assets/link/LinkVector";
import CreationActionButton from "@/components/ui/creation-action/CreationActionButton";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";
import useBoxValidationContext from "@/contexts/feedback/validation/box-validation/hooks/useBoxValidationContext";
import { below15Letters, required, validate } from "@/shared/utils/validation";

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
      <input
        type="text"
        placeholder="여기에 입력해주세요..."
        value={userAnswers.title}
        onChange={updateTitle}
      />
      <p>링크의 이름을 수정합니다</p>
      <LinkVector classes="w-6 h-6 inline-block" />
      <CreationActionButton
        isInLastPhase={true}
        type={creationActionConstants.creationActionType.submit}
        actionHandler={submitMotivationLinkEdit}
      />
    </>
  );
};

export default MotivationLinkEditPhase;
