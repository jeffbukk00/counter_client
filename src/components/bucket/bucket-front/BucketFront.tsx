import { useNavigate } from "react-router-dom";

import { BucketFrontPropsType } from "./types";
import useBoxGuide from "@/components/ui/user-feedback/guide/hooks/useBoxGuide";
import { guideConstants } from "@/components/ui/user-feedback/guide/constants";

import DoubleArrowBottomVector from "@/shared/assets/DoubleArrowBottom";

const BucketFront = ({
  bucketFrontData: { id, title },
  isVisible,
}: BucketFrontPropsType) => {
  const navigate = useNavigate();

  useBoxGuide(guideConstants.guideIds["guideId2"], id);

  return (
    <>
      <div className="w-full absolute bottom-3 flex flex-col justify-center items-center px-6">
        {isVisible && (
          <>
            <span className="animate-bounce ">
              <DoubleArrowBottomVector classes="w-8 h-8 inline-block text-positive mb-1" />
            </span>
            <button
              onClick={() => navigate(`/main/${id}/counters`)}
              className="border border-gray-300 py-2 px-4 rounded-2xl hover:bg-gray-100"
            >
              <span className="text-base tracking-wide">
                버킷 <span className="font-medium">"{title}"</span>으로 이동
              </span>
            </button>
          </>
        )}
        {!isVisible && <h3 className="text-xl text-center">{title}</h3>}
      </div>
    </>
  );
};

export default BucketFront;
