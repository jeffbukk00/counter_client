import { useNavigate } from "react-router-dom";

import { BucketFrontPropsType } from "./types";
import useBoxGuide from "@/components/ui/user-feedback/guide/hooks/useBoxGuide";
import { guideConstants } from "@/components/ui/user-feedback/guide/constants";

const BucketFront = ({
  bucketFrontData: { id, title },
  isVisible,
}: BucketFrontPropsType) => {
  const navigate = useNavigate();

  useBoxGuide(guideConstants.guideIds["guideId2"], id);

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
