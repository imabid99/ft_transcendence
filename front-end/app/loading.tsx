'use client';
import Lottie from "lottie-react";
import animationData1 from  "../public/loading5.json";

export default function Loading() {
    return (
      // <div className="flex justify-center items-center w-full h-full bg-gray-50 dark:bg-gray-900">
      //   <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      // </div>
      <div className="flex justify-center items-center w-full h-full absolute top-9">
        <div className=" w-[500px] h-[500px]">
        <Lottie animationData={animationData1} />
        </div>
      </div>
    )   
}