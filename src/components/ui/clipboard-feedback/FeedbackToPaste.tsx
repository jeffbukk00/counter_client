const FeedbackToPaste = ({ isPasted }: { isPasted: boolean }) => {
  return (
    <>
      {isPasted && <p className="text-positive">붙여넣었습니다</p>}
      {!isPasted && (
        <p>복사한 링크를 붙여넣으시려면, 위 아이콘을 클릭해주세요</p>
      )}
    </>
  );
};

export default FeedbackToPaste;
