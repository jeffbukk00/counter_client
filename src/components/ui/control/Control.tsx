import HoverWrapper from "@/components/styles/HoverWrapper";
import { ControlPropsType } from "./types";

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
