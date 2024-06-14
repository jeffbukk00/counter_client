// backdrop 컴포넌트.
const BackDrop = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <div
      onClick={closeModal}
      className="w-screen h-screen fixed left-0 top-0 z-[98] bg-white opacity-70"
    ></div>
  );
};

export default BackDrop;
