import { CounterCreationAnswerListPropsType } from "./types";

const CounterCreationAnswerList = ({
  currentPhase,
  isInLastPhase,
  userAnswers,
}: CounterCreationAnswerListPropsType) => {
  return (
    <>
      {!isInLastPhase && (
        <ul className="w-full h-16 flex flex-col justify-end items-center gap-1">
          {!isInLastPhase && currentPhase === 0 && null}
          {!isInLastPhase && currentPhase === 1 && (
            <li className="w-full">
              <p className="text-xs font-light text-gray-300 text-center">
                {userAnswers.title}
              </p>
            </li>
          )}
          {!isInLastPhase && currentPhase === 2 && (
            <>
              <li className="w-full">
                <p className="text-xs font-light text-gray-300 text-center">
                  {userAnswers.title}
                </p>
              </li>

              <li className="w-full bg-negative opacity-20">
                <p className="text-xs font-light text-gray-300 text-center">
                  {userAnswers.startCount}
                </p>
              </li>
            </>
          )}
        </ul>
      )}
      {isInLastPhase && (
        <ul className="w-full h-24 flex flex-col justify-end items-center gap-1">
          <li className="w-full">
            <p className="text-xs  text-gray-300 text-center">
              {userAnswers.title}
            </p>
          </li>
          <li className="w-full bg-negative bg-opacity-20">
            <p className="text-base text-gray-300 text-center">
              {userAnswers.startCount}
            </p>
          </li>
          <li className="w-full bg-positive bg-opacity-20">
            <p className="text-base text-gray-300 text-center">
              {userAnswers.endCount}
            </p>
          </li>
        </ul>
      )}
    </>
  );
};

export default CounterCreationAnswerList;
