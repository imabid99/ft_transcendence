import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="h-screen w-screen bg-center relative">
            <img
                src="las.svg"
                alt=""
                className="absolute h-screen w-screen object-cover z-[-1]"
            />
            <div className="flex justify-center items-center flex-col gap-[62px] h-full ">
                <p className="text-white text-[40px] font-[400] capitalize textSh text-center font-['Fredoka'] max-w-[800px] xl:max-w-[1000px] md:text-[60px] xl:text-[80px]">
                    Looks like you've found the doorway to the great nothing.
                </p>
                <p className="text-[#D8EDF6] text-center text-[20px] md:text-[30px] xl:text-[40px] font-[400] capitalize textSh font-['Fredoka'] max-w-[400px] 2xl:max-w-[800px]">
                    Sorry about that! please visit our homepage to get where you need to go.
                </p>
                <Link href="/" className="flex items-center justify-center xl:w-[300px] xl:h-[90px] w-[200px] h-[70px]  rounded-[22px] bg-[#3F627C] text-[#fff] text-['Fredoka'] font-[500] text-[20px] xl:text-[24px] hover:bg-[#3f627c99]">
                Take me there</Link>
            </div>
        </div>
    )
}