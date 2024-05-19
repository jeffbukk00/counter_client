import HoverWrapper from "@/components/styles/HoverWrapper";
import CloseVector from "../../../shared/assets/CloseVector";

const CloseModalButton = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <HoverWrapper classes="p-1">
      <button onClick={closeModal}>
        <CloseVector classes="w-6 h-6 inline-block" />
      </button>
    </HoverWrapper>
  );
};

export default CloseModalButton;
