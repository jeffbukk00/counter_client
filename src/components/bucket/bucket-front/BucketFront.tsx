import { useNavigate } from "react-router-dom";
import { BucketFrontPropsType } from "./types";

const BucketFront = ({
  bucketFrontData: { id, title },
  isVisible,
}: BucketFrontPropsType) => {
  const navigate = useNavigate();

  return (
    <>
      {isVisible && (
        <button onClick={() => navigate(`/main/${id}/counters`)}>
          버킷 "{title}"으로 이동
        </button>
      )}
      {!isVisible && <p>{title}</p>}
    </>
  );
};

export default BucketFront;
