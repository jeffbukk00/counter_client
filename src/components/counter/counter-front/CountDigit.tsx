import { useCallback, useEffect, useState } from "react";

import { CountDigitPropsType } from "./types";
import { counterFrontConstants } from "./constants";

import SelectedDigitalNumberVector from "../../../shared/assets/digital-numbers/SelectedDigitalNumberVector";
import CountButton from "./CountButton";

const CountDigit = ({
  number,
  digit,
  direction,
  isInEndCount,
  getCloseToEndCount,
  becomeDistantFromEndCount,
}: CountDigitPropsType) => {
  const [countButtonsAreVisible, setCountButtonsAreVisible] = useState(false);

  const showCountButtons = useCallback(
    () => setCountButtonsAreVisible(true),
    []
  );
  const hideCountButtons = useCallback(
    () => setCountButtonsAreVisible(false),
    []
  );

  useEffect(() => {
    if (isInEndCount) {
      hideCountButtons();
    }
  }, [isInEndCount, hideCountButtons]);
  return (
    <li
      className="w-full h-20 relative flex justify-center items-center"
      onMouseOver={() => {
        if (isInEndCount) return;
        showCountButtons();
      }}
      onMouseOut={hideCountButtons}
    >
      <SelectedDigitalNumberVector number={number} classes="w-full h-10" />
      {countButtonsAreVisible && !isInEndCount && (
        <span className="w-full h-full absolute top-0 left-0">
          <CountButton
            type={counterFrontConstants.countButtonType.plus}
            digit={digit}
            direction={direction}
            getCloseToEndCount={getCloseToEndCount}
            becomeDistantFromEndCount={becomeDistantFromEndCount}
          />
          <CountButton
            type={counterFrontConstants.countButtonType.minus}
            digit={digit}
            direction={direction}
            getCloseToEndCount={getCloseToEndCount}
            becomeDistantFromEndCount={becomeDistantFromEndCount}
          />
        </span>
      )}
    </li>
  );
};

export default CountDigit;
