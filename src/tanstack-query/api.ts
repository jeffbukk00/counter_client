export const api = {
  auth: {
    getLoggedIn: "/auth/logged-in",
    postLogout: "/auth/logout",
    getOauthLoginPage: (provider: string) => `/auth/oauth/url/${provider}`,
    postAuthorizationCode: (provider: string) =>
      `/auth/oauth/token/${provider}${window.location.search}`,
  },
  user: {
    getUserData: "/user/user-data",
  },
  bucket: {
    getBucketIds: "/buckets/ids",
    getBuckets: "/buckets",
    changeBucketPosition: "/buckets/position",
    createBucket: "/buckets",
    getBucket: (bucketId: string) => `/bucket/${bucketId}`,
    editBucket: (bucketId: string) => `/bucket/${bucketId}`,
    duplicateBucket: (bucketId: string) => `/buckets/duplicate/${bucketId}`,
    mergeBucket: (bucketIdSubject: string) =>
      `/buckets/merge/${bucketIdSubject}`,
    deleteBucket: (bucketId: string) => `/buckets/${bucketId}`,
  },
  counter: {
    getCounterIds: (bucketId: string) => `/counters/${bucketId}/ids`,
    changeCounterPosition: (bucketId: string) =>
      `/counters/${bucketId}/position`,
    createCounter: (bucketId: string) => `/counters/${bucketId}`,
    getCounter: (counterId: string) => `/counter/${counterId}`,
    updateCount: (counterId: string) => `/counter/count/${counterId}`,
    updateAchievementStack: (counterId: string) =>
      `/counter/achievement-stack/${counterId}`,
    resetCount: (counterId: string) => `/counter/count/reset/${counterId}`,
    resetAchievementStack: (counterId: string) =>
      `/counter/achievement-stack/reset/${counterId}`,
    editCounter: (counterId: string) => `/counter/${counterId}`,
    duplicateCounter: (bucketId: string, counterId: string) =>
      `/counters/${bucketId}/duplicate/${counterId}`,
    moveCounter: (bucketIdSubject: string, counterId: string) =>
      `/counters/${bucketIdSubject}/move/${counterId}`,
    removeCounter: (bucketId: string, counterId: string) =>
      `/counters/${bucketId}/${counterId}`,
  },
  motivationText: {
    getMotivationTextIds: (boxId: string, boxType: number) =>
      `/motivation-texts/${boxId}/ids?boxType=${boxType.toString()}`,
    getMotivationText: (motivationTextId: string) =>
      `/motivation-text/${motivationTextId}`,
    createMotivationText: (boxId: string, boxType: number) =>
      `/motivation-texts/${boxId}?boxType=${boxType.toString()}`,
    editMotivationText: (motivationTextId: string) =>
      `/motivation-text/${motivationTextId}`,
    removeMotivationText: (
      boxId: string,
      boxType: number,
      motivationTextId: string
    ) =>
      `/motivation-texts/${boxId}/${motivationTextId}?boxType=${boxType.toString()}`,
  },
  motivationLink: {
    getMotivationLinkIds: (boxId: string, boxType: number) =>
      `/motivation-links/${boxId}/ids?boxType=${boxType.toString()}`,
    getMotivationLink: (motivationLinkId: string) =>
      `/motivation-link/${motivationLinkId}`,
    createMotivationLink: (boxId: string, boxType: number) =>
      `/motivation-links/${boxId}?boxType=${boxType.toString()}`,
    editMotivationLink: (motivationLinkId: string) =>
      `/motivation-link/${motivationLinkId}`,
    removeMotivationLink: (
      boxId: string,
      boxType: number,
      motivationLinkId: string
    ) =>
      `/motivation-links/${boxId}/${motivationLinkId}?boxType=${boxType.toString()}`,
  },
};
