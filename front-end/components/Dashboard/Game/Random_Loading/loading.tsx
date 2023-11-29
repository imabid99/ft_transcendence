import Lottie from "lottie-react";
import randomanimationData from "../../../../public/randomanimation1.json";

export default function LoadingRandom() {
    return (
        <div className="absolute flex justify-center items-center w-full h-[100vh] bg-gray-50">
            <div className="w-[500px] h-[500px]">
                <Lottie animationData={randomanimationData} />
            </div>
        </div>
    );
}
