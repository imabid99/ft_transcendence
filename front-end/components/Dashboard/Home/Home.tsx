'use client'

import Header from "./Header/Header"
import Body from "./Body/Body"
import { useState , useRef} from 'react'
import RightModal from "./Modal/Modal"
import LeaderModal from "./LeaderModal/LeaderModal"
import User from "./LeaderModal/User"

export default function Home() {
    const HeadermodalRef = useRef(null);
    const leaderRef = useRef(null);
    const notifRef = useRef(null);
    const notifIconRef = useRef(null);
    const [show, setShow] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const handelShaw = (Ref: any) => {
        if (Ref.current.classList.contains('hidden'))
        {
            setShow(false)
            Ref.current.classList.toggle('hidden');

        }
        else if(Ref.current.classList.contains('LeaderModal'))
        {
            Ref.current.classList.remove('right-[-6000px]');
            Ref.current.classList.add('right-[60px]');
            setShowModal(true)
        }
        else {
            setShow(true)
            Ref.current.classList.toggle('hidden');
        }
    }
    const handelClose = (Ref : any) => {
        if(Ref.current.classList.contains('LeaderModal'))
        {
            Ref.current.classList.remove('right-[60px]');
            Ref.current.classList.add('right-[-6000px]');
            setShowModal(false)
        }
        else
        {
            Ref.current.classList.add('hidden')
            setShow(true)
        }
    }
    
    return (
        <div className="flex flex-col px-[10px] sm:px-[62px] py-[60px] w-full bg-[#FAFDFF]  h-[100vh] overflow-y-scroll overflow-x-hidden gap-[52px] relative no-scrollbar ">
            {!show && <div className='w-full h-full fixed top-0 left-0 z-[51]' onClick={() => handelClose(HeadermodalRef)}></div>}
            <Header  show={show} notifRef={notifRef} modalRef={HeadermodalRef} handelShaw={handelShaw} notifIconRef={notifIconRef}/>

            <Body leaderRef={leaderRef} handelShaw={handelShaw} />
            {showModal && <div className=" w-full h-full fixed top-0 left-0 z-[54]  inset-0 bg-black bg-opacity-5 backdrop-blur-[1.5px]"/>}

            <RightModal leaderRef={leaderRef}>
                <LeaderModal leaderRef={leaderRef} handelClose={handelClose}/>
            </RightModal>
            <RightModal leaderRef={notifRef}>
                <div className="flex justify-between items-center px-[40px] py-[30px] border-b-[1px] border-[#E5E5E5]">
                    <span className="flex gap-[10px] items-center font-[Poppins] font-[600] text-[20px] text-[#00539D] h-[35px]">
                        <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.66014 16.3665C7.11244 16.2661 9.86851 16.2661 10.3208 16.3665C10.7075 16.4603 11.1256 16.6794 11.1256 17.1578C11.1031 17.6132 10.8487 18.017 10.4971 18.2734C10.0412 18.6466 9.50613 18.8829 8.94683 18.9681C8.6375 19.0102 8.33357 19.0111 8.03503 18.9681C7.47482 18.8829 6.93979 18.6466 6.48479 18.2725C6.1323 18.017 5.87783 17.6132 5.85535 17.1578C5.85535 16.6794 6.27348 16.4603 6.66014 16.3665ZM8.54389 0C10.4259 0 12.3484 0.937668 13.4904 2.49343C14.2314 3.49521 14.5713 4.49602 14.5713 6.05179V6.45651C14.5713 7.64965 14.8716 8.3529 15.5325 9.16331C16.0334 9.76036 16.1935 10.5268 16.1935 11.3582C16.1935 12.1887 15.9336 12.9771 15.4129 13.6172C14.7313 14.3846 13.7701 14.8745 12.7891 14.9596C11.3674 15.0869 9.94486 15.194 8.50343 15.194C7.0611 15.194 5.63945 15.1299 4.2178 14.9596C3.23587 14.8745 2.27461 14.3846 1.59391 13.6172C1.07327 12.9771 0.8125 12.1887 0.8125 11.3582C0.8125 10.5268 0.973458 9.76036 1.47342 9.16331C2.15502 8.3529 2.43557 7.64965 2.43557 6.45651V6.05179C2.43557 4.45392 2.81504 3.40909 3.59645 2.38627C4.75822 0.894612 6.62048 0 8.46296 0H8.54389Z" fill="#02539D"/>
                        </svg>
                        <p className="font-[Poppins] font-[600] text-[20px] text-[#00539D] max-h-[30px]">
                            Notifications
                        </p>
                    </span>
                    <span className="cursor-pointer bg-[#DAEDFF] p-[12px] rounded-[11px]" onClick={() => handelClose(notifRef)}>
                        <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" >
                            <path d="M1 1L19 19M19 1L1 19" stroke="#16558D" />
                        </svg>
                    </span>
                </div>
            </RightModal>
        </div>
    )
}

// 1745