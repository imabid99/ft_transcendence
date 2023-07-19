import Header from "./Header/Header"
import Body from "./Body/Body"
import { useState , useRef} from 'react'
import RightSide from "./RightSide/RightSide"

export default function Home() {
    const modalRef = useRef(null);
    const [show, setShow] = useState(true);
    const handelShaw = () => {
        if (modalRef.current.classList.contains('hidden')) 
            setShow(false)
            else {
                setShow(true)
            }
            console.log('clicked');
            modalRef.current.classList.toggle('hidden');
        }
    const handelClose = () => {
        modalRef.current.classList.add('hidden')
        setShow(true)
    }
    return (
        <div className="flex flex-col px-[62px] py-[60px] w-[calc(100%-150px)] bg-[#FAFDFF]  ml-[150px] h-[100vh] overflow-y-scroll gap-[52px] relative no-scrollbar">
            {!show && <div className='w-full h-full fixed top-0 left-0 z-[51]' onClick={handelClose}></div>}
            <Header  show={show} modalRef={modalRef} handelShaw={handelShaw}/>
            <Body />
            <div className=" glass w-full h-full fixed top-0 left-0 z-[50] bg-[#FFF] opacity-[0.9] filter blur-[4px]">
            </div>
            <div className="flex flex-col gap-[35px] justify-start min-w-[550px] min-h-[95vh] bg-[#FFF] z-[55] top-[50%] right-10 absolute translate-y-[-50%] rounded-[42px] shadooow">
                <div className="flex justify-between items-center px-[40px] py-[30px] border-b-[1px] border-[#E5E5E5]">
                    <span className="flex gap-[10px] items-center font-[Poppins] font-[600] text-[20px] text-[#00539D] h-[35px]">
                        <svg width="30" height="26" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.5 26C1.075 26 0.718505 25.8613 0.430505 25.584C0.142505 25.3067 -0.000994809 24.9638 5.19031e-06 24.5555V10.1111C5.19031e-06 9.70185 0.144005 9.35856 0.432005 9.08122C0.720005 8.80389 1.076 8.6657 1.5 8.66667H6.75C7.175 8.66667 7.5315 8.80533 7.8195 9.08267C8.1075 9.36 8.251 9.70282 8.25 10.1111V24.5555C8.25 24.9648 8.106 25.3081 7.818 25.5854C7.53 25.8628 7.174 26.001 6.75 26H1.5ZM12.375 26C11.95 26 11.5935 25.8613 11.3055 25.584C11.0175 25.3067 10.874 24.9638 10.875 24.5555V1.44445C10.875 1.03519 11.019 0.691894 11.307 0.41456C11.595 0.137227 11.951 -0.000957964 12.375 4.99808e-06H17.625C18.05 4.99808e-06 18.4065 0.138672 18.6945 0.416005C18.9825 0.693338 19.126 1.03615 19.125 1.44445V24.5555C19.125 24.9648 18.981 25.3081 18.693 25.5854C18.405 25.8628 18.049 26.001 17.625 26H12.375ZM23.25 26C22.825 26 22.4685 25.8613 22.1805 25.584C21.8925 25.3067 21.749 24.9638 21.75 24.5555V13C21.75 12.5907 21.894 12.2474 22.182 11.9701C22.47 11.6928 22.826 11.5546 23.25 11.5556H28.5C28.925 11.5556 29.2815 11.6942 29.5695 11.9716C29.8575 12.2489 30.001 12.5917 30 13V24.5555C30 24.9648 29.856 25.3081 29.568 25.5854C29.28 25.8628 28.924 26.001 28.5 26H23.25Z" fill="#02539D"/>
                        </svg>
                        <p className="font-[Poppins] font-[600] text-[20px] text-[#00539D] max-h-[30px]">
                            LEADERBOARD
                        </p>
                    </span>
                    <span className="cursor-pointer bg-[#DAEDFF] p-[12px] rounded-[11px]" onClick={handelClose}>
                        <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" >
                            <path d="M1 1L19 19M19 1L1 19" stroke="#16558D" stroke-width="5" stroke-linecap="round"/>
                        </svg>
                    </span>
                </div>
                <div className=" w-full flex justify-center leaderboard bg-[transparent]">
                    <div className="flex justify-center items-end gap-[2px]  h-[calc(100%-56px)] overflow-hidden px-[42px] pt-[50px] border border-[#E5E5E5] rounded-[42px]">
                        <div className="flex flex-col items-center justify-center gap-[10px]">
                            <span className="flex flex-col items-center justify-center gap-[10px] relative">
                                <img src="https://i.pravatar.cc/" alt="" className=" w-[80px] h-[80px] rounded-full object-cover shadow-4xl" />
                                <p className="text-[10px] font-[700] font-[Poppins] text-[#6C8BD8]">
                                    Asabbar
                                </p>
                                <span className="absolute top-[0px] right-[0px] w-[18px] h-[18px] rounded-full bg-[#6C8BD8] text-[10px] font-[400] font-[Poppins] text-[#FFF] flex justify-center items-center
                                outline outline-[2px] outline-[#FFF]
                                "
                                >2</span>
                            </span>
                            <div className="min-w-[90px] h-[151px] rounded-t-[20px] bg-[#338AC8]" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <img src="/crown.svg" alt="" className="w-[25px]" />
                            <div className="flex flex-col items-center justify-center gap-[10px]">
                                <span className="flex flex-col items-center justify-center gap-[10px] relative">
                                    <img src="https://i.pravatar.cc/" alt="" className=" w-[80px] h-[80px] rounded-full object-cover shadow-4xl" />
                                    <p className="text-[10px] font-[700] font-[Poppins] text-[#6C8BD8]">
                                        Asabbar
                                    </p>
                                <span className="absolute top-[0px] right-[0px] w-[18px] h-[18px] rounded-full bg-[#03539D] text-[10px] font-[400] font-[Poppins] text-[#FFF] flex justify-center items-center
                                outline outline-[2px] outline-[#FFF]
                                "
                                >1</span>
                                </span>
                                <div className="min-w-[90px] h-[198px] rounded-t-[20px] bg-[#004A8B] opacity-[0.8] shadow-5xl" />
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-[10px]">
                            <span className="flex flex-col items-center justify-center gap-[10px] relative">
                                <img src="https://i.pravatar.cc/" alt="" className=" w-[80px] h-[80px] rounded-full object-cover shadow-4xl" />
                                <p className="text-[10px] font-[700] font-[Poppins] text-[#6C8BD8]">
                                    Asabbar
                                </p>
                                <span className="absolute top-[0px] right-[0px] w-[18px] h-[18px] rounded-full bg-[#4CC0ED] text-[10px] font-[400] font-[Poppins] text-[#FFF] flex justify-center items-center
                                outline outline-[2px] outline-[#FFF]
                                "
                                >3</span>
                            </span>
                            <div className="min-w-[90px] h-[124px] rounded-t-[20px] bg-[#4cc0edb8] shadow-6xl" />
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}