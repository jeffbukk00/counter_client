const counterCreationPhaseQueryData = {
  placeholder: "여기에 입력해주세요...",
  queries: [
    { queryText: "이 카운터의 이름은 무엇인가요?", name: "title" },
    { queryText: "어디서부터 시작하나요?", name: "startCount" },
    { queryText: "어디까지를 목표로 하나요?", name: "endCount" },
  ],
  lastPhaseComment: "카운터를 만듭니다",
};

export const counterCreationConstants = {
  counterCreationPhase: {
    first: 0,
    last: 3,
  },
  counterCreationPhaseQueryData,
};
