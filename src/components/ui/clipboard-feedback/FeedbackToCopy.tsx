const FeedbackToCopy = ({
  isCopied,
  fontSize,
}: {
  isCopied: boolean;
  fontSize: string;
}) => {
  return (
    <>
      {isCopied && <p className={`text-positive ${fontSize}`}>복사했습니다</p>}
      {!isCopied && (
        <p className={`${fontSize} text-gray-400`}>
          링크를 복사하시려면, 위 아이콘을 클릭해주세요
        </p>
      )}
    </>
  );
};

export default FeedbackToCopy;
