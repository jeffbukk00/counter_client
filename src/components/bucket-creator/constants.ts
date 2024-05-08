const bucketCreationPhaseQueryData = {
  placeholder: "여기에 입력해주세요...",
  queries: [{ queryText: "이 버킷의 이름은 무엇인가요?", name: "title" }],
  lastPhaseComment: "버킷을 만듭니다",
};

export const bucketCreatorConstants = {
  bucketCreationPhase: {
    first: 0,
    last: 1,
  },
  bucketCreationPhaseQueryData,
};
