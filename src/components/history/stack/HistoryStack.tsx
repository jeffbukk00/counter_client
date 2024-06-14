import useQueryAchievementStackHistoryIds from "./hooks/http/useQueryAchievementStackHistoryIds";

import LoadingFeedbackModal from "@/components/ui/user-feedback/loading/LoadingFeedbackModal";
import SelectAchievementStackHistory from "./SelectAchievementStackHistory";

/*
  <counter의 history 구조>

  counter의 count를 업데이트하면, countHistory가 업데이트 된다. 
  count를 업데이트 하다가 counter의 목표 카운트를 달성하면, achievementStackHistory가 업데이트 된다.
  
  counter는 achievementStackHistory와 countHistory까지 모든 history를 가지지만, 이 중에서 achievementStackHistory에 대한 참조를 직접적으로 가진다.
  각 achievementStackHistory는 시작부터 목표 성취까지의 countHistory의 변화 이력들을 가지고 있다.
*/

// counter의 history를 보여주는 두가지 방식 중, stack. 이것의 최상의 컴포넌트.
const HistoryStack = ({ counterId }: { counterId: string }) => {
  // counter의 모든 achievementStackHistory들의 id를 불러오는 비동기 요청을 호출하는 커스텀 훅.
  const { achievementStackHistoryIds, isFetching, isLoading } =
    useQueryAchievementStackHistoryIds(counterId);

  // counter의 모든 achievementStackHistory들의 id를 불러오는 비동기 요청이 로딩 상태일 떄, 유저 피드백.
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
