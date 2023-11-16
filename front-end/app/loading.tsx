'use client';
import Lottie from "lottie-react";
import animationData1 from  "../public/loading5.json";

export default function Loading() {
    return (
      <div className="flex justify-center items-center w-screen h-screen bg-white absolute top-9">
        <div className=" w-[500px] h-[500px]">
        <Lottie animationData={animationData1} />
        </div>
      </div>
    )   
}