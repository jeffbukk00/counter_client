import { sharingConstants } from "./constants";

import DownloadVector from "./assets/DownloadVector";
import UploadVector from "./assets/UploadVector";

import useModalGuide from "../ui/user-feedback/guide/hooks/useModalGuide";
import { guideConstants } from "../ui/user-feedback/guide/constants";
import HoverWrapper from "../styles/HoverWrapper";

const SelectSharingTypePhase = ({
  changeSharingType,
}: {
  changeSharingType: (changedSharingType: number) => void;
}) => {
  useModalGuide(guideConstants.guideIds["guideId10"]);

  return (
    <div className="w-full h-full">
      <div className="w-full h-1/2 flex justify-center items-center">
        <HoverWrapper classes="p-2">
          <button
            onClick={() =>
              changeSharingType(sharingConstants.sharingType.upload)
            }
            className="flex justify-center items-center gap-2"
          >
            <UploadVector classes="w-10 h-10 inline-block" />
            <span>공유하기</span>
          </button>
        </HoverWrapper>
      </div>
      <div className="w-full h-1/2 flex justify-center items-center">
        <HoverWrapper classes="p-2">
          <button
            onClick={() =>
              changeSharingType(sharingConstants.sharingType.download)
            }
            className="flex justify-center items-center gap-2"
          >
            <DownloadVector classes="w-10 h-10 inline-block" />
            <span>공유받기</span>
          </button>
        </HoverWrapper>
      </div>
    </div>
  );
};

export default SelectSharingTypePhase;
