import PlusVector from "@/components/counter/counter-front/assets/PlusVector";
import counter1 from "./assets/counter1.png";
import counter2 from "./assets/counter2.png";
import counter3 from "./assets/counter3.png";
import MinusVector from "@/components/counter/counter-front/assets/MinusVector";

// counter를 소개하는 컴포넌트.
const CounterIntroduction = () => {
  return (
    <section className="w-full">
      <div className="bg-gray-200  bg-opacity-30 grid semi-lg:grid-cols-3 semi-lg:grid-rows-1 grid-cols-1 grid-rows-3 p-10 semi-lg:gap-0 gap-[15%]">
        <div className="flex justify-center items-center object-cover ">
          <img src={counter1} className="semi-lg:w-[60%] md:w-[30%] w-[40%]" />
        </div>
        <div className="flex justify-center items-center object-cover ">
          <img src={counter2} className="semi-lg:w-[60%] md:w-[30%] w-[40%]" />
        </div>
        <div className="flex justify-center items-center object-cover ">
          <img src={counter3} className="semi-lg:w-[60%] md:w-[30%] w-[40%]" />
        </div>
      </div>
      <div className="w-full sm:h-[60vh] h-[50vh] flex flex-col justify-center items-center">
        <div className="flex justify-center items-center mb-3">
          <PlusVector classes="w-7 h-7 stroke-positive" />
          <MinusVector classes="w-7 stroke-negative" />
        </div>
        <p className="sm:text-xl text-lg font-semibold mb-2 tracking-wider">
          단순하게, 하지만 분명하게.
        </p>
        <p className="font-medium tracking-wide text-gray-600 sm:text-base text-xs">
          모든 목표들에 대해 카운트를 올리고 내리기만 하세요.
        </p>
        <p className="font-medium tracking-wide text-gray-600 sm:text-base text-xs">
          오직 이것만 신경 쓰세요.
        </p>
      </div>
    </section>
  );
};

export default CounterIntroduction;
