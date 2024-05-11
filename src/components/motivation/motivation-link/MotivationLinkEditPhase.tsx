import { ChangeEventHandler, useState } from "react";

import { MotivationLinkEditPhasePropsType } from "./types";
import { creationActionConstants } from "@/components/ui/creation-action/constants";

import useMutationEditMotivationLink from "./hooks/http/useMutationEditMotivationLink";

import LinkVector from "@/shared/assets/link/LinkVector";
import CreationActionButton from "@/components/ui/creation-action/CreationActionButton";

const MotivationLinkEditPhase = ({
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

  const { mutateEditMotivationLink } =
    useMutationEditMotivationLink(motivationLinkId);

  const submitMotivationLinkEdit = () => {
    // 유효성 검사
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
