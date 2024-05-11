import { ChangeEventHandler, useState } from "react";
import FinishCreationButton from "@/components/ui/creator/FinishCreationButton";
import { BoxDataType } from "../types";

import useMutationCreateMotivationLink from "./hooks/http/useMutationCreateMotivationLink";

import PasteMotivationLinkPart from "./PasteMotivationLinkPart";
import CreationActionButton from "@/components/ui/creation-action/CreationActionButton";
import { creationActionConstants } from "@/components/ui/creation-action/constants";

const MotivationLinkCreationPhase = ({
  boxData,
  finishCreation,
}: {
  boxData: BoxDataType;
  finishCreation: () => void;
}) => {
  const [userAnswers, setUserAnswers] = useState({
    title: "",
    link: "",
  });

  const { mutateCreateMotivationLink } = useMutationCreateMotivationLink(
    boxData.boxId,
    boxData.boxType
  );

  const updateLink = (pastedLink: string) =>
    setUserAnswers((prev) => {
      return { ...prev, link: pastedLink };
    });

  const updateTitle: ChangeEventHandler<HTMLInputElement> = (event) =>
    setUserAnswers((prev) => {
      return { ...prev, title: event.target.value };
    });

  const submitMotivationLinkCreation = () => {
    mutateCreateMotivationLink({
      title: userAnswers.title,
      link: userAnswers.link,
    });
    finishCreation();
  };

  return (
    <>
      <FinishCreationButton finishCreation={finishCreation} />
      <div>
        <input
          type="text"
          placeholder="생성할 링크의 이름을 입력해주세요..."
          value={userAnswers.title}
          onChange={updateTitle}
          className="w-full"
        />
      </div>
      <PasteMotivationLinkPart updateLink={updateLink} />
      <CreationActionButton
        isInLastPhase={true}
        type={creationActionConstants.creationActionType.submit}
        actionHandler={submitMotivationLinkCreation}
      />
    </>
  );
};

export default MotivationLinkCreationPhase;
