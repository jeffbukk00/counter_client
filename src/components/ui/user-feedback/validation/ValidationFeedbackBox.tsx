import useBoxValidationContext from "@/contexts/feedback/validation/box-validation/hooks/useBoxValidationContext";

import { useEffect, useRef } from "react";

const ValidationFeedbackBox = ({
  invalidBoxIdx,
}: {
  invalidBoxIdx: number;
}) => {
  const invalidRef = useRef<HTMLDivElement | null>(null);

  const { invalidBoxes, removeInvalidBox } = useBoxValidationContext();

  useEffect(() => {
    const element = invalidRef.current;

    if (element) element.focus();
  }, []);

  return (
    <div
      ref={invalidRef}
      tabIndex={1}
      onBlur={() => {
        removeInvalidBox(invalidBoxIdx);
        console.log(1);
      }}
      className="absolute bottom-0 left-0 border"
    >
      {invalidBoxes[invalidBoxIdx].messages.map((e) => (
        <p key={e} className="text-negative">
          {e}
        </p>
      ))}
    </div>
  );
};

export default ValidationFeedbackBox;
