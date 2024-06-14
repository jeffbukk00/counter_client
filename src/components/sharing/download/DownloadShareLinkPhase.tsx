import { useState } from "react";

import { downloadConstants } from "./constants";
import { guideConstants } from "@/components/ui/user-feedback/guide/constants";

import useNavigator from "@/components/ui/navigator/hooks/useNavigator";
import useModalGuide from "@/components/ui/user-feedback/guide/hooks/useModalGuide";

import PasteShareLinkPhase from "./PasteShareLinkPhase";
import ConfirmDownloadPhase from "./ConfirmDownloadPhase";
import ReconfirmDownloadPhase from "./ReconfirmDownloadPhase";

// sharing 타입이 download인 컴포넌트.
// 유저가 공유 받은 shareLink를 붙여 넣고, 그것의 유효성을 검사하고, 최종적으로 shareLink에 저장 된 bucket을 다운로드 받음.
// 여러 단계의 페이즈들로 나누어짐.
const DownloadShareLinkPhase = ({ closeModal }: { closeModal: () => void }) => {
  // 유저가 화면 상에서 이 컴포넌트를 보게 되었을 때, 해당하는 가이드를 동반하여 표시하기 위해 호출.
  useModalGuide(guideConstants.guideIds["guideId12"]);

  // 유저가 다운로드 받을 shareLink를 관리하는 상태.
  const [downloadLink, setDownloadLink] = useState("");

  // 다운로드를 요청한 유저의 이름을 관리하는 상태.
  const [username, setUsername] = useState("");

  // 네비게이터 역할을 하는 상태를 관리하는 커스텀 훅.
  // 네비게이터란 연결 된 컴포넌트 간 번호를 부여하여, 버튼 클릭에 따라 앞뒤 컴포넌트로 이동할 수 있게 만드는 기능.
  const { currentPhase, gotoNextPhase } = useNavigator(
    downloadConstants.downloadPhase.firstPhase,
    downloadConstants.downloadPhase.lastPhase
  );

  // 유저가 다운로드 받을 shareLink를 관리하는 상태를 업데이트 하는 함수.
  const updateDownloadLink = (downloadLink: string) =>
    setDownloadLink(downloadLink);

  // 다운로드를 요청한 유저의 이름을 관리하는 상태를 업데이트 하는 함수.
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
