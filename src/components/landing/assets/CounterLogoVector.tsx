const CounterLogoVector = ({ classes }: { classes: string }) => {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
    >
      <g>
        <rect width="512" height="512" fill="white" />
        <rect width="512" height="256" fill="#7FD69D" />
        <rect y="256" width="512" height="256" fill="#FA7070" />
      </g>
      <defs>
        <clipPath id="clip0_490_3">
          <rect width="512" height="512" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CounterLogoVector;
