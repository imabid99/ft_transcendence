import Link from 'next/link'

export default function NotUser() {
    return (
            <div className="h-screen w-screen bg-center relative">
                <div className="dark-im z-10" />
                <img
                src="7nafcl.png"
                alt=""
                className="absolute h-screen w-screen object-cover z-[-1]"
                />
                <div className="flex justify-center items-center flex-col gap-[62px] h-full relative z-50 md:pl-[100px]">
                    <p className="text-white text-[40px] font-[400] capitalize textSh text-center font-['Fredoka'] max-w-[400px]    absolute top-[350px]  ">
                        Looks like you got lost!
                    </p>
                    <Link href="/Profile" className="w-[170px] h-[60px]  rounded-[14px] bg-[#577c98] text-[#fff] text-['Fredoka'] font-[500] text-[15px]  hover:bg-[#3f627c99] absolute top-[480px] flex items-start justify-center">Your Profile</Link>
                </div>
            </div>
    )
}