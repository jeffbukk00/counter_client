import { useRef, useEffect } from "react";

import useMutationPostAuthorizationCode from "@/components/auth/hooks/useMutationPostAuthorizationCode";
import LoadingFeedbackGlobal from "../ui/user-feedback/loading/LoadingFeedbackGlobal";

// 구글 로그인 성공 시, 리다이렉트 되는 페이지의 컴포넌트.
const CallbackGoogle = () => {
  // 비동기 요청 중복 호출 방지를 위한 변수.
  const called = useRef(false);

  // (oauth) 로그인 한 플랫폼의 인증 서버로부터 엑세스 토큰을 얻기 위한 권한 토큰을 서버로 보내는 비동기 요청.
  const { mutatePostAuthorizationCode } = useMutationPostAuthorizationCode();

  useEffect(() => {
    if (called.current) return;

    called.current = true;

    mutatePostAuthorizationCode("google");
  }, [mutatePostAuthorizationCode]);

  // 비동기 요청 로딩 유저 피드백.
  return <LoadingFeedbackGlobal />;
};

export default CallbackGoogle;
