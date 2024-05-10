import { boxConstants } from "@/components/ui/box/constants";

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
  motivationText: {
    useQueryMotivationTextIds: (boxId: string, boxType: number) => [
      "motivation-texts",
      boxId,
      boxType === boxConstants.boxType.bucket ? "bucket" : "counter",
      "ids",
    ],
    useQueryMotivationText: (motivationId: string) => [
      "motivation-text",
      motivationId,
    ],
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
  "motivation-texts": "motivation-texts",
  "motivation-text": "motivation-text",
  "motivation-links": "motivation-links",
  "motivation-link": "motivation-link",
};

export default queryKeys;
