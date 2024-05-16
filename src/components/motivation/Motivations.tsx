import { useState } from "react";

import { MotivationsPropsType } from "./types";
import { motivationConstants } from "./constants";

import MotivationTypeSelectPhase from "./MotivationTypeSelectPhase";
import MotivationTextsQueryPhase from "./motivation-text/MotivationTextsQueryPhase";
import MotivationLinksQueryPhase from "./motivation-link/MotivationLinksQueryPhase";

const Motivations = ({ boxType, boxId }: MotivationsPropsType) => {
  const [motivationType, setMotivationType] = useState(
    motivationConstants.motivationType.notSelected
  );

  const boxData = { boxType, boxId };

  const changeMotivationType = (changedMotivationType: number) =>
    setMotivationType(changedMotivationType);
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
