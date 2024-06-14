import { HasChildren } from "@/shared/types";

import useNotBoxGuideContext from "@/contexts/feedback/guide/not-box-guide/hooks/useNotBoxGuideContext";
import useNotBoxValidationContext from "@/contexts/feedback/validation/not-box-validation/hooks/useNotBoxValidationContext";
import useNotBoxLoadingContext from "@/contexts/loading/not-box-loading/hooks/useNotBoxLoadingContext";

import LoadingFeedbackModal from "../user-feedback/loading/LoadingFeedbackModal";
import ValidationFeedbackModal from "../user-feedback/validation/ValidationFeedbackModal";
import GuideModal from "../user-feedback/guide/GuideModal";

// modal에 대한 컨테이너 역할을 하는 컴포넌트.
// 넓은 버전.
const CenterContainerWide = ({ children }: HasChildren) => {
  // modal에서 호출한 비동기 요청이 로딩 상태인지 확인.
  const { modalIsLoading } = useNotBoxLoadingContext();
  // modal에서 유효하지 않은 유저 입력이 발생했는지 확인.
  const { isModalInvalid } = useNotBoxValidationContext();
  // modal에서 현재 띄워야 할 유저 가이드 있는지 확인.
  const { modalGuide } = useNotBoxGuideContext();

  return (
    <div className="xl:w-[80vw] xl:h-[80vh] lg:w-[80vw] lg:h-[80vh] semi-lg:w-[85vw] semi-lg:h-[80vh] md:w-[90vw] md:h-[80vh] sm:w-[90vw] sm:h-[80vh]  w-[80vw]  absolute sm:top-[50%] top-[10%]  left-[50%] translate-x-[-50%] sm:translate-y-[-50%] z-[102] border border-gray-300 bg-white trnaslate-y-[-40%]">
      <div className="w-full h-full relative">
        {modalIsLoading && <LoadingFeedbackModal />}
        <div className="absolute top-0 -right-4 translate-x-[100%] bg-white z-[1] flex flex-col gap-3">
          {isModalInvalid.isInvalid && <ValidationFeedbackModal />}
          {modalGuide.isUnguided && (
            <GuideModal unreadGuideId={modalGuide.guideId} />
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

export default CenterContainerWide;
