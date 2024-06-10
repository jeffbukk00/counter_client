import { HasChildrenWithClasses } from "@/shared/types";

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
