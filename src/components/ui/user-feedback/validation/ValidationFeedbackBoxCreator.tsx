import useNotBoxValidationContext from "@/contexts/feedback/validation/not-box-validation/hooks/useNotBoxValidationContext";

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
      className="absolute bottom-0 left-0 border"
    >
      {isBoxCreatorInvalid.messages.map((e) => (
        <p key={e} className="text-negative">
          {e}
        </p>
      ))}
    </div>
  );
};

export default ValidationFeedbackBoxCreator;
