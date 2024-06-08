import { useState } from "react";

import { BoxDataType } from "../types";

import useQueryMotivationLink from "./hooks/http/useQueryMotivationLink";

import MotivationLinkEditPhase from "./MotivationLinkEditPhase";
import MotivationLinkEditButton from "./MotivationLinkEditButton";
import CopyMotivationLinkPart from "./CopyMotivationLinkPart";
import MotivationLinkRemoveButton from "./MotivationLinkRemoveButton";
import LoadingFeedbackBox from "@/components/ui/user-feedback/loading/LoadingFeedbackBox";

const MotivationLink = ({
  boxData,
  motivationLinkId,
}: {
  boxData: BoxDataType;
  motivationLinkId: string;
}) => {
  const [isEditPhase, setisEditPhase] = useState(false);

  const [areButtonsVisible, setAreButtonsVisible] = useState(false);

  const { motivationLinkData, isLoading, isFetching } =
    useQueryMotivationLink(motivationLinkId);

  const openEditPhase = () => setisEditPhase(true);
  const closeEditPhase = () => setisEditPhase(false);

  const showButtons = () => setAreButtonsVisible(true);
  const hideButtons = () => setAreButtonsVisible(false);

  if (isLoading) return <LoadingFeedbackBox />;

  return (
    <>
      {isFetching && <LoadingFeedbackBox />}
      {isEditPhase && (
        <MotivationLinkEditPhase
          boxId={boxData.boxId}
          motivationLinkId={motivationLinkId}
          motivationLinkData={motivationLinkData!}
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
            <div className="w-9/10 h-[55%] mt-10  border border-gray-300 flex flex-col justify-center items-center gap-1 relative">
              <div className="absolute top-3 left-[50%] translate-x-[-50%]">
                <p className="text-xs">{motivationLinkData!.title} </p>
              </div>
              <div className="mt-5 flex flex-col justify-center items-center gap-[2px]">
                <CopyMotivationLinkPart
                  link={motivationLinkData!.link}
                  fontSize="text-[0.5rem]"
                />
              </div>
            </div>
          </div>
          {areButtonsVisible && (
            <div
              className="absolute bottom-1 left-0 w-full flex justify-center items-center gap-1"
              onMouseOver={showButtons}
              onMouseOut={hideButtons}
            >
              <MotivationLinkEditButton openEditPhase={openEditPhase} />{" "}
              <MotivationLinkRemoveButton
                boxData={boxData}
                motivationLinkId={motivationLinkId}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default MotivationLink;
