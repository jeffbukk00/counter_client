import { BucketFrontPropsType } from "./types";

const BucketFront = ({ bucketFrontData: { title } }: BucketFrontPropsType) => {
  return <p>{title}</p>;
};

export default BucketFront;
