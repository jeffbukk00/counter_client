import { counterFrontConstants } from "../constants";

const PlusVector = ({ direction }: { direction: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={`${
        direction === counterFrontConstants.counterDirection.up
          ? "green"
          : "red"
      }`}
      className="w-6 h-6 inline-block"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
};

export default PlusVector;
