import { downloadConstants } from "@/components/sharing/download/constants";

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
    updateUnreadGuideIds: "user/user-data/unread-guide-ids",
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
    resetCount: (counterId: string, isResetHistory: boolean) =>
      `/counter/count/reset/${counterId}/${
        isResetHistory ? "reset" : "preserve"
      }`,
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
  sharing: {
    uploadShareLink: "/sharing/upload",
    validateShareLink: (shareLink: string) => `${shareLink}/validation`,
    downloadFromShareLink: (shareLink: string, downloadType: number) =>
      `${shareLink}/download/${
        downloadType === downloadConstants.downloadType.all ? "all" : "secure"
      }`,
  },
  history: {
    getHistoryAll: (counterId: string) => `/history/all/${counterId}`,
    getAchievementStackHistoryIds: (counterId: string) =>
      `/history/achievement-stack/ids/${counterId}`,
    getAchievementStackHistory: (achievementStackId: string) =>
      `/history/achievement-stack/${achievementStackId}`,
    getCountHistoryAll: (achievementStackId: string) =>
      `/history/counts/${achievementStackId}`,
    editCommentOfAchievementStackHistory: (achievementStackId: string) =>
      `/history/achievement-stack/edit/${achievementStackId}`,
    editCommentOfCountHistory: (countId: string) =>
      `/history/count/edit/${countId}`,
  },
};
