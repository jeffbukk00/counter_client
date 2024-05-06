import { UsingChildrenProps } from "@/shared-types/props";

const Top = ({ children }: UsingChildrenProps) => {
  return <header className="w-screen h-10vh">{children}</header>;
};

export default Top;
