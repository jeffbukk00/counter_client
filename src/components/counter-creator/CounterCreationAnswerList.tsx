import { CounterCreationAnswerListPropsType } from "./types";

const CounterCreationAnswerList = ({
  currentPhase,
  isInLastPhase,
  userAnswers,
}: CounterCreationAnswerListPropsType) => {
  return (
    <ul>
      {!isInLastPhase && currentPhase === 0 && null}
      {!isInLastPhase && currentPhase === 1 && (
        <li>
          <p>{userAnswers.title}</p>
        </li>
      )}
      {!isInLastPhase && currentPhase === 2 && (
        <>
          <li>
            <p>{userAnswers.title}</p>
          </li>
          <li>
            <p className="bg-negative">{userAnswers.startCount}</p>
          </li>
        </>
      )}
      {isInLastPhase && (
        <>
          <li>
            <p>{userAnswers.title}</p>
          </li>
          <li>
            <p className="bg-negative">{userAnswers.startCount}</p>
          </li>
          <li>
            <p className="bg-positive">{userAnswers.endCount}</p>
          </li>
        </>
      )}
    </ul>
  );
};

export default CounterCreationAnswerList;
