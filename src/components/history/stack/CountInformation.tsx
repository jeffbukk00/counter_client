import { useState } from "react";

import { CountHistoryType } from "./types";

import useMutationEditCommentOfCountHistory from "./hooks/http/useMutationEditCommentOfCountHistory";

import ToggleVector from "@/shared/assets/ToggleVector";
import HistoryComment from "./Comment";
import TimeVector from "@/shared/assets/TimeVector";

// countHistory 각각에 대한 상세 정보를 보여주는 컴포넌트.
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
  // countHistory의 comment를 유저에게 보이게 할지 여부를 관리하는 상태.
  const [commentIsOpened, setCommentIsOpened] = useState(false);

  // countHistory의 comment를 수정 시작할지 여부를 관리하는 상태.
  const [isEditingComment, setIsEditingComment] = useState(false);

  // countHistory의 comment를 수정하는 비동기 요청을 담고 있는 커스텀 훅.
  const { mutateEditCommentOfCountHistory } =
    useMutationEditCommentOfCountHistory(
      countId,
      selectedAchievementStackHistoryId,
      () => setIsEditingComment(false)
    );

  return (
    <>
      <span className="text-xs absolute top-3 right-4 flex items-center tracking-tight">
        <TimeVector classes="w-4 h-4 inline-block mr-1" />
        {new Date(timestamp).toLocaleString()}
      </span>
      <div
        className={`mt-5 border  p-2 mb-4  ${
          isPositive ? "border-positive" : "border-negative"
        }`}
      >
        {isResetHistory ? (
          <span className="text-negative mr-2 font-medium">카운트 리셋</span>
        ) : (
          <span
            className={`mr-2 font-medium ${
              isPositive
                ? "text-positive border-positive"
                : "text-negative border-negative"
            }`}
          >
            {Math.sign(offset) > 0 ? `+${offset}` : offset}
          </span>
        )}
        <span className="text-sm font-medium">{updatedCurrentCount}</span>
        <span className="sm:text-xs text-[10px] tracking-tight">
          {" "}
          으로 카운트가 업데이트 되었습니다
        </span>
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
            className="text-sm flex items-center mb-2"
          >
            <span>
              <ToggleVector
                classes={`w-7 h-7 transition-transform duration-200 ease-in inline-block -mr-1 ${
                  commentIsOpened ? "rotate-90" : "rotate-0"
                }`}
              />
            </span>
            <span className="mr-1">기록</span>
            <span className="font-medium">
              {commentIsOpened ? "접기" : "열기"}
            </span>
          </button>
          {commentIsOpened && (
            <HistoryComment
              isEditingComment={isEditingComment}
              comment={comment}
              startEditing={() => setIsEditingComment(true)}
              mutate={(comment: string) =>
                mutateEditCommentOfCountHistory(comment)
              }
              historyId={countId}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CountInformation;
