import CloseModalButton from "../ui/modal/CloseModalButton";
import { historyConstants } from "./constants";
import { HistoryTopbarPropsType } from "./types";

const HistoryTopbar = ({
  changeHistoryType,
  title,
  closeModal,
}: HistoryTopbarPropsType) => {
  return (
    <header className="w-full h-[7%] flex border-b-[1px] border-b-gray-300">
      <h3>"{title}"의 히스토리</h3>
      <button
        onClick={() => changeHistoryType(historyConstants.historyType.stack)}
      >
        스택
      </button>
      <button
        onClick={() => changeHistoryType(historyConstants.historyType.graph)}
      >
        그래프
      </button>
      <CloseModalButton closeModal={closeModal} />
    </header>
  );
};

export default HistoryTopbar;
