import { downloadConstants } from "./constants";
import { ReconfirmDownloadPhasePropsType } from "./type";

import useMutationDownloadFromShareLink from "./hooks/useMutationDownloadFromShareLink";

import LinkVector from "@/shared/assets/link/LinkVector";

const ReconfirmDownloadPhase = ({
  username,
  downloadLink,
  closeModal,
}: ReconfirmDownloadPhasePropsType) => {
  const { mutateDownloadFromShareLink, isPending } =
    useMutationDownloadFromShareLink(downloadLink, closeModal);

  if (isPending) return <p>다운로드 중입니다...</p>;

  return (
    <>
      <p>{username}으로부터의 공유 링크</p>
      <LinkVector classes="w-6 h-6 inline-block" />
      <p>
        공유 받을 데이터 중, "모티베이션 링크"는{" "}
        <span className="text-negative">안전하지 않을 수 있습니다</span>
      </p>
      <p>
        공유 하는 유저를 <span className="text-positive">신뢰하신다면,</span>{" "}
        이를 포함해서 공유 받습니다
      </p>
      <p>
        <span className="text-negative">신뢰하시지 않는다면,</span> 이를
        제외해서 공유 받습니다
      </p>
      <button
        onClick={() => {
          mutateDownloadFromShareLink(downloadConstants.downloadType.all);
        }}
      >
        <span className="text-positive">포함해서 공유 받겠습니다</span>
      </button>
      <button
        onClick={() => {
          mutateDownloadFromShareLink(downloadConstants.downloadType.secure);
        }}
      >
        <span className="text-negative">제외해서 공유 받겠습니다</span>
      </button>
    </>
  );
};

export default ReconfirmDownloadPhase;
