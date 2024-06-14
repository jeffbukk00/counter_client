import { useEffect, useRef } from "react";

import { counterFrontConstants } from "./constants";
import { CounterCirclePropsType } from "./types";

// 현재 count의 성취 진행 정도를 시각적으로 표현하는 컴포넌트.
const CountCircle = ({
  countCircleType,
  startCount,
  currentCount,
  endCount,
  direction,
}: CounterCirclePropsType) => {
  // html canvas에 대한 참조를 저장.
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // CountCircle의 타입 판별.
  const isPositive =
    countCircleType === counterFrontConstants.countCircleType.positive;

  // 성취하기 위해 count를 업데이트 해야하는 총 양.
  const total = Math.abs(startCount - endCount);
  // 현재까지의 count 변화량.
  let quantity: number;

  // counter의 direction과 CountCircle의 타입을 고려하여 현재까지의 count 변화량을 판별 및 할당.
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
    // "성취하기 위해 count를 업데이트 해야하는 총 양" 대비 "현재까지의 count 변화량"을 html canvas를 이용해 시각적으로 표현.
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

    // 브라우저에서 창 전환할 때마다 html canvas가 초기화 됨.
    // 이를 해결 하기 위해, 창이 다시 포커스 될 때마다 새롭게 그리도록 함.
    window.addEventListener("focus", draw);

    return () => {
      // 이벤트 리스너 클린업.
      window.removeEventListener("focus", draw);
      // html canvs 초기화.
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
