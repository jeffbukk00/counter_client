import { BucketCreationAnswerListPropsType } from "./types";

const BucketCreationAnswerList = ({
  currentPhase,
  isInLastPhase,
  userAnswers,
}: BucketCreationAnswerListPropsType) => {
  return (
    <>
      {!isInLastPhase && currentPhase === 0 && null}
      {isInLastPhase && (
        <ul className="w-full h-[5.5rem] flex flex-col justify-end items-center gap-1">
          <li className="w-full">
            <p className="text-base text-gray-300  text-center">
              {userAnswers.title}
            </p>
          </li>
        </ul>
      )}
    </>
  );
};

export default BucketCreationAnswerList;
