import LoadingFeedbackGeneral from "@/components/ui/user-feedback/loading/LoadingFeedbackGeneral";
import useQueryAchievementStackHistory from "./hooks/http/useQueryAchievementStackHistory";
import { useEffect, useState } from "react";
import HistoryComment from "./Comment";
import useMutationEditCommentOfAchievementStackHistory from "./hooks/http/useMutationEditCommentOfAchievementStackHistory";
import TimeVector from "@/shared/assets/TimeVector";

const SelectedAchievementStackHistoryInformation = ({
  selectedAchievementStackHistoryId,
}: {
  selectedAchievementStackHistoryId: string;
}) => {
  const [isEditingComment, setIsEditingComment] = useState(false);

  const { achievementStackHistory, isFetching, isLoading } =
    useQueryAchievementStackHistory(selectedAchievementStackHistoryId);

  const { mutateEditCommentOfAchievementStackHistory } =
    useMutationEditCommentOfAchievementStackHistory(
      selectedAchievementStackHistoryId,
      () => setIsEditingComment(false)
    );

  useEffect(() => {
    setIsEditingComment(false);
  }, [selectedAchievementStackHistoryId]);

  if (isLoading) return <LoadingFeedbackGeneral />;

  return (
    <>
      {achievementStackHistory && (
        <div className="w-full sm:px-10 sm:py-5 px-6 py-3 relative">
          {isFetching && <LoadingFeedbackGeneral />}
          <div className="mb-2">
            <span className="text-xs tracking-wide text-gray-300">
              {achievementStackHistory.stack + 1}번째 성취입니다
            </span>
          </div>
          <div className="mb-6">
            <span>
              {achievementStackHistory.isAchieved ? (
                <span className="py-1 px-2 border border-positive text-positive rounded-xl text-sm">
                  성취 완료
                </span>
              ) : (
                <span className="py-1 px-2 border border-middle text-middle rounded-xl text-sm">
                  성취 진행 중
                </span>
              )}
            </span>
          </div>
          <div className="border border-gray-300 p-4 mb-6">
            <div className="mb-4">
              <span className="flex items-center font-medium">
                <span className="mr-1 flex justify-center items-center">
                  <TimeVector classes="w-7 h-7 inline-block" />
                </span>
                타임스탬프
              </span>
            </div>
            <div className="mb-2">
              <p className="text-sm font-medium">시작 시점</p>
              <p className="text-xs tracking-wide">
                {new Date(achievementStackHistory.createdAt).toLocaleString()}
              </p>
            </div>
            {achievementStackHistory.isAchieved &&
              achievementStackHistory.achievedAt !== null && (
                <div>
                  <p className="text-sm font-medium">성취 시점</p>
                  <p className="text-xs tracking-wide">
                    {new Date(
                      achievementStackHistory.achievedAt
                    ).toLocaleString()}
                  </p>
                </div>
              )}
            {!achievementStackHistory.isAchieved &&
              achievementStackHistory.achievedAt === null && (
                <div>
                  <p className="text-sm font-medium">최근 카운트 업데이트</p>
                  <p className="text-xs tracking-wide">
                    {achievementStackHistory.latestCountAt !== null
                      ? new Date(
                          achievementStackHistory.latestCountAt
                        ).toLocaleString()
                      : `이번 성취 스택에서는 카운트를 업데이트한 적이 없습니다`}
                  </p>
                </div>
              )}
          </div>

          <div>
            <div className="w-full border border-gray-300 p-4">
              <div className="mb-3">
                <span className="text-base font-medium">기록</span>
              </div>

              <div className="w-full">
                <HistoryComment
                  isEditingComment={isEditingComment}
                  comment={achievementStackHistory.comment}
                  startEditing={() => setIsEditingComment(true)}
                  mutate={(comment: string) =>
                    mutateEditCommentOfAchievementStackHistory(comment)
                  }
                  historyId={selectedAchievementStackHistoryId}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectedAchievementStackHistoryInformation;
