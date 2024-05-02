import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const BeforeLoginNotFoundPage = () => {
  const navigate = useNavigate();
  useEffect(() => navigate("/landing"), [navigate]);

  return <></>;
};

export default BeforeLoginNotFoundPage;
