import { BucketCreationAnswerListPropsType } from "./types";

// 이전 페이즈들에서 입력되었던 유저 입력들을 보여주는 컴포넌트.
// currentPhase 상태에 무엇인지에 따라 변화함.
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
