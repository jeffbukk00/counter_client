import StartCreationButton from "@/components/ui/creator/StartCreationButton";

const MotivationLinkCreationStart = ({
  startCreation,
}: {
  startCreation: () => void;
}) => {
  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-9/10 h-2/3 mt-10 flex justify-center items-center border border-gray-300">
        <StartCreationButton
          startCreation={startCreation}
          classes="w-6 h-6 inline-block"
          hover="p-1"
        />
      </div>
    </div>
  );
};

export default MotivationLinkCreationStart;
