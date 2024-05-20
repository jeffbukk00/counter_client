import LoginError from "./LoginError";
import SampleCounter from "./SampleCounter";
import StartAction from "./StartAction";

const Action = () => {
  return (
    <div className="flex flex-col items-center relative">
      <LoginError />
      <StartAction />
      <SampleCounter />
    </div>
  );
};

export default Action;
