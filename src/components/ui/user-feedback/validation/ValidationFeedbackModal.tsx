import { useEffect, useRef } from "react";

import useNotBoxValidationContext from "@/contexts/feedback/validation/not-box-validation/hooks/useNotBoxValidationContext";

import WarnCircleVector from "@/shared/assets/warn/WarnCircleVector";
import WarnTriangleVector from "@/shared/assets/warn/WarnTriangleVector";

// modal에서의 유저 입력이 유효하지 않을 때 유저 피드백으로서 보여주는 컴포넌트.
const ValidationFeedbackModal = () => {
  const invalidRef = useRef<HTMLDivElement | null>(null);

  // modal이 유효 하지 않은 유저 입력에 대한 유저 피드백을 보여주어야 하는지 확인.
  // modal로부터의 유효하지 않은 유저 입력에 대한 유저 피드백을 업데이트하는 함수.
  const { isModalInvalid, updateIsModalInvalid } = useNotBoxValidationContext();

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
        updateIsModalInvalid(false);
      }}
      className="border border-negative rounded-md w-full pt-2 px-2 flex flex-col"
    >
      <div className="flex justify-start items-center gap-1 mb-2 w-full">
        <WarnTriangleVector classes="w-7 h-7 inline-block" color="#FA7070" />
        <div className="border border-gray-300 p-1 w-full">
          <p className="text-xs font-medium">유효하지 않은 응답입니다</p>
        </div>
      </div>
      <ul>
        {isModalInvalid.messages.map((e) => (
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

export default ValidationFeedbackModal;
