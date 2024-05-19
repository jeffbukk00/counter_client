import { useEffect, useRef } from "react";

import { counterFrontConstants } from "./constants";
import { CounterCirclePropsType } from "./types";

const CountCircle = ({
  countCircleType,
  startCount,
  currentCount,
  endCount,
  direction,
}: CounterCirclePropsType) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isPositive =
    countCircleType === counterFrontConstants.countCircleType.positive;

  const total = Math.abs(startCount - endCount);
  let quantity: number;

  if (direction === counterFrontConstants.counterDirection.up) {
    if (countCircleType === counterFrontConstants.countCircleType.positive) {
      quantity = currentCount - startCount;
    } else {
      quantity = endCount - currentCount;
    }
  } else {
    if (countCircleType === counterFrontConstants.countCircleType.positive) {
      quantity = startCount - currentCount;
    } else {
      quantity = currentCount - endCount;
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();

      const whole = 2 * Math.PI;
      const arcStart = (Math.PI / 2) * -1;
      const arcEnd = whole * (quantity / total) - Math.PI / 2;

      ctx.moveTo(150, 75);
      ctx.arc(150, 75, 75, 0, whole);
      ctx.closePath();
      ctx.fillStyle = isPositive ? "#7FD69D" : "#FA7070";
      ctx.globalAlpha = 0.3;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(150, 75);
      ctx.arc(150, 75, 75, arcStart, arcEnd);
      ctx.closePath();
      ctx.fillStyle = isPositive ? "#7FD69D" : "#FA7070";
      ctx.globalAlpha = 1;
      ctx.fill();
    };
    draw();

    window.addEventListener("focus", draw);

    return () => {
      window.removeEventListener("focus", draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [quantity, isPositive, total]);

  return (
    <span
      className={`flex justify-center items-center absolute top-2 ${
        countCircleType === counterFrontConstants.countCircleType.positive
          ? "-right-1"
          : "right-8"
      }`}
    >
      <canvas ref={canvasRef} className="w-14 h-7 inline-block"></canvas>
    </span>
  );
};

export default CountCircle;
