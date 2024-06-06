import LoadingFeedbackModal from "@/components/ui/user-feedback/loading/LoadingFeedbackModal";
import useQueryAchievementStackHistoryIds from "./hooks/http/useQueryAchievementStackHistoryIds";
import SelectAchievementStackHistory from "./SelectAchievementStackHistory";

const HistoryStack = ({ counterId }: { counterId: string }) => {
  const { achievementStackHistoryIds, isFetching, isLoading } =
    useQueryAchievementStackHistoryIds(counterId);

  if (isLoading) return <LoadingFeedbackModal />;
  return (
    <>
      {isFetching && <LoadingFeedbackModal />}
      <SelectAchievementStackHistory
        achievementStackHistoryIds={achievementStackHistoryIds!}
      />
    </>
  );
};

export default HistoryStack;
