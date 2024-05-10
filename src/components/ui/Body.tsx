import { HasChildren } from "@/shared/types";

const Body = ({ children }: HasChildren) => {
  return <main className="w-full h-9/10 overflow-y-scroll">{children}</main>;
};

export default Body;
