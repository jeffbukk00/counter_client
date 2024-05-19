import StartCreationButton from "../ui/creator/StartCreationButton";
import { guideConstants } from "../ui/user-feedback/guide/constants";
import useBoxCreatorGuide from "../ui/user-feedback/guide/hooks/useBoxCreatorGuide";

const CounterCreationStart = ({
  startCreation,
}: {
  startCreation: () => void;
}) => {
  useBoxCreatorGuide(guideConstants.guideIds["guideId4"]);

  return (
    <StartCreationButton
      startCreation={startCreation}
      classes="w-8 h-8 inline-block"
      hover="p-2"
    />
  );
};

export default CounterCreationStart;
