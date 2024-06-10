import HeroAction from "./HeroAction";

const HeroSection = () => {
  return (
    <div className="w-full flex justify-center">
      <section className="w-[80%] xs:h-[90vh] h-[80vh] flex justify-center items-center">
        <div>
          <div>
            <div>
              <h3 className="text-lg font-semibold mb-4 tracking-wider">
                목표 관리, 복잡하게 하지 마세요.
              </h3>
              <div className="text-xs  flex flex-col gap-2 ">
                <p className="text-gray-400 tracking-wide">
                  집에 와서도 자기 계발 하는 시대
                </p>
                <p className="text-gray-400 tracking-wide">
                  일상을 뒤덮은 너무 많은 목표들, 너무 다양한 목표들
                </p>
                <p className="text-gray-400 tracking-wide">
                  데드라인 다음에, 데드라인 다음에, 데드라인 다음의 연속
                </p>
              </div>
            </div>
            <div className="mt-16">
              <h2 className="mb-6">
                <span className="text-4xl text-positive font-medium mr-3 tracking-wider">
                  올리고
                </span>
                <span className="text-4xl text-negative font-medium tracking-wider">
                  내리고
                </span>
                <span className="text-sm text-gray-400 tracking-tight">
                  만 하세요.
                </span>
              </h2>

              <HeroAction />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
