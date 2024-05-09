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
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();

    const whole = 2 * Math.PI;
    const arcStart = (Math.PI / 2) * -1;
    const arcEnd = whole * (quantity / total) - Math.PI / 2;

    ctx.moveTo(150, 75);
    ctx.arc(150, 75, 75, arcStart, arcEnd);
    ctx.closePath();
    ctx.fillStyle = isPositive ? "#7FD69D" : "#FA7070";
    ctx.fill();

    return () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [quantity, isPositive, total]);

  return (
    <span>
      <canvas ref={canvasRef} className="w-12 h-6 inline-block"></canvas>
    </span>
  );
};

export default CountCircle;
