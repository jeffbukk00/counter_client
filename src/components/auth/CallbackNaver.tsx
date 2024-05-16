import { useRef, useEffect } from "react";

import useMutationPostAuthorizationCode from "@/components/auth/hooks/useMutationPostAuthorizationCode";

const CallbackNaver = () => {
  const called = useRef(false);
  const { mutatePostAuthorizationCode } = useMutationPostAuthorizationCode();
  useEffect(() => {
    if (called.current) return;
    called.current = true;
    mutatePostAuthorizationCode("naver");
  }, [mutatePostAuthorizationCode]);
  return <></>;
};

export default CallbackNaver;
