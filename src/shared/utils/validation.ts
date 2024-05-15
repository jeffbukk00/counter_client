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

export const test = () => ({ isValid: false, message: "테스트입니다" });
