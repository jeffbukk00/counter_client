import DoubleArrowLeftVector from "@/shared/assets/DoubleArrowLeftVector";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GoBackPageAction = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const backToBucketsPage = () => navigate("/main/buckets");

  return (
    <>
      <button
        onClick={backToBucketsPage}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center items-center sm:visible invisible"
      >
        <DoubleArrowLeftVector
          classes={`w-8 h-8 inline-block stroke-2 ${
            isHovered ? "stroke-positive animate-bounceX" : "stroke-default"
          }`}
        />
        <span
          className={`ml-1 text-lg ${
            isHovered ? "text-positive" : "text-default"
          } `}
        >
          버킷 밖으로 이동
        </span>
      </button>
      <button
        onClick={backToBucketsPage}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center items-center sm:invisible visible"
      >
        <DoubleArrowLeftVector
          classes={`w-8 h-8 inline-block stroke-2 active:stroke-positive active:animate-bounceX stroke-default`}
        />
      </button>
    </>
  );
};

export default GoBackPageAction;
