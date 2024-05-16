const counterCreationPhaseQueryData = {
  placeholder: "여기에 입력해주세요...",
  queries: [
    { queryText: "이 카운터의 이름은 무엇인가요?", name: "title" },
    { queryText: "시작 카운트를 설정해주세요", name: "startCount" },
    { queryText: "목표 카운트를 설정해주세요", name: "endCount" },
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
