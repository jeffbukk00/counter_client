import CloseVector from "../../../shared/assets/CloseVector";

const CloseModalButton = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <button onClick={closeModal}>
      <CloseVector classes="w-6 h-6 inline-block" />
    </button>
  );
};

export default CloseModalButton;
