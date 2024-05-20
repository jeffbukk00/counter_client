import SelectedDigitalNumberVector from "@/shared/assets/digital-numbers/SelectedDigitalNumberVector";
import PlusVector from "../counter/counter-front/assets/PlusVector";
import { counterFrontConstants } from "../counter/counter-front/constants";
import MinusVector from "../counter/counter-front/assets/MinusVector";

const SampleCounterDisplay = () => {
  const count = "000015";
  return (
    <div className="w-full h-full flex justify-center items-center">
      <ul className="relative w-full grid grid-cols-6">
        {count.split("").map((e, i) => (
          <li
            key={i}
            className="w-full h-20 relative flex justify-center items-center"
          >
            <SelectedDigitalNumberVector
              number={Number(e)}
              classes="w-full h-10"
            />
            {i === 5 && (
              <>
                <span className="w-full h-full absolute top-0 left-0 inline-block">
                  <span className="w-full h-10 bg-positive opacity-30  flex justify-center items-center">
                    <PlusVector
                      direction={counterFrontConstants.counterDirection.up}
                    />
                  </span>
                  <span className="w-full h-10 bg-negative opacity-30 flex justify-center items-center">
                    <MinusVector
                      direction={counterFrontConstants.counterDirection.down}
                    />
                  </span>
                </span>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SampleCounterDisplay;
