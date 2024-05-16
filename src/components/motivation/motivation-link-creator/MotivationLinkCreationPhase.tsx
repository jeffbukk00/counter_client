import { ChangeEventHandler, useCallback, useState } from "react";
import FinishCreationButton from "@/components/ui/creator/FinishCreationButton";
import { BoxDataType } from "../types";

import useMutationCreateMotivationLink from "./hooks/http/useMutationCreateMotivationLink";

import PasteMotivationLinkPart from "./PasteMotivationLinkPart";
import CreationActionButton from "@/components/ui/creation-action/CreationActionButton";
import { creationActionConstants } from "@/components/ui/creation-action/constants";
import useBoxGuide from "@/components/ui/user-feedback/guide/hooks/useBoxGuide";
import { guideConstants } from "@/components/ui/user-feedback/guide/constants";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";
import useBoxValidationContext from "@/contexts/feedback/validation/box-validation/hooks/useBoxValidationContext";
import {
  below15Letters,
  isValidUrl,
  linkIsNotPasted,
  required,
  validate,
} from "@/shared/utils/validation";

const MotivationLinkCreationPhase = ({
  boxData,
  finishCreation,
}: {
  boxData: BoxDataType;
  finishCreation: () => void;
}) => {
  useBoxGuide(guideConstants.guideIds["guideId9"], boxData.boxId);

  const [userAnswers, setUserAnswers] = useState({
    title: "",
    link: "",
  });
  const [linkIsValid, setLinkIsValid] = useState(false);

  const { mutateCreateMotivationLink } = useMutationCreateMotivationLink(
    boxData.boxId,
    boxData.boxType
  );
  const { activate } = useBoxLoadingContext();
  const { addInvalidBox } = useBoxValidationContext();

  const updateLink = useCallback(
    (pastedLink: string) =>
      setUserAnswers((prev) => {
        return { ...prev, link: pastedLink };
      }),
    []
  );

  const updateTitle: ChangeEventHandler<HTMLInputElement> = (event) =>
    setUserAnswers((prev) => {
      return { ...prev, title: event.target.value };
    });

  const updateLinkIsValid = (isValid: boolean) => setLinkIsValid(isValid);

  const submitMotivationLinkCreation = () => {
    // 유효성 검사
    // title
    let validationResult = validate([
      required(userAnswers.title),
      below15Letters(userAnswers.title),
    ]);
    if (!validationResult.isValid)
      return addInvalidBox(boxData.boxId, validationResult.messages);
    // link
    validationResult = validate([
      linkIsNotPasted(userAnswers.link),
      isValidUrl(userAnswers.link),
    ]);
    if (!validationResult.isValid) {
      updateLinkIsValid(false);
      return addInvalidBox(boxData.boxId, validationResult.messages);
    }

    activate(boxData.boxId);
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
      <PasteMotivationLinkPart
        updateLink={updateLink}
        linkIsValid={linkIsValid}
        updateLinkIsValid={updateLinkIsValid}
      />
      <CreationActionButton
        isInLastPhase={true}
        type={creationActionConstants.creationActionType.submit}
        actionHandler={submitMotivationLinkCreation}
      />
    </>
  );
};

export default MotivationLinkCreationPhase;
