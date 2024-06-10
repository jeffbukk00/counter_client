import DoubleArrowTopVector from "@/shared/DoubleArrowTopVector";
import CounterLogoVector from "./assets/CounterLogoVector";

const LandingTop = () => {
  const scrollUp = () => {
    if (window.scroll) {
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  return (
    <header>
      <div className="fixed top-[5%] left-[5%] ">
        <span className="flex justify-center items-center">
          <CounterLogoVector classes="w-6 h-6 inline-block" />
          <span className="ml-2 text-sm font-medium">카운터</span>
        </span>
      </div>
      <div className="fixed bottom-[5%] right-[5%]">
        <button
          onClick={scrollUp}
          className="sm:p-4 p-3 rounded-full border border-gray-500 flex flex-col justify-center items-center gap-1 bg-white hover:bg-gray-200 hover:bg-opacity-30 transition-colors duration-200 ease-in"
        >
          <span>
            <DoubleArrowTopVector classes="sm:w-8 sm:h-8 w-7 h-7" />
          </span>
          <span className="sm:text-base text-sm">위로 이동</span>
        </button>
      </div>
    </header>
  );
};

export default LandingTop;
