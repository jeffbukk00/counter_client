import LoadingFeedbackGeneral from "@/components/ui/user-feedback/loading/LoadingFeedbackGeneral";
import useQueryCountHistoryAll from "./hooks/http/useQueryCountHistoryAll";
import CountInformation from "./CountInformation";

const CountHistoryAll = ({
  selectedAchievementStackHistoryId,
}: {
  selectedAchievementStackHistoryId: string;
}) => {
  const { countHistoryAll, isFetching, isLoading } = useQueryCountHistoryAll(
    selectedAchievementStackHistoryId
  );

  if (isLoading) return <LoadingFeedbackGeneral />;

  return (
    <>
      {isFetching && <LoadingFeedbackGeneral />}
      <div>
        {countHistoryAll!.length <= 0 && <p>카운트 변화 이력이 없습니다</p>}
        {countHistoryAll!.length > 0 && (
          <ul>
            {countHistoryAll?.map((e, i) => (
              <li key={e._id}>
                <CountInformation
                  countId={e._id}
                  countHistory={countHistoryAll[i]!}
                  selectedAchievementStackHistoryId={
                    selectedAchievementStackHistoryId
                  }
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default CountHistoryAll;
