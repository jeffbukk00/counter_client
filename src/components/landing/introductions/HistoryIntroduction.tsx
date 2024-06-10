import ChangeToHistoryButtonVector from "@/shared/assets/box-back-types/ChangeToHistoryButtonVector";
import history1 from "./assets/history1.png";

const HistoryIntroduction = () => {
  return (
    <section className="w-full">
      <div className="w-full bg-gray-200 bg-opacity-30 flex justify-center items-center py-[5%]">
        <img
          src={history1}
          className="lg:w-[60%] md:w-[70%] w-[80%] object-cover"
        />
      </div>
      <div className="w-full sm:h-[60vh] h-[50vh] flex flex-col justify-center items-center">
        <span>
          <ChangeToHistoryButtonVector classes="w-7 h-7 inline-block mb-4" />
        </span>
        <p className="sm:text-xl text-base font-semibold mb-2 tracking-wider">
          카운터의 누적된 히스토리를 관리해보세요.
        </p>
        <p className="font-medium tracking-wide text-gray-600 sm:text-base text-xs">
          성취한 시간과, 성취한 순간에 대해 기록할 수 있습니다.
        </p>
        <p className="font-medium tracking-wide text-gray-600 sm:text-base text-xs">
          일시적이지 않은, 지속적인 발자취를 남겨보세요.
        </p>
      </div>
    </section>
  );
};

export default HistoryIntroduction;
