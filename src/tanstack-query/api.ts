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
    changeCounterPosition: (bucketId: string) =>
      `/counters/${bucketId}/position`,
  },
};
