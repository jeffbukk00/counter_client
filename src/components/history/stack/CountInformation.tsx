import { useState } from "react";
import { CountHistoryType } from "./types";
import useMutationEditCommentOfCountHistory from "./hooks/http/useMutationEditCommentOfCountHistory";
import ToggleVector from "@/shared/assets/ToggleVector";
import HistoryComment from "./Comment";

const CountInformation = ({
  countId,
  countHistory: {
    isPositive,
    isResetHistory,
    offset,
    updatedCurrentCount,
    timestamp,
    comment,
  },
  selectedAchievementStackHistoryId,
}: {
  countId: string;
  countHistory: CountHistoryType;
  selectedAchievementStackHistoryId: string;
}) => {
  const [commentIsOpened, setCommentIsOpened] = useState(false);
  const [isEditingComment, setIsEditingComment] = useState(false);

  const { mutateEditCommentOfCountHistory } =
    useMutationEditCommentOfCountHistory(
      countId,
      selectedAchievementStackHistoryId,
      () => setIsEditingComment(false)
    );

  return (
    <div>
      <div>
        {isResetHistory ? (
          <span className="text-negative">카운트 리셋</span>
        ) : (
          <span className={`${isPositive ? "text-positive" : "text-negative"}`}>
            {Math.sign(offset) > 0 ? `+${offset}` : offset}
          </span>
        )}
        <span>{updatedCurrentCount}</span>
        <span>{new Date(timestamp).toLocaleString()}</span>
      </div>
      <div>
        <div>
          <button
            onClick={() => {
              if (isEditingComment && commentIsOpened) {
                setIsEditingComment(false);
              }
              setCommentIsOpened((prev) => !prev);
            }}
          >
            <span>
              <ToggleVector
                classes={`w-6 h-6 transition-transform duration-200 ease-in inline-block ${
                  commentIsOpened ? "rotate-90" : "rotate-0"
                }`}
              />
            </span>
            코멘트 {commentIsOpened ? "접기" : "열기"}
          </button>
          {commentIsOpened && (
            <HistoryComment
              isEditingComment={isEditingComment}
              comment={comment}
              startEditing={() => setIsEditingComment(true)}
              mutate={(comment: string) =>
                mutateEditCommentOfCountHistory(comment)
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CountInformation;
