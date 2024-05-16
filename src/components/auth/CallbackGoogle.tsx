import { useRef, useEffect } from "react";

import useMutationPostAuthorizationCode from "@/components/auth/hooks/useMutationPostAuthorizationCode";

const CallbackGoogle = () => {
  const called = useRef(false);
  const { mutatePostAuthorizationCode } = useMutationPostAuthorizationCode();
  useEffect(() => {
    if (called.current) return;
    called.current = true;
    mutatePostAuthorizationCode("google");
  }, [mutatePostAuthorizationCode]);
  return <></>;
};

export default CallbackGoogle;
