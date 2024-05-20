import { landingConstants } from "./constants";

const Solution = ({ type }: { type: number }) => {
  let content = (
    <div>
      <p className="text-center font-light tracking-wide text-sm">
        목표 포화의 시대 속에서
      </p>
      <p className="text-center text-base">=</p>
      <p className="text-center text-lg font-medium tracking-wider">
        오히려, "단순하게"
      </p>
    </div>
  );

  if (type === landingConstants.solutionType.second) {
    content = (
      <div>
        <div>
          <p className="text-center text-xs mb-3 font-light">
            어떤 목표에든 똑같이
          </p>
          <p className="text-center text-base tracking-wider">
            카운트를 올리고
          </p>
          <p className="text-center text-base tracking-wider">
            카운트를 내리고만
          </p>
        </div>
      </div>
    );
  }

  if (type === landingConstants.solutionType.third) {
    content = (
      <div>
        <p className="text-center text-xs font-light">조급하지 않게</p>
        <p className="text-center text-xs mb-3 font-light">
          하나하나 차근차근 쌓아가기
        </p>
        <p className="text-center text-base tracking-wider">
          대신, 무너지지 않게
        </p>
      </div>
    );
  }
  return (
    <div className="w-80 h-40 border border-positive bg-white flex justify-center items-center">
      {content}
    </div>
  );
};

export default Solution;
