import { HasChildrenWithClasses } from "@/shared/types";

// 버튼 요소가 hover 혹은 active 상태 일 때, ui가 변하도록 하는  wrapper 컴포넌트.
const HoverWrapper = ({ classes, children }: HasChildrenWithClasses) => {
  return (
    <div
      className={`transition-colors duration-200 ease-in sm:hover:bg-gray-200 active:bg-gray-200 ${classes}`}
    >
      {children}
    </div>
  );
};

export default HoverWrapper;
