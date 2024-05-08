export const queryKeys = {
  auth: {
    useQueryLoggedIn: ["auth", "logged-in"],
  },
  user: { useQueryUserData: ["user", "user-data"] },
  bucket: {
    useQueryBuckets: ["buckets"],
    useQueryBucketIds: ["buckets", "ids"],
    useQueryBucket: (bucketId: string) => ["bucket", bucketId],
  },
  counter: {
    useQueryCounterIds: (bucketId: string) => ["counters", bucketId, "ids"],
    useQueryCounter: (counterId: string) => ["counter", counterId],
  },
  motivation: {
    useQueryMotivationIds: (boxId: string) => ["motivations", boxId, "ids"],
    useQueryMotivation: (motivationId: string) => ["motivation", motivationId],
  },
};

export const constantsInQueryKeys = {
  auth: "auth",
  "logged-in": "logged-in",
  user: "user",
  buckets: "buckets",
  ids: "ids",
  bucket: "buckets",
  counters: "counters",
  counter: "counter",
  motivations: "motivations",
  motivation: "motivation",
};

export default queryKeys;
