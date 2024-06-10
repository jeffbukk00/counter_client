import { counterFrontConstants } from "../constants";

const MinusVector = ({
  direction,
  classes = "w-6 h-6 inline-block",
}: {
  direction?: number;
  classes?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={`${
        direction === counterFrontConstants.counterDirection.up
          ? "red"
          : "green"
      }`}
      className={classes}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
    </svg>
  );
};

export default MinusVector;
