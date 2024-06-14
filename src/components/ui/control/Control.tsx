import HoverWrapper from "@/components/styles/HoverWrapper";
import { ControlPropsType } from "./types";

// bucket 혹은 counter의 controller에서 각 control에 대한 wrapper 컴포넌트.
const Control = ({ title, action, children }: ControlPropsType) => {
  return (
    <HoverWrapper classes="py-[2px] px-[3px]">
      <button
        onClick={action}
        className="flex justify-center items-center gap-[3px]"
      >
        {children}
        <p className="text-xs font-medium">{title}</p>
      </button>
    </HoverWrapper>
  );
};

export default Control;
