import { AsyncErrorContextProvider } from "@/contexts/async-error/AsyncErrorContext";
import { BoxGuideContextProvider } from "@/contexts/feedback/guide/box-guide/BoxGuideContext";
import { NotBoxGuideContextProvider } from "@/contexts/feedback/guide/not-box-guide/NotBoxGuideContext";
import { BoxValidationContextProvider } from "@/contexts/feedback/validation/box-validation/BoxValidationContext";
import { NotBoxValidationContextProvider } from "@/contexts/feedback/validation/not-box-validation/NotBoxValidationContext";
import { BoxLoadingContextProvider } from "@/contexts/loading/box-loading/BoxLoadingContext";
import { NotBoxLoadingContextProvider } from "@/contexts/loading/not-box-loading/NotBoxLoadingContext";
import { HasChildren } from "@/shared/types";

const UserFeedbackContextProviders = ({ children }: HasChildren) => {
  return (
    <AsyncErrorContextProvider>
      <NotBoxLoadingContextProvider>
        <BoxLoadingContextProvider>
          <NotBoxValidationContextProvider>
            <NotBoxGuideContextProvider>
              <BoxValidationContextProvider>
                <BoxGuideContextProvider> {children}</BoxGuideContextProvider>
              </BoxValidationContextProvider>
            </NotBoxGuideContextProvider>
          </NotBoxValidationContextProvider>
        </BoxLoadingContextProvider>
      </NotBoxLoadingContextProvider>
    </AsyncErrorContextProvider>
  );
};

export default UserFeedbackContextProviders;
