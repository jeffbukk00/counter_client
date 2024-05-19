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
        <>
          <div
            className="w-full h-full flex justify-center"
            onMouseOver={showRemoveButton}
            onMouseOut={hideRemoveButton}
          >
            <div
              className="w-9/10 h-[55%] mt-10 pt-3 pb-2 px-2 border border-gray-300 overflow-y-scroll scrollbar-sm"
              onMouseOver={showEditButton}
              onMouseOut={hideEditButton}
            >
              <p className="text-xs whitespace-pre-wrap">
                {motivationTextData?.text}
                {isEditButtonVisible && (
                  <MotivationTextEditButton openEditPhase={openEditPhase} />
                )}
              </p>
            </div>
          </div>
          {(isRemoveButtonVisible || isEditButtonVisible) && (
            <MotivationTextRemoveButton
              boxData={boxData}
              motivationTextId={motivationTextId}
              showRemoveButton={showRemoveButton}
              hideRemoveButton={hideRemoveButton}
            />
          )}
        </>
      )}
    </>
  );
};

export default MotivationText;
