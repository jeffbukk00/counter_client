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
    changeBucketPosition: "/buckets/position",
    createBucket: "buckets",
  },
  counter: {
    changeCounterPosition: (bucketId: string) =>
      `/counters/${bucketId}/position`,
  },
};
