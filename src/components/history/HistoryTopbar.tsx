import CloseModalButton from "../ui/modal/CloseModalButton";
// import { historyConstants } from "./constants";
import { HistoryTopbarPropsType } from "./types";

// counter의 history를 보여주는 컴포넌트의 top.
// 이 컴포넌트에서 보여줄 history의 타입을 변경할 수 있다.
// history의 두가지 타입 중, 현재 stack만 업데이트가 된 상태이므로,
// histroy 타입을 선택하는 기능 자체를 비활성화.
const HistoryTopbar = ({
  // changeHistoryType,
  title,
  closeModal,
}: HistoryTopbarPropsType) => {
  return (
    <header className="w-full h-[7%] flex justify-between items-center border-b-[1px] border-b-gray-300 relative">
      <span className="ml-4">
        <h3 className="text-sm">
          <span className="font-semibold tracking-wide">"{title}"</span>의
          히스토리
        </h3>
      </span>
      {/* <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
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
      </div> */}

      <span className="mr-2">
        <CloseModalButton closeModal={closeModal} />
      </span>
    </header>
  );
};

export default HistoryTopbar;
