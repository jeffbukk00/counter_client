import EditControlVector from "@/components/ui/control/assets/EditControlVector";
import { creationActionConstants } from "@/components/ui/creation-action/constants";
import CreationActionButton from "@/components/ui/creation-action/CreationActionButton";
import useNotBoxLoadingContext from "@/contexts/loading/not-box-loading/hooks/useNotBoxLoadingContext";

import { ChangeEventHandler, useState } from "react";

const HistoryComment = ({
  isEditingComment,
  comment,
  startEditing,
  mutate,
}: {
  isEditingComment: boolean;
  comment: string;
  startEditing: () => void;
  mutate: (comment: string) => void;
}) => {
  const [isEditButtonVisible, setIsEditButtonVisible] = useState(false);
  const [updatedComment, setUpdatedComment] = useState(comment);

  const { activateModal } = useNotBoxLoadingContext();

  const updateComment: ChangeEventHandler<HTMLTextAreaElement> = (event) =>
    setUpdatedComment(event.target.value);

  return (
    <div>
      {isEditingComment && (
        <>
          <textarea
            value={updatedComment}
            onChange={updateComment}
            className="border border-gray-300 outline-none text-xs resize-none caret-gray-400 w-32 h-16 overflow-y-scroll"
          ></textarea>
          <CreationActionButton
            isInLastPhase={true}
            type={creationActionConstants.creationActionType.submit}
            actionHandler={() => {
              activateModal();
              mutate(updatedComment);
            }}
            classes="w-6 h-6 inline-block"
            hover=""
          />
        </>
      )}
      {!isEditingComment && (
        <div
          className="border border-gray-300 overflow-y-scroll w-32 h-16"
          onMouseOver={() => setIsEditButtonVisible(true)}
          onMouseOut={() => setIsEditButtonVisible(false)}
        >
          <p className="text-xs whitespace-pre-wrap break-words">
            {comment}
            {isEditButtonVisible && (
              <button onClick={startEditing}>
                <EditControlVector classes="w-6 h-6" />
              </button>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default HistoryComment;
