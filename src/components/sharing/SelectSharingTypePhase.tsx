import { sharingConstants } from "./constants";

import DownloadVector from "./assets/DownloadVector";
import UploadVector from "./assets/UploadVector";

const SelectSharingTypePhase = ({
  changeSharingType,
}: {
  changeSharingType: (changedSharingType: number) => void;
}) => {
  return (
    <>
      <button
        onClick={() => changeSharingType(sharingConstants.sharingType.upload)}
      >
        <UploadVector classes="w-6 h-6 inline-block" />
        <span>공유하기</span>
      </button>
      <button
        onClick={() => changeSharingType(sharingConstants.sharingType.download)}
      >
        <DownloadVector classes="w-6 h-6 inline-block" />
        <span>공유받기</span>
      </button>
    </>
  );
};

export default SelectSharingTypePhase;
