import { downloadConstants } from "./constants";
import { ReconfirmDownloadPhasePropsType } from "./type";

import useMutationDownloadFromShareLink from "./hooks/useMutationDownloadFromShareLink";

import LinkVector from "@/shared/assets/link/LinkVector";
import useNotBoxLoadingContext from "@/contexts/loading/not-box-loading/hooks/useNotBoxLoadingContext";
import HoverWrapper from "@/components/styles/HoverWrapper";

const ReconfirmDownloadPhase = ({
  username,
  downloadLink,
  closeModal,
}: ReconfirmDownloadPhasePropsType) => {
  const { mutateDownloadFromShareLink } = useMutationDownloadFromShareLink(
    downloadLink,
    closeModal
  );
  const { activateModal } = useNotBoxLoadingContext();

  return (
    <div className="w-full h-full flex flex-col justify-start items-center relative">
      <div className="flex flex-col justify-center items-center mt-10">
        <div>
          <p className="sm:text-base text-sm">
            "{username}"
            <span className="sm:text-sm text-xs text-gray-300">
              으로부터의 공유 링크
            </span>
          </p>
        </div>
        <div className="mt-4 mb-8">
          <LinkVector classes="w-8 h-8 inline-block" />
        </div>
        <div>
          <p className="sm:text-sm text-[10px]">
            <span className="sm:text-xs text-[8px]">공유 받을 데이터 중, </span>
            <span className="text-negative">"모티베이션 링크"</span>
            <span className="sm:text-xs text-[8px]">는 </span>
            <span className="text-negative">"안전하지 않을 수 있습니다"</span>
          </p>
        </div>
      </div>

      <div className="w-75% flex flex-col justify-center items-center gap-4 mt-16">
        <div>
          <p className="sm:text-sm text-[10px]">
            <span className="sm:text-xs text-[8px]">공유 하는 유저를 </span>
            <span className="text-positive">"신뢰하신다면"</span>
            <span className="sm:text-xs text-[8px]"> 이를 </span>
            <span className="text-positive">"포함"</span>
            <span className="sm:text-xs text-[8px]">해서 공유 받습니다</span>
          </p>
        </div>
        <div>
          <p className="sm:text-sm text-[10px]">
            <span className="text-negative">"신뢰하시지 않는다면"</span>
            <span className="sm:text-xs text-[8px]"> 이를 </span>
            <span className="text-negative">"제외"</span>
            <span className="sm:text-xs text-[8px]">해서 공유 받습니다</span>
          </p>
        </div>
      </div>

      <div className="absolute left-[50%] translate-x-[-50%] bottom-[15%] w-[75%] flex justify-between items-center">
        <HoverWrapper classes="p-1">
          <button
            onClick={() => {
              activateModal();
              mutateDownloadFromShareLink(downloadConstants.downloadType.all);
            }}
          >
            <span className="text-positive sm:text-xs text-[9px]">
              포함해서 공유 받겠습니다
            </span>
          </button>
        </HoverWrapper>
        <HoverWrapper classes="p-1">
          <button
            onClick={() => {
              activateModal();
              mutateDownloadFromShareLink(
                downloadConstants.downloadType.secure
              );
            }}
          >
            <span className="text-negative sm:text-xs text-[9px]">
              제외해서 공유 받겠습니다
            </span>
          </button>
        </HoverWrapper>
      </div>
    </div>
  );
};

export default ReconfirmDownloadPhase;
