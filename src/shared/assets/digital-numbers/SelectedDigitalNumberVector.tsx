import Zero from "./Zero";
import One from "./One";
import Two from "./Two";
import Three from "./Three";
import Four from "./Four";
import Five from "./Five";
import Six from "./Six";
import Seven from "./Seven";
import Eight from "./Eight";
import Nine from "./Nine";

const SelectedDigitalNumberVector = ({
  number,
  classes,
}: {
  number: number;
  classes: string;
}) => {
  switch (number) {
    case 0:
      return <Zero classes={classes} />;
    case 1:
      return <One classes={classes} />;
    case 2:
      return <Two classes={classes} />;
    case 3:
      return <Three classes={classes} />;
    case 4:
      return <Four classes={classes} />;
    case 5:
      return <Five classes={classes} />;
    case 6:
      return <Six classes={classes} />;
    case 7:
      return <Seven classes={classes} />;
    case 8:
      return <Eight classes={classes} />;
    case 9:
      return <Nine classes={classes} />;
    default:
      return null;
  }
};

export default SelectedDigitalNumberVector;
