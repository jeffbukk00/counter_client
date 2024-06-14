import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 로그인 이후의 라우터에서 not-found 페이지.
const AfterLoginNotFoundPage = () => {
  const navigate = useNavigate();

  // 로그인 이후의 라우터에서의 메인 페이지로 자동 이동.
  useEffect(() => navigate("/main/buckets"), [navigate]);

  return <></>;
};

export default AfterLoginNotFoundPage;
