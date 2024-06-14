import { useEffect, useRef } from "react";

import useBoxValidationContext from "@/contexts/feedback/validation/box-validation/hooks/useBoxValidationContext";

import WarnCircleVector from "@/shared/assets/warn/WarnCircleVector";
import WarnTriangleVector from "@/shared/assets/warn/WarnTriangleVector";

// box에서의 유저 입력이 유효하지 않을 때 유저 피드백으로서 보여주는 컴포넌트.
const ValidationFeedbackBox = ({
  invalidBoxIdx,
}: {
  invalidBoxIdx: number;
}) => {
  const invalidRef = useRef<HTMLDivElement | null>(null);

  // 이 box가 유효 하지 않은 유저 입력에 대한 유저 피드백을 보여주어야 하는지 확인.
  // 이 box로부터 유저 피드백을 제거하는 함수.
  const { invalidBoxes, removeInvalidBox } = useBoxValidationContext();

  useEffect(() => {
    const element = invalidRef.current;

    // blur event를 활용하기 위해, 인위적으로 focus.
    if (element) element.focus();
  }, []);

  return (
    <div
      ref={invalidRef}
      tabIndex={1}
      onBlur={() => {
        // blur event 발생 시, 유저 피드백 사라짐.
        removeInvalidBox(invalidBoxIdx);
      }}
      className="border border-negative rounded-md w-80 pt-2 px-2 flex flex-col"
    >
      <div className="flex justify-start items-center gap-1 mb-2 w-full">
        <WarnTriangleVector classes="w-7 h-7 inline-block" color="#FA7070" />
        <div className="border border-gray-300 p-1 w-full">
          <p className="text-xs font-medium">유효하지 않은 응답입니다</p>
        </div>
      </div>
      <ul>
        {invalidBoxes[invalidBoxIdx].messages.map((e) => (
          <li
            key={e}
            className="border border-gray-300 p-2 flex justify-start items-center gap-1 mb-2"
          >
            <WarnCircleVector classes="w-5 h-5 inline-block" color="#FA7070" />
            <p className="text-negative text-xs w-full">{e}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ValidationFeedbackBox;
