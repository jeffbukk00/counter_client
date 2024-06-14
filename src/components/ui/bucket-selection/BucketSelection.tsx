import { BucketSelectionPropsType } from "./types";

import HoverWrapper from "@/components/styles/HoverWrapper";

// 클릭하면 특정 bucket을 유저가 선택할 수 있는 버튼 컴포넌트.
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
