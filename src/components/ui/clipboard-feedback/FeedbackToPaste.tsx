// 유저의 클립보드에 저장 된 데이터를 붙여 넣을 때, 피드백으로서 보여지는 컴포넌트.
const FeedbackToPaste = ({
  isPasted,
  fontSize,
}: {
  isPasted: boolean;
  fontSize: string;
}) => {
  return (
    <>
      {isPasted && (
        <p className={`text-positive ${fontSize}`}>붙여넣었습니다</p>
      )}
      {!isPasted && (
        <p className={`${fontSize} text-gray-400`}>
          복사한 링크를 붙여넣으시려면, 위 아이콘을 클릭해주세요
        </p>
      )}
    </>
  );
};

export default FeedbackToPaste;
