import { useState } from "react";

import { CountDigitPropsType } from "./types";
import { counterFrontConstants } from "./constants";

import SelectedDigitalNumberVector from "./assets/SelectedDigitalNumberVector";
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

  const showCountButtons = () => setCountButtonsAreVisible(true);
  const hideCountButtons = () => setCountButtonsAreVisible(false);

  return (
    <li
      className="w-12 h-10 relative inline-block"
      onMouseOver={() => {
        if (isInEndCount) return;
        showCountButtons();
      }}
      onMouseOut={hideCountButtons}
    >
      <SelectedDigitalNumberVector number={number} />
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
