import { BucketCreationAnswerListPropsType } from "./types";

const BucketCreationAnswerList = ({
  currentPhase,
  isInLastPhase,
  userAnswers,
}: BucketCreationAnswerListPropsType) => {
  return (
    <>
      {!isInLastPhase && currentPhase === 0 && null}
      {isInLastPhase && <p>{userAnswers.title}</p>}
    </>
  );
};

export default BucketCreationAnswerList;
