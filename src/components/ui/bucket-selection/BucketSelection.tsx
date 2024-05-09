import { BucketSelectionPropsType } from "./types";

const BucketSelection = ({
  title,
  selectBucketHandler,
}: BucketSelectionPropsType) => {
  return (
    <li>
      <button onClick={() => selectBucketHandler()}>{title}</button>
    </li>
  );
};

export default BucketSelection;
