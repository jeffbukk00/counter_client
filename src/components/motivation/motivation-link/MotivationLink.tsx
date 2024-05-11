import { useState } from "react";

import { BoxDataType } from "../types";

import useQueryMotivationLink from "./hooks/http/useQueryMotivationLink";

import MotivationLinkEditPhase from "./MotivationLinkEditPhase";
import MotivationLinkEditButton from "./MotivationLinkEditButton";
import CopyMotivationLinkPart from "./CopyMotivationLinkPart";
import MotivationLinkRemoveButton from "./MotivationLinkRemoveButton";

const MotivationLink = ({
  boxData,
  motivationLinkId,
}: {
  boxData: BoxDataType;
  motivationLinkId: string;
}) => {
  const [isEditPhase, setisEditPhase] = useState(false);
  const [isEditButtonVisible, setIsEditButtonVisible] = useState(false);
  const [isRemoveButtonVisible, setIsRemoveButtonVisible] = useState(false);

  const { motivationLinkData, isLoading } =
    useQueryMotivationLink(motivationLinkId);

  const openEditPhase = () => setisEditPhase(true);
  const closeEditPhase = () => setisEditPhase(false);
  const showEditButton = () => setIsEditButtonVisible(true);
  const hideEditButton = () => setIsEditButtonVisible(false);
  const showRemoveButton = () => setIsRemoveButtonVisible(true);
  const hideRemoveButton = () => setIsRemoveButtonVisible(false);

  if (isLoading) return <p>모티베이션 링크를 요청 중입니다...</p>;

  return (
    <>
      {isEditPhase && (
        <MotivationLinkEditPhase
          motivationLinkId={motivationLinkId}
          motivationLinkData={motivationLinkData!}
          closeEditPhase={closeEditPhase}
        />
      )}
      {!isEditPhase && (
        <div
          className="border w-full h-20"
          onMouseOver={showRemoveButton}
          onMouseOut={hideRemoveButton}
        >
          <div
            className="border"
            onMouseOver={showEditButton}
            onMouseOut={hideEditButton}
          >
            <p>{motivationLinkData!.title}</p>
            {isEditButtonVisible && (
              <MotivationLinkEditButton openEditPhase={openEditPhase} />
            )}
          </div>
          <CopyMotivationLinkPart link={motivationLinkData!.link} />
          {(isRemoveButtonVisible || isEditButtonVisible) && (
            <MotivationLinkRemoveButton
              boxData={boxData}
              motivationLinkId={motivationLinkId}
            />
          )}
        </div>
      )}
    </>
  );
};

export default MotivationLink;
