import { HasChildren } from "@/shared-types/props";

const BoxesContainer = ({ children }: HasChildren) => {
  return (
    <div className="w-9/10 h-full ml-1/20 mr-1/20 grid grid-cols-3 grid-flow-row auto-rows-max">
      {children}
    </div>
  );
};

export default BoxesContainer;
