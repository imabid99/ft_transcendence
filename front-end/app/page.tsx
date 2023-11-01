import Image from "next/image"
import Dashboard from "@/components/Dashboard/Dashboard/Dashboard"
import HomeDash from "@/components/Dashboard/Home/Home"
export default function Page() {
  return (
    // <div className="h-[100vh] w-[100vw] flex justify-center items-center bg-[#EAF5FF]">
    //   <div className="container max-w-[1536px] h-full px-[150px]">
    //     <div className="flex justify-between items-center h-[150px] w-full ">
    //       <span>
    //         <Image
    //           src="/logo.png"
    //           alt=""
    //           width={500}
    //           height={500}
    //           className="w-[70px] h-[70px]"
    //         />
    //       </span>
    //       <button className="text-white text-[Poppins] text-[20px] font-[700] myButton w-[144px] h-[54px] rounded-[8px]">
    //         Login
    //       </button>
    //     </div>
    //     <div className="flex justify-between  w-full ">
    //         <div className="relative flex flex-col justify-center gap-[50px]">
    //           <h1 className="text-[Poppins] text-[60px] font-[700] text-[#064A85] relative">
    //             <Image
    //               src="/balls.png"
    //               alt=""
    //               width={500}
    //               height={500}
    //               className="w-[500px] absolute top-[0px] left-[0px] "
    //             />
    //             Ping <span className="home__center__text">PONG</span> <br />Let The Fun Begin.
    //           </h1>
    //           <p className="max-w-[600px] text-[Poppins] text-[1.5rem] font-[700] text-[#064A85]">
    //             Whether you're a seasoned pro or a beginner, we have everything you need to improve your game and have fun on the table.
    //           </p>
    //           <button className="text-white text-[Poppins] text-[1rem] font-[700] myButton w-[144px] h-[54px] rounded-[8px]">
    //             PLAY NOW
    //           </button>
    //         </div>
    //         <div className="relative z-[3]">
    //           <Image
    //             src="/testhero.png" 
    //             alt=""
    //             width={939}
    //             height={939}
    //             className="w-[739px] z-[10]"
    //           />
    //           <Image
    //             src="/Group186.png"
    //             alt=""
    //             width={500}
    //             height={500}
    //             className="w-[150px] absolute bottom-[550px] right-[0px] z-[-1]"
    //           />

    //         </div>
    //     </div>
    //   </div>
    // </div>
    <>
      <Dashboard path='Home'/>
      <div className='h-[100vh] w-[100vw] flex pl-[150px] bg-[#FAFDFF] lsm:max-lg:overflow-x-hidden lsm:max-lg:pl-[100px] lsm:max-sm:pl-[0px]'>
        <HomeDash />
      </div>
    </>
  )
}
