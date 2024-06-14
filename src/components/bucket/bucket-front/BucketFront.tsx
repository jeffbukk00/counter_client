import { useNavigate } from "react-router-dom";

import { BucketFrontPropsType } from "./types";
import { guideConstants } from "@/components/ui/user-feedback/guide/constants";

import useBoxGuide from "@/components/ui/user-feedback/guide/hooks/useBoxGuide";

import DoubleArrowBottomVector from "@/shared/assets/DoubleArrowBottomVector";

// bucket의 앞면에 대한 최상위 컴포넌트.
const BucketFront = ({
  bucketFrontData: { id, title },
  isVisible,
}: BucketFrontPropsType) => {
  const navigate = useNavigate();

  // 유저가 화면 상에서 이 컴포넌트를 보게 되었을 때, 해당하는 가이드를 동반하여 표시하기 위해 호출.
  useBoxGuide(guideConstants.guideIds["guideId2"], id);

  return (
    <>
      <div className="w-full absolute bottom-3 flex flex-col justify-center items-center px-6">
        {isVisible && (
          <>
            <span className="animate-bounceY">
              <DoubleArrowBottomVector classes="w-8 h-8 inline-block text-positive mb-1" />
            </span>
            <button
              onClick={() => {
                // 버튼 클릭 시, 해당 bucket에 포함 된 counter들의 페이지로 이동.
                navigate(`/main/${id}/counters`);
              }}
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
