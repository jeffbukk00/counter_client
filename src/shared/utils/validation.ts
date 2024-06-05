interface ValidationResultType {
  isValid: boolean;
  message: string;
}

export const validate = (validationResults: ValidationResultType[]) => {
  const invalidResults = validationResults.filter((e) => !e.isValid);
  if (invalidResults.length === 0) return { isValid: true, messages: [] };

  return {
    isValid: false,
    messages: invalidResults.map((e) => e.message),
  };
};

export const required = (text: string) => ({
  isValid: text.length > 0,
  message: "비워둘 수 없습니다",
});

export const below15Letters = (text: string) => ({
  isValid: text.length < 16,
  message: "15 글자까지만 입력 가능합니다",
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const notNull = (any: any) => ({
  isValid: any !== null,
  message: "버킷을 선택하지 않았습니다",
});

export const isSameBucket = (bucketId: string, selectedBucketId: string) => ({
  isValid: bucketId !== selectedBucketId,
  message: "같은 버킷을 선택했습니다",
});

export const isInteger = (value: string) => ({
  isValid: Number.isInteger(Number(value)),
  message: "숫자(정수)만 입력 가능합니다.",
});

export const overMin = (value: string) => ({
  isValid: Number(value) >= 0,
  message: "0 이상의 수(정수)만 입력 가능합니다",
});

export const belowMax = (value: string) => ({
  isValid: Number(value) <= 999999,
  message: "999,999 이하의 수(정수만) 입력 가능합니다",
});

export const endCountisSame = (startCount: string, endCount: string) => ({
  isValid: startCount !== endCount,
  message: "시작 카운트와 목표 카운트가 같을 수 없습니다",
});

export const currentCountIsInBetween = (
  currentCount: number,
  startCount: string,
  endCount: string
) => {
  const startCountNum = Number(startCount);
  const endCountNum = Number(endCount);

  const direction = startCountNum < endCountNum ? "up" : "down";

  let isValid: boolean;

  if (direction === "up") {
    isValid = currentCount >= startCountNum && currentCount < endCountNum;
  } else {
    isValid = currentCount <= startCountNum && currentCount > endCountNum;
  }

  return {
    isValid,
    message:
      direction === "up"
        ? "현재 카운트가 시작 카운트보다 크거나 같고, 목표 카운트보다 작아야 합니다"
        : "현재 카운트가 시작 카운트보다 작거나 같고, 목표 카운트보다 커야합니다",
  };
};

export const linkIsNotPasted = (link: string) => ({
  isValid: link.length > 0,
  message: "붙여넣은 링크가 없습니다",
});

export const isValidUrl = (url: string) => {
  const regex =
    /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?\/[a-zA-Z0-9]{2,}/;
  const urlTester = new RegExp(regex);

  return {
    isValid: urlTester.test(url),
    message: "유효하지 않은 URL 형식입니다",
  };
};

export const isValidShareLink = (shareLink: string) => {
  let splitted = shareLink.split("/");

  if (splitted.length !== 3)
    return { isValid: false, message: "유효한 공유 링크 형식이 아닙니다" };

  splitted = splitted.slice(1);
  let isValid = true;
  if (splitted[0] !== "sharing") {
    isValid = false;
  }
  if (splitted[1].length !== 24) {
    isValid = false;
  }

  return { isValid, message: "유효한 공유 링크 형식이 아닙니다" };
};
