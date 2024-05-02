import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AfterLoginNotFoundPage = () => {
  const navigate = useNavigate();
  useEffect(() => navigate("/main/buckets"), [navigate]);

  return <></>;
};

export default AfterLoginNotFoundPage;
