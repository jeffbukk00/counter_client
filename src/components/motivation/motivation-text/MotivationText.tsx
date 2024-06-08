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

  const [areButtonsVisible, setAreButtonsVisible] = useState(false);

  const { motivationTextData, isLoading, isFetching } =
    useQueryMotivationText(motivationTextId);

  const openEditPhase = () => setisEditPhase(true);
  const closeEditPhase = () => setisEditPhase(false);

  const showButtons = () => setAreButtonsVisible(true);
  const hideButtons = () => setAreButtonsVisible(false);

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
        <>
          <div
            className="w-full h-full flex justify-center"
            onMouseOver={showButtons}
            onMouseOut={hideButtons}
          >
            <div className="w-9/10 h-[55%] mt-10 pt-3 pb-2 px-2 border border-gray-300 overflow-y-scroll">
              <p className="text-xs whitespace-pre-wrap break-words">
                {motivationTextData?.text}
              </p>
            </div>
          </div>
          {areButtonsVisible && (
            <div
              className="absolute bottom-1 left-0 w-full flex justify-center items-center gap-1"
              onMouseOver={showButtons}
              onMouseOut={hideButtons}
            >
              <MotivationTextEditButton openEditPhase={openEditPhase} />
              <MotivationTextRemoveButton
                boxData={boxData}
                motivationTextId={motivationTextId}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default MotivationText;
