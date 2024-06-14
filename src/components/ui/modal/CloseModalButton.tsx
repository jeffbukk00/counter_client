import HoverWrapper from "@/components/styles/HoverWrapper";
import CloseVector from "../../../shared/assets/CloseVector";

// 클릭하면, modal을 닫는 버튼 컴포넌트.
const CloseModalButton = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <HoverWrapper classes="p-1">
      <button onClick={closeModal}>
        <CloseVector classes="sm:w-6 sm:h-6 w-4 h-4 inline-block" />
      </button>
    </HoverWrapper>
  );
};

export default CloseModalButton;
