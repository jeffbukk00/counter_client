import { landingConstants } from "./constants";
import Problem from "./Problem";

const Problems = () => {
  return (
    <div className="flex flex-col justify-evenly items-center h-[100vh] bg-negative bg-opacity-30">
      <Problem type={landingConstants.problemType.first} />
      <Problem type={landingConstants.problemType.second} />
      <Problem type={landingConstants.problemType.third} />
    </div>
  );
};

export default Problems;
