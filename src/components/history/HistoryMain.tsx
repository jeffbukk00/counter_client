import { useState } from "react";

import { historyConstants } from "./constants";
import { HistoryMainPropsType } from "./types";

import HistoryTopbar from "./HistoryTopbar";
import HistoryStack from "./stack/HistoryStack";
// import HistoryGraph from "./graph/HistoryGraph";

// counter의 history를 보여주는 기능의 최상의 컴포넌트.
const HistoryMain = ({
  counterId,
  title,
  closeModal,
}: HistoryMainPropsType) => {
  // 유저에 의해 선택된 history의 타입을 관리하는 상태.
  const [selectedHistoryType, setSelectedHistoryType] = useState(
    historyConstants.historyType.stack
  );

  // history의 타입을 변경하는 함수.
  const changeHistoryType = (historyType: number) =>
    setSelectedHistoryType(historyType);

  return (
    <>
      <HistoryTopbar
        changeHistoryType={changeHistoryType}
        title={title}
        closeModal={closeModal}
      />
      <section className="w-full h-[93%]">
        {selectedHistoryType === historyConstants.historyType.stack && (
          <HistoryStack counterId={counterId} />
        )}
        {/* {selectedHistoryType === historyConstants.historyType.graph && (
          <HistoryGraph counterId={counterId} />
        )} */}
      </section>
    </>
  );
};

export default HistoryMain;
