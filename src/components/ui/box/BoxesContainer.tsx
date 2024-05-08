import { HasChildren } from "@/shared-types/props";

const BoxesContainer = ({ children }: HasChildren) => {
  return (
    <div className="w-9/10 h-9/10 ml-1/20 mr-1/20 grid grid-cols-3">
      {children}
    </div>
  );
};

export default BoxesContainer;
