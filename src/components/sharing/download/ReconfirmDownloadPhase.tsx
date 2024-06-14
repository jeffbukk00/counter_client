import { downloadConstants } from "./constants";
import { ReconfirmDownloadPhasePropsType } from "./type";

import useMutationDownloadFromShareLink from "./hooks/useMutationDownloadFromShareLink";
import useNotBoxLoadingContext from "@/contexts/loading/not-box-loading/hooks/useNotBoxLoadingContext";

import LinkVector from "@/shared/assets/link/LinkVector";
import HoverWrapper from "@/components/styles/HoverWrapper";

// 유저가 shareLink로부터 다운로드 하기 전, 마지막으로 재확인한 뒤에 다운로드를 받는 페이즈.
// 다른 유저로부터의 motivationLink는 100% 안전을 보장할 수 없으므로, 이를 제외해서 다운로드 받을 수 있는 선택지를 둔다.
const ReconfirmDownloadPhase = ({
  username,
  downloadLink,
  closeModal,
}: ReconfirmDownloadPhasePropsType) => {
  // 공유 받은 shareLink로부터 공유된 bucket을 다운로드 받기 위한 비동기 요청을 담고 있는 커스텀 훅.
  const { mutateDownloadFromShareLink } = useMutationDownloadFromShareLink(
    downloadLink,
    closeModal
  );

  // box가 아닌 메인 요소(box-creator, modal)의 로딩 상태에 따른 유저 피드백을 관리하는 커스텀 훅.
  // 여기서는 modal이 로딩 상태로 전환되었을 때, 유저 피드백을 화면 상에 표시하기 위해 호출하는 함수를 반환.
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
              // motivationLink를 포함해서 공유 받음.
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
              // motivationLink를 제외해서 공유 받음.
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
