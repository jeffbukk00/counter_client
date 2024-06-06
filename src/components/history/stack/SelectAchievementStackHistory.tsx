import { useState } from "react";
import SelectedAchievementStackHistoryInformation from "./SelectedAchievementStackHistoryInformation";
import CountHistoryAll from "./CountHistoryAll";
import SelectAchievementStackHistoryButton from "./SelectAchievementStackHistoryButton";

const SelectAchievementStackHistory = ({
  achievementStackHistoryIds,
}: {
  achievementStackHistoryIds: string[];
}) => {
  const [selectedAchievementStackHistory, setSelectedAchievementStackHistory] =
    useState(achievementStackHistoryIds[achievementStackHistoryIds.length - 1]);

  const select = (achievementStackHistoryId: string) =>
    setSelectedAchievementStackHistory(achievementStackHistoryId);

  return (
    <div className="w-full h-full grid grid-cols-2 grid-rows-1">
      <div className="overflow-y-scroll p-20">
        <ul className="grid grid-cols-5 border border-gray-400 border-collapse">
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
        <div className="w-full h-full grid grid-cols-1 grid-rows-[2fr_3fr]">
          <div className="overflow-y-scroll relative border-b-[1px] border-b-gray-400">
            <SelectedAchievementStackHistoryInformation
              selectedAchievementStackHistoryId={
                selectedAchievementStackHistory
              }
            />
          </div>
          <div className="overflow-y-scroll relative">
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