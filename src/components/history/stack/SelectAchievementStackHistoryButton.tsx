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
      className={`relative w-full h-20 flex flex-col justify-center items-center border border-collapse border-gray-200  hover:bg-gray-100 ${
        id === selectedAchievementStackHistoryId ? "bg-gray-100" : ""
      }`}
    >
      <span className="absolute top-0 left-1 text-sm">{index + 1}</span>
      <span
        className={`mt-4 inline-block w-[10px] h-[10px] rounded-full ${
          lastIndex === index ? "bg-middle" : "bg-positive"
        }`}
      ></span>
    </button>
  );
};

export default SelectAchievementStackHistoryButton;
