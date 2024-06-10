import HoverWrapper from "@/components/styles/HoverWrapper";
import { ConfirmDownloadPhasePropsType } from "./type";

import LinkVector from "@/shared/assets/link/LinkVector";

const ConfirmDownloadPhase = ({
  username,
  gotoNextPhase,
  closeModal,
}: ConfirmDownloadPhasePropsType) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center relative">
      <div>
        <p className="sm:text-base text-sm">
          "{username}"
          <span className="text-gray-300 sm:text-sm text-xs">
            으로부터의 공유 링크
          </span>
        </p>
      </div>
      <div className="mt-4 mb-8">
        <LinkVector classes="w-8 h-8 inline-block" />
      </div>
      <div>
        <p className="sm:text-base text-sm">공유 받으시겠습니까?</p>
      </div>
      <div className="absolute left-[50%] translate-x-[-50%] bottom-[15%] w-[75%] flex justify-between items-center">
        <HoverWrapper classes="p-1">
          <button onClick={gotoNextPhase}>
            <span className="text-positive sm:text-xs text-[9px]">
              네, 공유 받겠습니다
            </span>
          </button>
        </HoverWrapper>
        <HoverWrapper classes="p-1">
          <button onClick={closeModal}>
            <span className="text-negative sm:text-xs text-[9px]">
              아니요, 공유 받지 않겠습니다
            </span>
          </button>
        </HoverWrapper>
      </div>
    </div>
  );
};

export default ConfirmDownloadPhase;
