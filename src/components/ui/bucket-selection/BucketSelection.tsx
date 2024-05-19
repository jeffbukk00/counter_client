import HoverWrapper from "@/components/styles/HoverWrapper";
import { BucketSelectionPropsType } from "./types";

const BucketSelection = ({
  title,
  selectBucketHandler,
}: BucketSelectionPropsType) => {
  return (
    <HoverWrapper classes="w-full h-[20%] ">
      <li className="w-full h-full flex justify-center items-center">
        <button
          onClick={() => selectBucketHandler()}
          className="text-sm w-full h-full"
        >
          {title}
        </button>
      </li>
    </HoverWrapper>
  );
};

export default BucketSelection;
