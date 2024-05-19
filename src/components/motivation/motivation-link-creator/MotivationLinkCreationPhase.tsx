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
