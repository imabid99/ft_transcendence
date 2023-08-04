import Image from 'next/image'

export default function About() {
    return (
        <div id="Pong" className='snap-center  bg-[#EAF5FF] w-full min-h-[100vh] flex  justify-between  items-center  pb-[100px]  z-[1] pl-[150px]'>
            <div className="w-[746px] h-[65vh]">
                <h1 className="pong  text-[100px] font-[Poppins] font-[700] justify-self-start height-[225px]'">ABOUT</h1>
                <p className='text-[#064A85] text-[30px] font-[Poppins] font-[500] tify-self-start ne-height-[225px]'>
                    A Pong game website is a web
                    based platform that allows users to play the classic Pong game directly from their web browser. The website typically provides a simple, user-friendly interface that makes it easy to start and play the game.
                </p>
            </div>
            <div className="mr-[-200px] mt-[50px]">
                <div className="relative w-[1500px]  2xl:max-4xl:w-[1200px] z-[2]">
                    <Image 
                    alt=''
                    width={1000}
                    height={100}
                    className=" w-[1578px] z-[5] "
                    src='/Vector 6.png' />
                    <Image src="/head/Group15.png" alt="" width={1200} height={0} className='absolute bottom-0 left-0 object-cover -z-[1]'/>
                </div>
            </div>
        </div>
    )
}
