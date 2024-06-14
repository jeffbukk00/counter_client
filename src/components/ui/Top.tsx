import { HasChildren } from "@/shared/types";

// 로그인 후 라우터에서의 메인 페이지의 top에 해당하는 컴포넌트.
const Top = ({ children }: HasChildren) => {
  return <header className="w-screen h-1/10">{children}</header>;
};

export default Top;
