import { useState } from "react";

import { uploadConstants } from "./constants";

import useNavigator from "@/components/ui/navigator/hooks/useNavigator";

import CreateShareLinkPhase from "./CreateShareLinkPhase";
import GeneratedShareLinkPhase from "./GeneratedShareLinkPhase";

const UploadShareLinkPhase = ({ closeModal }: { closeModal: () => void }) => {
  const [createdShareLink, setCreatedShareLink] = useState("");

  const { currentPhase, gotoNextPhase } = useNavigator(
    uploadConstants.uploadPhase.first,
    uploadConstants.uploadPhase.last
  );

  const updateCreatedShareLink = (createdShareLink: string) =>
    setCreatedShareLink(createdShareLink);

  return (
    <>
      {currentPhase === 0 && (
        <CreateShareLinkPhase
          gotoNextPhase={gotoNextPhase}
          updateCreatedShareLink={updateCreatedShareLink}
        />
      )}
      {currentPhase === 1 && createdShareLink.length > 0 && (
        <GeneratedShareLinkPhase
          createdShareLink={createdShareLink}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default UploadShareLinkPhase;
