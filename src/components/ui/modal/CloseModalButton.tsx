import HoverWrapper from "@/components/styles/HoverWrapper";
import CloseVector from "../../../shared/assets/CloseVector";

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
