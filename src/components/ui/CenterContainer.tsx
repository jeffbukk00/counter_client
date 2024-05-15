import useNotBoxLoadingContext from "@/contexts/loading/not-box-loading/hooks/useNotBoxLoadingContext";
import { HasChildren } from "@/shared/types";
import LoadingFeedbackModal from "./user-feedback/loading/LoadingFeedbackModal";
import useNotBoxValidationContext from "@/contexts/feedback/validation/not-box-validation/hooks/useNotBoxValidationContext";
import ValidationFeedbackModal from "./user-feedback/validation/ValidationFeedbackModal";
import useNotBoxGuideContext from "@/contexts/feedback/guide/not-box-guide/hooks/useNotBoxGuideContext";
import GuideModal from "./user-feedback/guide/GuideModal";

const CenterContainer = ({ children }: HasChildren) => {
  const { modalIsLoading } = useNotBoxLoadingContext();
  const { isModalInvalid } = useNotBoxValidationContext();
  const { modalGuide } = useNotBoxGuideContext();

  return (
    <div className="w-30vw h-60vh absolute top-[20vh] left-[35vw] z-[100] border-black border-2">
      {modalIsLoading && <LoadingFeedbackModal />}
      {isModalInvalid.isInvalid && <ValidationFeedbackModal />}
      {modalGuide.isUnguided && (
        <GuideModal unreadGuideId={modalGuide.guideId} />
      )}
      {children}
    </div>
  );
};

export default CenterContainer;
