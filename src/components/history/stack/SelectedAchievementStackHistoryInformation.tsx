import LoadingFeedbackGeneral from "@/components/ui/user-feedback/loading/LoadingFeedbackGeneral";
import useQueryAchievementStackHistory from "./hooks/http/useQueryAchievementStackHistory";
import ToggleVector from "@/shared/assets/ToggleVector";
import { useEffect, useState } from "react";
import HistoryComment from "./Comment";
import useMutationEditCommentOfAchievementStackHistory from "./hooks/http/useMutationEditCommentOfAchievementStackHistory";

const SelectedAchievementStackHistoryInformation = ({
  selectedAchievementStackHistoryId,
}: {
  selectedAchievementStackHistoryId: string;
}) => {
  const [commentIsOpened, setCommentIsOpened] = useState(false);
  const [isEditingComment, setIsEditingComment] = useState(false);

  const { achievementStackHistory, isFetching, isLoading } =
    useQueryAchievementStackHistory(selectedAchievementStackHistoryId);

  const { mutateEditCommentOfAchievementStackHistory } =
    useMutationEditCommentOfAchievementStackHistory(
      selectedAchievementStackHistoryId,
      () => setIsEditingComment(false)
    );

  useEffect(() => {
    setCommentIsOpened(false);
  }, [selectedAchievementStackHistoryId]);

  if (isLoading) return <LoadingFeedbackGeneral />;

  return (
    <>
      {isFetching && <LoadingFeedbackGeneral />}
      {achievementStackHistory && (
        <div>
          <span>{achievementStackHistory.stack + 1}번째 성취</span>
          <p>
            상태: {achievementStackHistory.isAchieved ? "성취 완료" : "진행 중"}
          </p>
          <p>
            시작 시점:{" "}
            {new Date(achievementStackHistory.createdAt).toLocaleString()}
          </p>
          {achievementStackHistory.isAchieved &&
            achievementStackHistory.achievedAt !== null && (
              <p>
                성취 시점:{" "}
                {new Date(achievementStackHistory.achievedAt).toLocaleString()}
              </p>
            )}
          {!achievementStackHistory.isAchieved &&
            achievementStackHistory.achievedAt === null && (
              <p>
                최근 성취:{" "}
                {achievementStackHistory.latestCountAt !== null
                  ? new Date(
                      achievementStackHistory.latestCountAt
                    ).toLocaleString()
                  : "최근 성취 없음"}
              </p>
            )}
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
                  comment={achievementStackHistory.comment}
                  startEditing={() => setIsEditingComment(true)}
                  mutate={(comment: string) =>
                    mutateEditCommentOfAchievementStackHistory(comment)
                  }
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectedAchievementStackHistoryInformation;
