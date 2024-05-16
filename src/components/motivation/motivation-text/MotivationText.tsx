import { useState } from "react";

import { MotivationTextPropsType } from "./types";

import useQueryMotivationText from "./hooks/http/useQueryMotivationText";

import MotivationTextEditButton from "./MotivationTextEditButton";
import MotivationTextRemoveButton from "./MotivationTextRemoveButton";
import MotivationTextEditPhase from "./MotivationTextEditPhase";
import LoadingFeedbackBox from "@/components/ui/user-feedback/loading/LoadingFeedbackBox";

const MotivationText = ({
  boxData,
  motivationTextId,
}: MotivationTextPropsType) => {
  const [isEditPhase, setisEditPhase] = useState(false);
  const [isEditButtonVisible, setIsEditButtonVisible] = useState(false);
  const [isRemoveButtonVisible, setIsRemoveButtonVisible] = useState(false);

  const { motivationTextData, isLoading, isFetching } =
    useQueryMotivationText(motivationTextId);

  const openEditPhase = () => setisEditPhase(true);
  const closeEditPhase = () => setisEditPhase(false);
  const showEditButton = () => setIsEditButtonVisible(true);
  const hideEditButton = () => setIsEditButtonVisible(false);
  const showRemoveButton = () => setIsRemoveButtonVisible(true);
  const hideRemoveButton = () => setIsRemoveButtonVisible(false);

  if (isLoading) return <LoadingFeedbackBox />;

  return (
    <>
      {isFetching && <LoadingFeedbackBox />}
      {isEditPhase && (
        <MotivationTextEditPhase
          boxId={boxData.boxId}
          motivationTextId={motivationTextId}
          motivationTextData={motivationTextData!}
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
            <p>{motivationTextData!.text}</p>
            {isEditButtonVisible && (
              <MotivationTextEditButton openEditPhase={openEditPhase} />
            )}
          </div>
          {(isRemoveButtonVisible || isEditButtonVisible) && (
            <MotivationTextRemoveButton
              boxData={boxData}
              motivationTextId={motivationTextId}
            />
          )}
        </div>
      )}
    </>
  );
};

export default MotivationText;
