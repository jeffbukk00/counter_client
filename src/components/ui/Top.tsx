import { HasChildren } from "@/shared/types";

const Top = ({ children }: HasChildren) => {
  return <header className="w-screen h-1/10">{children}</header>;
};

export default Top;
