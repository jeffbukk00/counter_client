import CloseModalButtonVector from "./assets/CloseModalButtonVector";

const CloseModalButton = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <button onClick={closeModal}>
      <CloseModalButtonVector />
    </button>
  );
};

export default CloseModalButton;
