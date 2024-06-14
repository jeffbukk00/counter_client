import { useEffect, useRef, useState } from "react";

import SelectedAchievementStackHistoryInformation from "./SelectedAchievementStackHistoryInformation";
import CountHistoryAll from "./CountHistoryAll";
import SelectAchievementStackHistoryButton from "./SelectAchievementStackHistoryButton";

// counter의 achievementStackHistory들 중, 상세한 정보를 확인하기 위해 어느 하나를 선택해야 함.
// counter의 achievementStackHistory를 대략적으록 보여줌과 동시에, 그 중 하나를 유저가 선택하게 만드는 기능을 하는 컴포넌트.
const SelectAchievementStackHistory = ({
  achievementStackHistoryIds,
}: {
  achievementStackHistoryIds: string[];
}) => {
  // 유저에 의해 선택 된 achievementStackHistory를 관리 하는 상태.
  const [selectedAchievementStackHistory, setSelectedAchievementStackHistory] =
    useState(achievementStackHistoryIds[achievementStackHistoryIds.length - 1]);

  // achievementStackHistory를 선택하는 함수.
  const select = (achievementStackHistoryId: string) =>
    setSelectedAchievementStackHistory(achievementStackHistoryId);

  // 선택한 achievementStackHistory에 대한 상세한 정보를 보여주는 컴포넌트를 담고 있는 컨테이너에 대한 참조를 저장.
  const achievementStackHistoryInformationRef = useRef<HTMLDivElement | null>(
    null
  );

  // 선택한 achievementStackHistory의 countHistory를 보여주는 컴포넌트를 담고 있는 컨테이너에 대한 참조를 저장.
  const countHistoryAllRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 선택한 achievementStackHistory가 변화할 때마다,
    // 선택한 achievementStackHistory에 대한 상세한 정보를 보여주는 컴포넌트를 담고 있는 컨테이너의 스크롤 맨위로 올림.
    if (achievementStackHistoryInformationRef.current !== null) {
      achievementStackHistoryInformationRef.current.scroll({
        top: 0,
        behavior: "auto",
      });
    }

    // 선택한 achievementStackHistory가 변화할 때마다,
    // 선택한 achievementStackHistory의 countHistory를 보여주는 컴포넌트를 담고 있는 컨테이너의 스크롤 맨위로 올림.
    if (countHistoryAllRef.current !== null) {
      countHistoryAllRef.current.scroll({ top: 0, behavior: "auto" });
    }
  }, [selectedAchievementStackHistory]);

  return (
    <div className="w-full h-full sm:grid sm:grid-cols-2 sm:grid-rows-1">
      <div className="sm:overflow-y-scroll md:p-20 sm:p-10 p-5 sm:border-r-[1px] sm:border-b-0 border-b-[1px] border-b-gray-400">
        <ul className="grid lg:grid-cols-5 grid-cols-4 border border-gray-400 border-collapse">
          {achievementStackHistoryIds.map((e, i) => {
            return (
              <li key={e}>
                <SelectAchievementStackHistoryButton
                  select={select}
                  id={e}
                  index={i}
                  selectedAchievementStackHistoryId={
                    selectedAchievementStackHistory
                  }
                  lastIndex={achievementStackHistoryIds.length - 1}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <div className="w-full h-full sm:grid sm:grid-cols-1 sm:grid-rows-[2fr_3fr]">
          <div
            ref={achievementStackHistoryInformationRef}
            className="sm:overflow-y-scroll relative border-b-[1px] border-b-gray-400"
          >
            <SelectedAchievementStackHistoryInformation
              selectedAchievementStackHistoryId={
                selectedAchievementStackHistory
              }
            />
          </div>

          <div
            ref={countHistoryAllRef}
            className="sm:overflow-y-scroll relative"
          >
            <CountHistoryAll
              selectedAchievementStackHistoryId={
                selectedAchievementStackHistory
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectAchievementStackHistory;
