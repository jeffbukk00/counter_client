import useNotBoxValidationContext from "@/contexts/feedback/validation/not-box-validation/hooks/useNotBoxValidationContext";

import { useEffect, useRef } from "react";

const ValidationFeedbackModal = () => {
  const invalidRef = useRef<HTMLDivElement | null>(null);

  const { isModalInvalid, updateIsModalInvalid } = useNotBoxValidationContext();

  useEffect(() => {
    const element = invalidRef.current;

    if (element) element.focus();
  }, []);

  return (
    <div
      ref={invalidRef}
      tabIndex={1}
      onBlur={() => {
        updateIsModalInvalid(false);
      }}
      className="absolute bottom-0 left-0 border"
    >
      {isModalInvalid.messages.map((e) => (
        <p key={e} className="text-negative">
          {e}
        </p>
      ))}
    </div>
  );
};

export default ValidationFeedbackModal;
