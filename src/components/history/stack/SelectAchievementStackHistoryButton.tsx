const SelectAchievementStackHistoryButton = ({
  select,
  id,
  index,
  selectedAchievementStackHistoryId,
  lastIndex,
}: {
  select: (achievementStackHistoryId: string) => void;
  id: string;
  index: number;
  selectedAchievementStackHistoryId: string;
  lastIndex: number;
}) => {
  return (
    <button
      onClick={() => select(id)}
      className={`flex flex-col justify-center items-center w-full h-full border border-gray-200  hover:bg-gray-200 ${
        id === selectedAchievementStackHistoryId ? "bg-gray-200" : ""
      }`}
    >
      <span>{index + 1}</span>
      <span
        className={`inline-block w-3 h-3 rounded-full ${
          lastIndex === index ? "bg-middle" : "bg-positive"
        }`}
      ></span>
    </button>
  );
};

export default SelectAchievementStackHistoryButton;
