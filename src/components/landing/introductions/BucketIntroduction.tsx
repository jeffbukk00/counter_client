import ClassificationVector from "@/shared/assets/ClassificationVector";
import bucket1 from "./assets/bucket1.png";

// bucket을 소개하는 컴포넌트.
const BucketIntroduction = () => {
  return (
    <section className="w-full">
      <div className="w-full bg-gray-200 bg-opacity-30 flex justify-center items-center py-[5%]">
        <img
          src={bucket1}
          className="lg:w-[60%] md:w-[70%] w-[80%] object-cover"
        />
      </div>
      <div className="w-full sm:h-[60vh] h-[50vh] flex flex-col justify-center items-center">
        <span>
          <ClassificationVector classes="w-7 h-7 inline-block stroke-2 mb-4" />
        </span>
        <p className="sm:text-xl text-base font-semibold mb-2 tracking-wider">
          버킷은 큰 목표, 카운터는 작은 목표.
        </p>
        <p className="font-medium tracking-wide text-gray-600 sm:text-base text-xs">
          버킷 안에 카운터들을 담아 분류해보세요.
        </p>
        <p className="font-medium tracking-wide text-gray-600 sm:text-base text-xs">
          같은 방향을 향하는 목표들을 한눈에 보고 관리할 수 있습니다.
        </p>
      </div>
    </section>
  );
};

export default BucketIntroduction;
