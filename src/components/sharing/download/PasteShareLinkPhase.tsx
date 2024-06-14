import { useState } from "react";

import { PasteShareLinkPhasePropsType } from "./type";
import { creationActionConstants } from "@/components/ui/creation-action/constants";
import { readClipboard } from "@/shared/utils/clipboard/readClipboard";
import {
  isValidShareLink,
  linkIsNotPasted,
  validate,
} from "@/shared/utils/validation";

import useFeedbackToPaste from "@/components/ui/clipboard-feedback/hooks/useFeedbackToPaste";
import useMutationValidateShareLink from "./hooks/useMutationValidateShareLink";
import useNotBoxLoadingContext from "@/contexts/loading/not-box-loading/hooks/useNotBoxLoadingContext";
import useNotBoxValidationContext from "@/contexts/feedback/validation/not-box-validation/hooks/useNotBoxValidationContext";

import PasteVector from "@/shared/assets/link/PasteVector";
import FeedbackToPaste from "@/components/ui/clipboard-feedback/FeedbackToPaste";
import CreationActionButton from "@/components/ui/creation-action/CreationActionButton";
import HoverWrapper from "@/components/styles/HoverWrapper";

// 공유 받은 shareLink를 유저가 붙여 넣는 페이즈.
// 붙여 넣은 shareLink의 유효성을 검사.
const PasteShareLinkPhase = ({
  gotoNextPhase,
  updateDownloadLink,
  updateUsername,
}: PasteShareLinkPhasePropsType) => {
  // 유저가 붙여 넣은 lnk를 관리하는 상태.
  const [pastedLink, setPastedLink] = useState("");

  // 유저가 link를 붙여 넣었는지 여부를 관리하는 상태.
  const { isPasted, updateIsPasted } = useFeedbackToPaste();

  // 유저의 클립보드에 저장 된 link를 자동으로 읽어옴.
  // 관련 된 상태들 업데이트.
  const paste = async () => {
    const pasted = await readClipboard();

    updateIsPasted(true);
    setPastedLink(pasted);
  };

  // box가 아닌 메인 요소(box-creator, modal)의 로딩 상태에 따른 유저 피드백을 관리하는 커스텀 훅.
  // 여기서는 modal이 로딩 상태로 전환되었을 때, 유저 피드백을 화면 상에 표시하기 위해 호출하는 함수를 반환.
  const { activateModal } = useNotBoxLoadingContext();

  // 유저 입력이 유효하지 않을 경우에 대한 유저 피드백.
  const { updateIsModalInvalid } = useNotBoxValidationContext();

  // 유저가 붙여 넣은 링크가 유효한 shareLink인지 확인하는 비동기 요청이 성공 했을 시, 호출할 함수.
  const onValidationSuccessHandler = (username: string) => {
    // 성공했을 시, 다운로드 가능한 shareLink임을 확인 및 업데이트.
    updateDownloadLink(pastedLink);
    updateUsername(username);
    gotoNextPhase();
  };

  // 유저가 붙여 넣은 링크가 유효하지 않은 shareLink인지 확인하는 비동기 요청이 실패 했을 시, 호출할 함수.
  const onValidationErrorHandler = () => {
    updateIsPasted(false);
    updateIsModalInvalid(true, ["존재하지 않는 공유 링크입니다"]);
  };

  // 유저가 붙여 넣은 링크가 유효한 shareLink인지 확인하는 비동기 요청을 담고 있는 커스텀 훅.
  const { mutateValidateShareLink } = useMutationValidateShareLink(
    onValidationSuccessHandler,
    onValidationErrorHandler
  );

  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div>
          <p>공유 링크 붙여넣기</p>
        </div>
        <div className="mt-3">
          <HoverWrapper classes="p-2">
            <button onClick={paste}>
              <PasteVector classes="w-8 h-8 inline-block" />
            </button>
          </HoverWrapper>
        </div>
        <div>
          <FeedbackToPaste
            isPasted={isPasted}
            fontSize="sm:text-sm text-[10px]"
          />
        </div>
      </div>
      <div className="absolute bottom-1 left-0 w-full flex justify-center items-center">
        <CreationActionButton
          isInLastPhase={false}
          type={creationActionConstants.creationActionType.click}
          classes="w-7 h-7 inline-block"
          hover="p-1"
          actionHandler={() => {
            // 비동기 요청을 보내기 전, 유효성 검사 진행.
            // 유저가 붙여넣은 link가 유효상 shareLink의 형식을 갖추고 있는지 1차적으로 검사.
            const validationResult = validate([
              linkIsNotPasted(pastedLink),
              isValidShareLink(pastedLink),
            ]);
            if (!validationResult.isValid) {
              updateIsPasted(false);
              return updateIsModalInvalid(true, validationResult.messages);
            }

            // 유저가 붙여 넣은 링크가 유효한 shareLink인지 확인하는 비동기 요청이 호출 될 때, 로딩 상태에 대한 유저 피드백.
            activateModal();

            // 유저가 붙여 넣은 링크가 유효한 shareLink인지 확인하는 비동기 요청이 호출
            mutateValidateShareLink(pastedLink);
          }}
        />
      </div>
    </>
  );
};

export default PasteShareLinkPhase;
