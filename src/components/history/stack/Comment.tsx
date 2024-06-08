import HoverWrapper from "@/components/styles/HoverWrapper";
import EditControlVector from "@/components/ui/control/assets/EditControlVector";
import { creationActionConstants } from "@/components/ui/creation-action/constants";
import CreationActionButton from "@/components/ui/creation-action/CreationActionButton";
import useNotBoxLoadingContext from "@/contexts/loading/not-box-loading/hooks/useNotBoxLoadingContext";

import { ChangeEventHandler, useEffect, useRef, useState } from "react";

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
  const [updatedComment, setUpdatedComment] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { activateModal } = useNotBoxLoadingContext();

  const updateComment: ChangeEventHandler<HTMLTextAreaElement> = (event) =>
    setUpdatedComment(event.target.value);

  useEffect(() => {
    setUpdatedComment(comment);
  }, [comment, historyId]);

  useEffect(() => {
    if (isEditingComment && textareaRef.current) {
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
                activateModal();
                mutate(updatedComment);
                // setUpdatedComment("");
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
            <button onClick={startEditing}>
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
