import { useState } from "react";

import { MotivationsPropsType } from "./types";
import { motivationConstants } from "./constants";

import MotivationTypeSelectPhase from "./MotivationTypeSelectPhase";
import MotivationTextsQueryPhase from "./motivation-text/MotivationTextsQueryPhase";
import MotivationLinksQueryPhase from "./motivation-link/MotivationLinksQueryPhase";

// motivation들의 최상위 컴포넌트.
const Motivations = ({ boxType, boxId }: MotivationsPropsType) => {
  // 유저에게 표시할 motivation의 타입을 관리하는 상태.
  const [motivationType, setMotivationType] = useState(
    motivationConstants.motivationType.notSelected
  );

  // motivation을 담고 있는 box에 대한 데이터.
  const boxData = { boxType, boxId };

  // motivation 타입을 업데이트 하는 함수.
  const changeMotivationType = (changedMotivationType: number) =>
    setMotivationType(changedMotivationType);

  // motivation 타입을 "notSelected"로 되돌리는 함수.
  const backToNotSelected = () =>
    changeMotivationType(motivationConstants.motivationType.notSelected);

  return (
    <>
      {motivationType === motivationConstants.motivationType.notSelected && (
        <MotivationTypeSelectPhase
          changeMotivationType={changeMotivationType}
          boxId={boxId}
        />
      )}
      {motivationType === motivationConstants.motivationType.text && (
        <MotivationTextsQueryPhase
          boxData={boxData}
          backToNotSelected={backToNotSelected}
        />
      )}
      {motivationType === motivationConstants.motivationType.link && (
        <MotivationLinksQueryPhase
          boxData={boxData}
          backToNotSelected={backToNotSelected}
        />
      )}
    </>
  );
};

export default Motivations;
