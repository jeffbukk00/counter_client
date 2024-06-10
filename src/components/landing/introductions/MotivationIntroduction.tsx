import motivationText1 from "./assets/motivation-text1.png";
import motivationLink1 from "./assets/motivation-link1.png";
import ChangeToMotivationButtonVector from "@/shared/assets/box-back-types/ChangeToMotivationButtonVector";

const MotivationIntroduction = () => {
  return (
    <section className="w-full">
      <div className=" w-full  semi-lg:grid semi-lg:grid-cols-2 semi-lg:grid-rows-1 ">
        <div className="semi-lg:h-[80vh] md:h-[50vh] sm:h-[50vh] xs:h-[30vh] h-[20vh] grid semi-lg:grid-cols-1 semi-lg:grid-rows-2 grid-cols-2 grid-rows-1 bg-gray-200 bg-opacity-30 semi-lg:py-[10%] py-[5%] xl:gap-[30%] semi-lg:gap-[15%] gap-[5%]">
          <div className="flex justify-center items-center">
            <img
              src={motivationText1}
              className="semi-lg:w-[50%] md:w-[70%] sm:w-[80%] w-[90%] object-cover"
            ></img>
          </div>
          <div className="flex justify-center items-center">
            <img
              src={motivationLink1}
              className="semi-lg:w-[50%] md:w-[70%] sm:w-[80%]   w-[90%] object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center semi-lg:h-[80vh] md:h-[60vh] sm:h-[50vh] h-[40vh]">
          <div className="semi-lg:items-start flex flex-col justify-center items-center">
            <h3 className="sm:text-lg text-sm font-semibold mb-3 flex justify-start items-center">
              <span>
                <ChangeToMotivationButtonVector classes="sm:w-6 sm:h-6 w-5 h-5 inline-block mr-2" />
              </span>
              모티베이션
            </h3>
            <p className="sm:text-sm xs:text-xs text-[10px]  text-gray-600 mb-1">
              각 버킷과 카운터가 담고 있는 목표에 대해 동기부여를 해보세요.
            </p>
            <p className="sm:text-sm xs:text-xs text-[10px]  text-gray-600">
              텍스트로 기록하거나, 관련된 콘텐츠의 링크를 저장할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MotivationIntroduction;
