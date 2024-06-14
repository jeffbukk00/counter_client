import { BoxGuideContextProvider } from "@/contexts/feedback/guide/box-guide/BoxGuideContext";
import { NotBoxGuideContextProvider } from "@/contexts/feedback/guide/not-box-guide/NotBoxGuideContext";
import { BoxValidationContextProvider } from "@/contexts/feedback/validation/box-validation/BoxValidationContext";
import { NotBoxValidationContextProvider } from "@/contexts/feedback/validation/not-box-validation/NotBoxValidationContext";
import { BoxLoadingContextProvider } from "@/contexts/loading/box-loading/BoxLoadingContext";
import { NotBoxLoadingContextProvider } from "@/contexts/loading/not-box-loading/NotBoxLoadingContext";

import { HasChildren } from "@/shared/types";

// 유저 피드백을 위한 context provider들을 제공.
// 유저 피드백 종류: 비동기 요청 로딩, 유효성 검사 실패, 유저 가이드.
const UserFeedbackContextProviders = ({ children }: HasChildren) => {
  return (
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
  );
};

export default UserFeedbackContextProviders;
