'use client';
import Lottie from "lottie-react";
import animationData1 from  "../public/loading5.json";

export default function Loading() {
    return (
      <div className=" absolute flex justify-center items-center w-full h-[100vh] bg-gray-50">
        <div className=" w-[500px] h-[500px]">
          <Lottie animationData={animationData1} />
        </div>
      </div>
    )   
}