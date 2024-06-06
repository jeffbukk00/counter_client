import { useState } from "react";
import { historyConstants } from "./constants";
import HistoryTopbar from "./HistoryTopbar";
import { HistoryMainPropsType } from "./types";
import HistoryStack from "./stack/HistoryStack";
// import HistoryGraph from "./graph/HistoryGraph";

const HistoryMain = ({
  counterId,
  title,
  closeModal,
}: HistoryMainPropsType) => {
  const [selectedHistoryType, setSelectedHistoryType] = useState(
    historyConstants.historyType.stack
  );

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
