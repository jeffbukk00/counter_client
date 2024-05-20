import { useRef, useEffect } from "react";

import useMutationPostAuthorizationCode from "@/components/auth/hooks/useMutationPostAuthorizationCode";
import LoadingFeedbackGlobal from "../ui/user-feedback/loading/LoadingFeedbackGlobal";

const CallbackNaver = () => {
  const called = useRef(false);
  const { mutatePostAuthorizationCode } = useMutationPostAuthorizationCode();
  useEffect(() => {
    if (called.current) return;
    called.current = true;
    mutatePostAuthorizationCode("naver");
  }, [mutatePostAuthorizationCode]);
  return <LoadingFeedbackGlobal />;
};

export default CallbackNaver;
