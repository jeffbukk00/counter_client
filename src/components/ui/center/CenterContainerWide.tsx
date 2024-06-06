import useNotBoxGuideContext from "@/contexts/feedback/guide/not-box-guide/hooks/useNotBoxGuideContext";
import useNotBoxValidationContext from "@/contexts/feedback/validation/not-box-validation/hooks/useNotBoxValidationContext";
import useNotBoxLoadingContext from "@/contexts/loading/not-box-loading/hooks/useNotBoxLoadingContext";
import { HasChildren } from "@/shared/types";
import LoadingFeedbackModal from "../user-feedback/loading/LoadingFeedbackModal";
import ValidationFeedbackModal from "../user-feedback/validation/ValidationFeedbackModal";
import GuideModal from "../user-feedback/guide/GuideModal";

const CenterContainerWide = ({ children }: HasChildren) => {
  const { modalIsLoading } = useNotBoxLoadingContext();
  const { isModalInvalid } = useNotBoxValidationContext();
  const { modalGuide } = useNotBoxGuideContext();

  return (
    <div className="w-[80vw] h-[80vh] absolute top-[10vh] left-[10vw] z-[102] border border-gray-300 bg-white">
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
