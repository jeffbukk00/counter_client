import { useCallback, useEffect, useState } from "react";

import { CountDigitPropsType } from "./types";
import { counterFrontConstants } from "./constants";

import SelectedDigitalNumberVector from "../../../shared/assets/digital-numbers/SelectedDigitalNumberVector";
import CountButton from "./CountButton";

// CountDisplay를 구성하는 6자리들의 숫자 각각을 나타냄.
// 자릿수에 해당하는 값만큼 count를 업데이트할 수 있음.
const CountDigit = ({
  number,
  digit,
  direction,
  isInEndCount,
  getCloseToEndCount,
  becomeDistantFromEndCount,
}: CountDigitPropsType) => {
  // count를 업데이트 하는 버튼들이 보여질지에 대한 상태 관리.
  const [countButtonsAreVisible, setCountButtonsAreVisible] = useState(false);

  // count를 업데이트 하는 버튼들을 보여줌.
  const showCountButtons = useCallback(
    () => setCountButtonsAreVisible(true),
    []
  );
  // count를 업데이트 하는 버튼들을 숨김.
  const hideCountButtons = useCallback(
    () => setCountButtonsAreVisible(false),
    []
  );

  useEffect(() => {
    if (isInEndCount) {
      // 현재 count가 endCount와 같은 경우, count의 업데이트를 중지해야 함.
      // 그래서, count를 업데이트 하는 버튼들을 숨김.
      hideCountButtons();
    }
  }, [isInEndCount, hideCountButtons]);

  return (
    <li
      className="w-full h-20 relative flex justify-center items-center"
      onMouseOver={() => {
        // 마우스 포인터를 올리면 count를 업데이트 하는 버튼들이 보여짐.
        if (isInEndCount) return;
        showCountButtons();
      }}
      onMouseOut={
        // 마우스 포인터가 벗어나면 count를 업데이트 하는 버튼들이 숨겨짐.
        hideCountButtons
      }
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
