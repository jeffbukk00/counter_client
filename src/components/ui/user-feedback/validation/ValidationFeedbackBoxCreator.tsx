import useNotBoxValidationContext from "@/contexts/feedback/validation/not-box-validation/hooks/useNotBoxValidationContext";
import WarnCircleVector from "@/shared/assets/warn/WarnCircleVector";
import WarnTriangleVector from "@/shared/assets/warn/WarnTriangleVector";

import { useEffect, useRef } from "react";

const ValidationFeedbackBoxCreator = () => {
  const invalidRef = useRef<HTMLDivElement | null>(null);

  const { isBoxCreatorInvalid, updateIsBoxCreatorInvalid } =
    useNotBoxValidationContext();

  useEffect(() => {
    const element = invalidRef.current;

    if (element) element.focus();
  }, []);

  return (
    <div
      ref={invalidRef}
      tabIndex={1}
      onBlur={() => {
        updateIsBoxCreatorInvalid(false);
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
        {isBoxCreatorInvalid.messages.map((e) => (
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

export default ValidationFeedbackBoxCreator;
