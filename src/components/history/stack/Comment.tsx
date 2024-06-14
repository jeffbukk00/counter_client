import { ChangeEventHandler, useEffect, useRef, useState } from "react";

import { creationActionConstants } from "@/components/ui/creation-action/constants";

import useNotBoxLoadingContext from "@/contexts/loading/not-box-loading/hooks/useNotBoxLoadingContext";

import HoverWrapper from "@/components/styles/HoverWrapper";
import EditControlVector from "@/components/ui/control/assets/EditControlVector";
import CreationActionButton from "@/components/ui/creation-action/CreationActionButton";

// history의 comment를 업데이트 하는 컴포넌트.
// history의 종류가 achievementStackHistory이든, countHistory이든 상관 없음.
const HistoryComment = ({
  isEditingComment,
  comment,
  startEditing,
  mutate,
  historyId,
}: {
  isEditingComment: boolean;
  comment: string;
  startEditing: () => void;
  mutate: (comment: string) => void;
  historyId: string;
}) => {
  // history의 comment 업데이트를 위한 유저 입력을 관리하는 상태.
  const [updatedComment, setUpdatedComment] = useState("");

  // comment에 대한 유저 입력을 받는 요소에 대한 참조를 저장.
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // box가 아닌 메인 요소(box-creator, modal)의 로딩 상태에 따른 유저 피드백을 관리하는 커스텀 훅.
  // 여기서는 modal이 로딩 상태로 전환되었을 때, 유저 피드백을 화면 상에 표시하기 위해 호출하는 함수를 반환.
  const { activateModal } = useNotBoxLoadingContext();

  // history의 comment 업데이트를 위한 유저 입력을 관리하는 상태를 업데이트하는 함수.
  const updateComment: ChangeEventHandler<HTMLTextAreaElement> = (event) =>
    setUpdatedComment(event.target.value);

  useEffect(() => {
    // history에 이미 저장된 comment가 있다면, 그것으로 history의 comment 업데이트를 위한 유저 입력을 관리하는 상태를 초기화.
    setUpdatedComment(comment);
  }, [comment, historyId]);

  useEffect(() => {
    if (isEditingComment && textareaRef.current) {
      // comment 수정을 시작할 때, 유저 입력을 받는 요소 자동으로 포커스.
      textareaRef.current.focus();
    }
  }, [isEditingComment]);
  return (
    <>
      {isEditingComment && (
        <>
          <textarea
            value={updatedComment}
            placeholder="여기에 입력해주세요..."
            onChange={updateComment}
            className="outline-none text-xs resize-none caret-gray-400 w-full h-40 border border-gray-300 p-3 overflow-y-scroll"
            ref={textareaRef}
          ></textarea>
          <div className="flex justify-center items-center">
            <CreationActionButton
              isInLastPhase={true}
              type={creationActionConstants.creationActionType.submit}
              actionHandler={() => {
                // history의 comment 업데이트를 위한 비동기 요청이 호출 될 때, 로딩 상태에 대한 유저 피드백.
                activateModal();
                // history의 comment 업데이트를 위한 비동기 요청이 호출.
                mutate(updatedComment);
              }}
              classes="w-6 h-6 inline-block"
              hover="p-1"
            />
          </div>
        </>
      )}
      {!isEditingComment && (
        <>
          <div className="border border-gray-300 overflow-y-scroll w-full h-40 p-3 pb-5">
            <p className="w-full text-xs whitespace-pre-wrap break-words">
              {comment}
            </p>
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={
                // history의 comment 수정 시작.
                startEditing
              }
            >
              <HoverWrapper classes="p-1 mt-2 flex justify-center items-center">
                <EditControlVector classes="w-6 h-6 inline-block" />
              </HoverWrapper>
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default HistoryComment;
