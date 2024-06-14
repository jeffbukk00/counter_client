import HoverWrapper from "@/components/styles/HoverWrapper";
import EditControlVector from "@/components/ui/control/assets/EditControlVector";

// 클릭하면, motivationLink를 수정하는 페이즈를 여는 버튼 컴포넌트.
const MotivationLinkEditButton = ({
  openEditPhase,
}: {
  openEditPhase: () => void;
}) => {
  return (
    <HoverWrapper classes="inline-block p-[1px]">
      <button
        onClick={
          // motivationLink를 수정하는 페이즈를 연다.
          openEditPhase
        }
        className="flex justify-center items-center"
      >
        <EditControlVector classes="w-5 h-5 inline-block" />
      </button>
    </HoverWrapper>
  );
};

export default MotivationLinkEditButton;
