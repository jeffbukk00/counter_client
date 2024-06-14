import { useState } from "react";

import { MotivationTextPropsType } from "./types";

import useQueryMotivationText from "./hooks/http/useQueryMotivationText";

import MotivationTextEditButton from "./MotivationTextEditButton";
import MotivationTextRemoveButton from "./MotivationTextRemoveButton";
import MotivationTextEditPhase from "./MotivationTextEditPhase";
import LoadingFeedbackBox from "@/components/ui/user-feedback/loading/LoadingFeedbackBox";

// 단일 motivationText에 대한 최상위 컴포넌트.
const MotivationText = ({
  boxData,
  motivationTextId,
}: MotivationTextPropsType) => {
  // motivationText를 수정할지 여부를 관리하는 상태.
  const [isEditPhase, setisEditPhase] = useState(false);

  // motivationText를 수정하고 삭제하는 버튼들이 보여질지 여부를 관리하는 상태.
  const [areButtonsVisible, setAreButtonsVisible] = useState(false);

  // 단일 motivationText의 데이터를 불러오는 비동기 요청을 호출하는 커스텀 훅.
  const { motivationTextData, isLoading, isFetching } =
    useQueryMotivationText(motivationTextId);

  // motivationText를 수정하고 삭제하는 버튼들 보여줌.
  const openEditPhase = () => setisEditPhase(true);
  // motivationText를 수정하고 삭제하는 버튼들 숨김.
  const closeEditPhase = () => setisEditPhase(false);

  // motivationText 수정 시작.
  const showButtons = () => setAreButtonsVisible(true);
  // motivationText 수정 종료.
  const hideButtons = () => setAreButtonsVisible(false);

  // 단일 motivationText의 데이터를 불러오는 비동기 요청이 로딩 상태일 때, 유저 피드백.
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
