import { ControlPropsType } from "./types";

const Control = ({ title, action, children }: ControlPropsType) => {
  return (
    <button onClick={action}>
      {children}
      <span>{title}</span>
    </button>
  );
};

export default Control;
