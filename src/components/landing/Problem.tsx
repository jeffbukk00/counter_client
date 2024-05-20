import { landingConstants } from "./constants";

const Problem = ({ type }: { type: number }) => {
  let content = (
    <div>
      <p className="text-sm text-center font-light tracking-wide">
        모두가 끊임 없이 "자기 계발"하는 시대
      </p>
      <p className="text-center text-base">=</p>
      <p className="text-center text-lg font-medium tracking-wider">
        "목표 포화"의 시대
      </p>
    </div>
  );

  if (type === landingConstants.problemType.second) {
    content = (
      <div>
        <p className="text-center text-xs mb-3 font-light">일상을 뒤덮은</p>
        <p className="text-center text-base tracking-wider">너무 많은 목표들</p>
        <p className="text-center text-base tracking-wider">
          너무 다양한 목표들
        </p>
      </div>
    );
  }

  if (type === landingConstants.problemType.third) {
    content = (
      <div>
        <p className="text-center text-xs font-light">데드라인 다음에</p>
        <p className="text-center text-xs mb-3 font-light">데드라인 다음에</p>
        <p className="text-center text-base tracking-wider">
          데드라인 다음의 연속
        </p>
      </div>
    );
  }

  return (
    <div className="w-80 h-40 border border-negative bg-white flex justify-center items-center">
      {content}
    </div>
  );
};

export default Problem;
