import { HasChildren } from "@/shared-types/props";

const Body = ({ children }: HasChildren) => {
  return <main className="w-full h-9/10 overflow-y-scroll">{children}</main>;
};

export default Body;
