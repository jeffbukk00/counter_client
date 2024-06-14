import { useState } from "react";

import { uploadConstants } from "./constants";
import { guideConstants } from "@/components/ui/user-feedback/guide/constants";

import useNavigator from "@/components/ui/navigator/hooks/useNavigator";
import useModalGuide from "@/components/ui/user-feedback/guide/hooks/useModalGuide";

import CreateShareLinkPhase from "./CreateShareLinkPhase";
import GeneratedShareLinkPhase from "./GeneratedShareLinkPhase";

// upload 타입의 sharing 컴포넌트.
// shareLink를 생성하고 서버에 업로드.
// 여러 단계의 페이즈들로 나누어짐.
const UploadShareLinkPhase = ({ closeModal }: { closeModal: () => void }) => {
  // 유저가 화면 상에서 이 컴포넌트를 보게 되었을 때, 해당하는 가이드를 동반하여 표시하기 위해 호출.
  useModalGuide(guideConstants.guideIds["guideId11"]);

  // 생성 된 shareLink를 관리하는 상태.
  const [createdShareLink, setCreatedShareLink] = useState("");

  // 네비게이터 역할을 하는 상태를 관리하는 커스텀 훅.
  // 네비게이터란 연결 된 컴포넌트 간 번호를 부여하여, 버튼 클릭에 따라 앞뒤 컴포넌트로 이동할 수 있게 만드는 기능.
  const { currentPhase, gotoNextPhase } = useNavigator(
    uploadConstants.uploadPhase.first,
    uploadConstants.uploadPhase.last
  );

  // 생성 된 shareLink를 관리하는 상태를 업데이트 하는 함수.
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
