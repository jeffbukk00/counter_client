import { HasChildren } from "@/shared/types";

const CenterContainer = ({ children }: HasChildren) => {
  return (
    <div className="w-30vw h-60vh absolute top-[20vh] left-[35vw] z-[99] border-black border-2">
      {children}
    </div>
  );
};

export default CenterContainer;
