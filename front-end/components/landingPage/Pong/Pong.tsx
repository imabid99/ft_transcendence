import Image from "next/image"
export default function Pong()
{
    return (
        <div id="Pong" className='snap-center  bg-[#EAF5FF] w-full min-h-[100vh] flex  justify-between  items-center pt-[300px] z-[1] pr-[150px]'>
            <div className="ml-[-200px] mt-[50px]">
                <div className="relative  z-[2]
                ">
                <Image 
                    alt=''
                    width={1000}
                    height={100}
                    className=" z-[5] w-[1800px]
                    2xl:max-4xl:w-[1600px]
                    "
                    src='/about.png' />
                    <Image
                    alt=''
                    width={1000}
                    height={1000}
                    className=" w-[320px] absolute  -z-[1] bottom-[100px] -right-[calc(100%-150px)] filter blur-[2px]"
                    src='/aboutf.png' />
                    <Image src="/head/Group15.png" alt="" width={1200} height={0} className='absolute top-0 left-0 object-cover z-[1]'/>
                    <Image src="/head/Group15.png" alt="" width={1200} height={0} className='absolute bottom-0 left-0 object-cover -z-[1]'/>
                </div>
                
            </div>
            <div className="w-[746px]  right-[250px] top-[100px] h-[65vh]">
                <h1 className="pong  text-[100px] font-[Poppins] font-[700] tify-self-start ne-height-[225px]'">PONG</h1>
                <p className='text-[#064A85] text-[30px] font-[Poppins] font-[500] tify-self-start ne-height-[225px]'>
                    Pong is a classic arcade-style video game that was first released in 1972. It is a two-player game that simulates table tennis, with players using virtual paddles to hit a ball back and forth across a digital net. The game is played on a simple black-and-white 2D screen with a low resolution.
                </p>
            </div>
        </div>
    )
}