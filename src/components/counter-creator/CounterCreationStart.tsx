import StartCreationButton from "../ui/creator/StartCreationButton";
import { guideConstants } from "../ui/user-feedback/guide/constants";
import useBoxCreatorGuide from "../ui/user-feedback/guide/hooks/useBoxCreatorGuide";

const CounterCreationStart = ({
  startCreation,
}: {
  startCreation: () => void;
}) => {
  useBoxCreatorGuide(guideConstants.guideIds["guideId4"]);

  return <StartCreationButton startCreation={startCreation} />;
};

export default CounterCreationStart;
