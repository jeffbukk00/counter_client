import { useState } from "react";

import { sharingConstants } from "./constants";

import CloseModalButton from "../ui/modal/CloseModalButton";
import SelectSharingTypePhase from "./SelectSharingTypePhase";
import UploadShareLinkPhase from "./upload/UploadShareLinkPhase";
import DownloadShareLinkPhase from "./download/DownloadShareLinkPhase";

const SharingPhase = ({ closeModal }: { closeModal: () => void }) => {
  const [sharingType, setSharingType] = useState(
    sharingConstants.sharingType.default
  );

  const changeSharingType = (changedSharingType: number) =>
    setSharingType(changedSharingType);

  return (
    <>
      <CloseModalButton closeModal={closeModal} />
      {sharingType === sharingConstants.sharingType.default && (
        <SelectSharingTypePhase changeSharingType={changeSharingType} />
      )}
      {sharingType === sharingConstants.sharingType.upload && (
        <UploadShareLinkPhase closeModal={closeModal} />
      )}
      {sharingType === sharingConstants.sharingType.download && (
        <DownloadShareLinkPhase />
      )}
    </>
  );
};

export default SharingPhase;
