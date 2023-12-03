import Lottie from "lottie-react";
import randomanimationData from "../../../../public/handloading.json";

export default function LoadingRandom() {
    return (
        <div className="absolute flex justify-center items-center w-full h-[100vh] bg-gray-50">

                <Lottie animationData={randomanimationData} />

        </div>
    );
}
