interface GuidesType {
  [key: string]: string;
}

interface GuideIdsType {
  [key: string]: string;
}

export const guideIds: GuideIdsType = {
  guideId1: "guideId1",
  guideId2: "guideId2",
  guideId3: "guideId3",
  guideId4: "guideId4",
  guideId5: "guideId5",
  guideId6: "guideId6",
  guideId7: "guideId7",
  guideId8: "guideId8",
  guideId9: "guideId9",
};

const guides: GuidesType = {
  [guideIds.guideId1]: `"+" 버튼을 누르시면, 버킷 생성이 시작됩니다.
  버킷에는 카운터들을 담아둡니다. 각각의 카운터가 하나의 작은 목표를 추구한다면, 버킷은 그것들을 전부 포괄할 수 있는 큰 목표를 추구합니다.`,
  [guideIds.guideId2]: "박스 2",
  [guideIds.guideId3]: "박스 3",
  [guideIds.guideId4]: "박스 크리에이터 1",
  [guideIds.guideId5]: "박스 크리에이터 2",
  [guideIds.guideId6]: "박스 크리에이터 3",
  [guideIds.guideId7]: "모달 1",
  [guideIds.guideId8]: "모달 2",
  [guideIds.guideId9]: "모달 3",
};

export const guideConstants = {
  guideIds,
  guides,
};
