import { useState } from "react";

import { sharingConstants } from "./constants";

import CloseModalButton from "../ui/modal/CloseModalButton";
import SelectSharingTypePhase from "./SelectSharingTypePhase";
import UploadShareLinkPhase from "./upload/UploadShareLinkPhase";
import DownloadShareLinkPhase from "./download/DownloadShareLinkPhase";

// sharing 기능의 최상위 컴포넌트.
const SharingPhase = ({ closeModal }: { closeModal: () => void }) => {
  // 선택한 sharing 타입을 관리하는 상태.
  const [sharingType, setSharingType] = useState(
    sharingConstants.sharingType.default
  );

  // 선택한 sharing 타입을 관리하는 상태를 업데이트 하는 함수.
  const changeSharingType = (changedSharingType: number) =>
    setSharingType(changedSharingType);

  return (
    <>
      <span className="absolute top-2 right-2 z-[1]">
        <CloseModalButton closeModal={closeModal} />
      </span>
      {sharingType === sharingConstants.sharingType.default && (
        <SelectSharingTypePhase changeSharingType={changeSharingType} />
      )}
      {sharingType === sharingConstants.sharingType.upload && (
        <UploadShareLinkPhase closeModal={closeModal} />
      )}
      {sharingType === sharingConstants.sharingType.download && (
        <DownloadShareLinkPhase closeModal={closeModal} />
      )}
    </>
  );
};

export default SharingPhase;
