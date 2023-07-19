import Image from "next/image"
export default function Pong()
{
    return (
        <div id="Pong" className='snap-center  bg-[#EAF5FF] w-full h-[100vh] flex  justify-center py-[300px] gap-[50vw] z-[1]'>
            <div className="w-[1500px] h-full relative ">
                <div className='absolute h-[70%] max-w-[700px] pr-[200px] top-1/2 -left-[50px] transform -translate-y-1/2 z-[6]'>
                    <div className="relative w-[1000px]">
                    <Image 
                        alt=''
                        width={1000}
                        height={100}
                        className=" min-w-[1000px] z-[6] "
                        src='/about.png' />
                       <Image
                        alt=''
                        width={1000}
                        height={1000}
                        className=" w-[320px] absolute  -z-[1] -bottom-[20px] -right-[180px] filter blur-[2px]"
                        src='/aboutf.png' />
                    </div>
                    
                </div>
                <div className="w-[500px]  self-start absolute right-[50px] top-[100px] h-[65vh]">
                    <h1 className=" text-[#46AEF7] text-[90px] font-[Poppins] font-[700] tify-self-start ne-height-[225px]'">PONG</h1>
                    <p className='text-[#46AEF7] text-[20px] font-[Poppins] font-[400] tify-self-start ne-height-[225px]'>
                        Pong is a classic arcade-style video game that was first released in 1972. It is a two-player game that simulates table tennis, with players using virtual paddles to hit a ball back and forth across a digital net. The game is played on a simple black-and-white 2D screen with a low resolution.
                    </p>
                </div>
            </div>
        </div>
    )
}