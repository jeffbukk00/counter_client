import useNotBoxLoadingContext from "@/contexts/loading/not-box-loading/hooks/useNotBoxLoadingContext";
import { HasChildren } from "@/shared/types";
import LoadingFeedbackModal from "../user-feedback/loading/LoadingFeedbackModal";
import useNotBoxValidationContext from "@/contexts/feedback/validation/not-box-validation/hooks/useNotBoxValidationContext";
import ValidationFeedbackModal from "../user-feedback/validation/ValidationFeedbackModal";
import useNotBoxGuideContext from "@/contexts/feedback/guide/not-box-guide/hooks/useNotBoxGuideContext";
import GuideModal from "../user-feedback/guide/GuideModal";

const CenterContainer = ({ children }: HasChildren) => {
  const { modalIsLoading } = useNotBoxLoadingContext();
  const { isModalInvalid } = useNotBoxValidationContext();
  const { modalGuide } = useNotBoxGuideContext();

  return (
    <div className="xl:w-[30vw] xl:h-[60vh] lg:w-[35vw] lg:h-[60vh] md:w-[45vw] md:h-[60vh] sm:w-[60vw] sm:h-[60vh] w-[75vw] h-[60vh] absolute top-[50%] left-[50%] z-[102]  translate-x-[-50%] translate-y-[-50%] border border-gray-300 bg-white">
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

export default CenterContainer;
