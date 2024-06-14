import { HasChildren } from "@/shared/types";

import useNotBoxLoadingContext from "@/contexts/loading/not-box-loading/hooks/useNotBoxLoadingContext";
import useNotBoxValidationContext from "@/contexts/feedback/validation/not-box-validation/hooks/useNotBoxValidationContext";
import useNotBoxGuideContext from "@/contexts/feedback/guide/not-box-guide/hooks/useNotBoxGuideContext";

import LoadingFeedbackModal from "../user-feedback/loading/LoadingFeedbackModal";
import ValidationFeedbackModal from "../user-feedback/validation/ValidationFeedbackModal";
import GuideModal from "../user-feedback/guide/GuideModal";

// modal에 대한 컨테이너 역할을 하는 컴포넌트.
const CenterContainer = ({ children }: HasChildren) => {
  // modal에서 호출한 비동기 요청이 로딩 상태인지 확인.
  const { modalIsLoading } = useNotBoxLoadingContext();
  // modal에서 유효하지 않은 유저 입력이 발생했는지 확인.
  const { isModalInvalid } = useNotBoxValidationContext();
  // modal에서 현재 띄워야 할 유저 가이드 있는지 확인.
  const { modalGuide } = useNotBoxGuideContext();

  return (
    <div className="xl:w-[30vw] xl:h-[60vh] lg:w-[35vw] lg:h-[60vh] md:w-[45vw] md:h-[60vh] sm:w-[60vw] sm:h-[60vh] w-[75vw] h-[60vh] absolute top-[50%] left-[50%] z-[102]  translate-x-[-50%] translate-y-[-50%] border border-gray-300 bg-white">
      <div className="w-full h-full relative">
        {modalIsLoading && <LoadingFeedbackModal />}
        <div className="absolute lg:top-0 lg:-right-4 lg:translate-x-[100%] lg:translate-y-0 -bottom-1 translate-y-[100%] bg-white z-[1] flex flex-col gap-3 w-full">
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

export default CenterContainer;
