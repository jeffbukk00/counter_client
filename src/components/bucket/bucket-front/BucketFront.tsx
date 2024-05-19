import { useNavigate } from "react-router-dom";

import { BucketFrontPropsType } from "./types";
import useBoxGuide from "@/components/ui/user-feedback/guide/hooks/useBoxGuide";
import { guideConstants } from "@/components/ui/user-feedback/guide/constants";
import HoverWrapper from "@/components/styles/HoverWrapper";

const BucketFront = ({
  bucketFrontData: { id, title },
  isVisible,
}: BucketFrontPropsType) => {
  const navigate = useNavigate();

  useBoxGuide(guideConstants.guideIds["guideId2"], id);

  return (
    <>
      <div className="w-full absolute bottom-3 flex justify-center items-center px-6">
        {isVisible && (
          <HoverWrapper classes="px-2 py-1">
            <button onClick={() => navigate(`/main/${id}/counters`)}>
              <span className="text-base">버킷 "{title}"으로 이동</span>
            </button>
          </HoverWrapper>
        )}
        {!isVisible && <h3 className="text-xl text-center">{title}</h3>}
      </div>
    </>
  );
};

export default BucketFront;
