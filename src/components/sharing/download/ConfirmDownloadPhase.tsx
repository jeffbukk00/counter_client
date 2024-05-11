import { ConfirmDownloadPhasePropsType } from "./type";

import LinkVector from "@/shared/assets/link/LinkVector";

const ConfirmDownloadPhase = ({
  username,
  gotoNextPhase,
  closeModal,
}: ConfirmDownloadPhasePropsType) => {
  return (
    <>
      <p>{username}으로부터의 공유 링크</p>
      <LinkVector classes="w-6 h-6 inline-block" />
      <p>공유 받으시겠습니까?</p>
      <button onClick={gotoNextPhase}>
        <span className="text-positive">네, 공유 받겠습니다</span>
      </button>
      <button onClick={closeModal}>
        <span className="text-negative">아니요, 공유 받지 않겠습니다</span>
      </button>
    </>
  );
};

export default ConfirmDownloadPhase;
