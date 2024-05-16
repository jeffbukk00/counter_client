import { useState } from "react";

import { downloadConstants } from "./constants";

import useNavigator from "@/components/ui/navigator/hooks/useNavigator";

import PasteShareLinkPhase from "./PasteShareLinkPhase";
import ConfirmDownloadPhase from "./ConfirmDownloadPhase";
import ReconfirmDownloadPhase from "./ReconfirmDownloadPhase";
import useModalGuide from "@/components/ui/user-feedback/guide/hooks/useModalGuide";
import { guideConstants } from "@/components/ui/user-feedback/guide/constants";

const DownloadShareLinkPhase = ({ closeModal }: { closeModal: () => void }) => {
  useModalGuide(guideConstants.guideIds["guideId12"]);

  const [downloadLink, setDownloadLink] = useState("");
  const [username, setUsername] = useState("");

  const { currentPhase, gotoNextPhase } = useNavigator(
    downloadConstants.downloadPhase.firstPhase,
    downloadConstants.downloadPhase.lastPhase
  );

  const updateDownloadLink = (downloadLink: string) =>
    setDownloadLink(downloadLink);
  const updateUsername = (username: string) => setUsername(username);

  return (
    <>
      {currentPhase === 0 && (
        <PasteShareLinkPhase
          gotoNextPhase={gotoNextPhase}
          updateDownloadLink={updateDownloadLink}
          updateUsername={updateUsername}
        />
      )}
      {currentPhase === 1 && downloadLink.length > 0 && (
        <ConfirmDownloadPhase
          username={username}
          gotoNextPhase={gotoNextPhase}
          closeModal={closeModal}
        />
      )}
      {currentPhase === 2 && downloadLink.length > 0 && (
        <ReconfirmDownloadPhase
          username={username}
          downloadLink={downloadLink}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default DownloadShareLinkPhase;
