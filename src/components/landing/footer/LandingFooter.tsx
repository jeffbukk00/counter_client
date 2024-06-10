import GithubVector from "@/shared/assets/GithubVector";

const LandingFooter = () => {
  return (
    <footer className="w-full h-[80vh]">
      <div className="w-full h-full grid semi-lg:grid-cols-2 semi-lg:grid-rows-1 grid-cols-1 grid-rows-2">
        <div className="w-full h-full flex justify-center items-center">
          <div className="semi-lg:w-[50%] md:w-[40%] xs:w-[60%] w-[70%] semi-lg:h-[40%] md:h-[50%] h-[50%] semi-lg:ml-[20%] semi-lg:mt-0 sm:mt-[10%] mt-[15%] semi-lg bg-default bg-opacity-90 rounded-3xl flex flex-col justify-center items-center">
            <p className="text-white tracking-wide mb-1 semi-lg:text-sm  sm:text-base text-xs">
              쫓기지 않고, 하나하나 차근차근 쌓아가기.
            </p>
            <p className="text-white tracking-wide mb-4 sm:text-base text-sm">
              대신, 무너지지 않게.
            </p>
            <p className="text-white tracking-wider sm:text-lg text-base font-medium">
              카운터와 함께.
            </p>
          </div>
        </div>
        <div className="w-full h-full flex justify-center items-center">
          <div className="semi-lg:w-[50%] md:w-[40%]  xs:w-[60%] w-[70%] semi-lg:h-[40%] md:h-[50%] h-[50%] semi-lg:mr-[20%] semi-lg:mb-0 sm:mb-[10%] mb-[15%] bg-white border border-gray-300 bg-opacity-90 rounded-3xl flex flex-col justify-center items-center">
            <p className=" tracking-wide mb-1 text-base">
              <span className="font-semibold mr-2 sm:text-base text-sm">
                개발자:
              </span>
              <span>jeffbukk00</span>
            </p>
            <p className=" tracking-wide mb-4 semi-lg:text-sm sm:text-base text-sm">
              <span className="font-semibold mr-2">이메일:</span>
              <span>jeffbukk00@gmail.com</span>
            </p>
            <a
              className="p-1 tracking-wider sm:text-lg text-base font-medium hover:bg-gray-200 active:bg-gray-200 transition duration-200 ease-in"
              href="https://github.com/jeffbukk00"
            >
              <GithubVector classes="w-6 h-6 inline-block mr-1" />
              깃허브 링크
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
