import SharingButtonVector from "@/components/main/top/assets/SharingButtonVector";
import share1 from "./assets/share1.png";
import share2 from "./assets/share2.png";

const ShareIntroduction = () => {
  return (
    <section className="w-full">
      <div className="w-full  semi-lg:grid semi-lg:grid-cols-2 semi-lg:grid-rows-1 flex flex-col-reverse">
        <div className="flex flex-col justify-center items-center semi-lg:h-[80vh] md:h-[60vh] sm:h-[50vh] h-[40vh]">
          <div className="semi-lg:items-start flex flex-col justify-center items-center">
            <h3 className="sm:text-lg text-sm font-semibold mb-3 flex justify-start items-center">
              <span>
                <SharingButtonVector classes="sm:w-8 sm:h-8 w-6 h-6 mr-2" />
              </span>
              공유
            </h3>
            <p className="sm:text-sm xs:text-xs text-[10px] text-gray-600 mb-1">
              버킷을 다른 유저와 공유할 수 있습니다.
            </p>
            <p className="sm:text-sm xs:text-xs text-[10px] text-gray-600">
              같은 목표를 가진 유저들과 함께 협력해보세요.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 grid-rows-1 bg-gray-200 bg-opacity-30 py-[10%]">
          <div className="flex justify-center items-center">
            <img src={share1} className="w-[80%] object-cover"></img>
          </div>
          <div className="flex justify-center items-center">
            <img src={share2} className="w-[80%] object-cover" />
          </div>
        </div>
      </div>
      <div className="w-full semi-lg:h-[30vh]"></div>
    </section>
  );
};

export default ShareIntroduction;
