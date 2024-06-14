import HoverWrapper from "@/components/styles/HoverWrapper";
import EditControlVector from "@/components/ui/control/assets/EditControlVector";

// 클릭하면, motivationText를 수정하는 페이즈를 여는 버튼 컴포넌트.
const MotivationTextEditButton = ({
  openEditPhase,
}: {
  openEditPhase: () => void;
}) => {
  return (
    <HoverWrapper classes="inline-block p-[1px]">
      <button
        onClick={
          // motivationText를 수정하는 페이즈를 연다.
          openEditPhase
        }
        className="flex justify-center items-center"
      >
        <EditControlVector classes="inline-block w-5 h-5" />
      </button>
    </HoverWrapper>
  );
};

export default MotivationTextEditButton;
