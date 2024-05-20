import { landingConstants } from "./constants";
import Solution from "./Solution";

const Solutions = () => {
  return (
    <div className="flex flex-col justify-evenly items-center bg-positive bg-opacity-30">
      <Solution type={landingConstants.solutionType.first} />
      <Solution type={landingConstants.solutionType.second} />
      <Solution type={landingConstants.solutionType.third} />
    </div>
  );
};

export default Solutions;
