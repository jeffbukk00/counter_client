import { UsingChildrenProps } from "@/shared-types/props";

const Body = ({ children }: UsingChildrenProps) => {
  return <main className="w-90vw h-90vh ml-5vw mr-5vw">{children}</main>;
};

export default Body;
