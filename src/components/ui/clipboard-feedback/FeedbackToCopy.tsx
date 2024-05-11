const FeedbackToCopy = ({ isCopied }: { isCopied: boolean }) => {
  return (
    <>
      {isCopied && <p className="text-positive">복사했습니다</p>}
      {!isCopied && <p>링크를 복사하시려면, 위 아이콘을 클릭해주세요</p>}
    </>
  );
};

export default FeedbackToCopy;
