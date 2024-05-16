import { useRef, useEffect } from "react";

import useMutationPostAuthorizationCode from "@/components/auth/hooks/useMutationPostAuthorizationCode";

const CallbackKakao = () => {
  const called = useRef(false);
  const { mutatePostAuthorizationCode } = useMutationPostAuthorizationCode();
  useEffect(() => {
    if (called.current) return;
    called.current = true;
    mutatePostAuthorizationCode("kakao");
  }, [mutatePostAuthorizationCode]);
  return <></>;
};

export default CallbackKakao;
