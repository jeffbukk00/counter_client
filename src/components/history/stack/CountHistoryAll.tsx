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
      {countHistoryAll!.length <= 0 && (
        <>
          {isFetching && <LoadingFeedbackGeneral />}
          <div className="sm:absolute sm:top-[50%] sm:left-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%] lg:text-lg semi-lg:text-base my-[10%]  sm:my-0 text-center">
            아직 카운트 변화 이력이 없습니다
          </div>
        </>
      )}

      {countHistoryAll!.length > 0 && (
        <div className="w-full p-5 relative">
          {isFetching && <LoadingFeedbackGeneral />}
          <ul>
            {countHistoryAll?.map((e, i) => (
              <li
                key={e._id}
                className={`border rounded-lg p-4 relative mb-4 ${
                  countHistoryAll[i]!.isPositive
                    ? "border-positive"
                    : "border-negative"
                }`}
              >
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
        </div>
      )}
    </>
  );
};

export default CountHistoryAll;
