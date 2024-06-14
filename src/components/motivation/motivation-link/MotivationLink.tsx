import { useState } from "react";

import { BoxDataType } from "../types";

import useQueryMotivationLink from "./hooks/http/useQueryMotivationLink";

import MotivationLinkEditPhase from "./MotivationLinkEditPhase";
import MotivationLinkEditButton from "./MotivationLinkEditButton";
import CopyMotivationLinkPart from "./CopyMotivationLinkPart";
import MotivationLinkRemoveButton from "./MotivationLinkRemoveButton";
import LoadingFeedbackBox from "@/components/ui/user-feedback/loading/LoadingFeedbackBox";

// 단일 motivationLink에 대한 최상위 컴포넌트.
const MotivationLink = ({
  boxData,
  motivationLinkId,
}: {
  boxData: BoxDataType;
  motivationLinkId: string;
}) => {
  // motivationLink를 수정할지 여부를 관리하는 상태.
  const [isEditPhase, setisEditPhase] = useState(false);

  // motivationLink를 수정하고 삭제하는 버튼들이 보여질지 여부를 관리하는 상태.
  const [areButtonsVisible, setAreButtonsVisible] = useState(false);

  // 단일 motivationLink의 데이터를 불러오는 비동기 요청을 호출하는 커스텀 훅.
  const { motivationLinkData, isLoading, isFetching } =
    useQueryMotivationLink(motivationLinkId);

  // motivationLink를 수정하고 삭제하는 버튼들 보여줌.
  const showButtons = () => setAreButtonsVisible(true);
  // motivationLink를 수정하고 삭제하는 버튼들 숨김.
  const hideButtons = () => setAreButtonsVisible(false);

  // motivationLink 수정 시작.
  const openEditPhase = () => setisEditPhase(true);
  // motivationLink 수정 종료.
  const closeEditPhase = () => setisEditPhase(false);

  // 단일 motivationLink의 데이터를 불러오는 비동기 요청이 로딩 상태일 때, 유저 피드백.
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
