import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 로그인 이전의 라우터의 not-found 페이지.
const BeforeLoginNotFoundPage = () => {
  const navigate = useNavigate();
  // 로그인 이전의 라우터의 메인 페이지로 자동 이동.
  useEffect(() => navigate("/landing"), [navigate]);

  return <></>;
};

export default BeforeLoginNotFoundPage;
