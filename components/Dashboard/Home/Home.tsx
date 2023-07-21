'use client'

import Header from "./Header/Header"
import Body from "./Body/Body"
import { useState , useRef} from 'react'
import LeaderModal from "./LeaderModal/LeaderModal";

export default function Home() {
    const HeadermodalRef = useRef(null);
    const leaderRef = useRef(null);
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
            console.log(Ref.current.classList)
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
        <div className="flex flex-col px-[62px] py-[60px] w-[calc(100%-150px)] bg-[#FAFDFF]  ml-[150px] h-[100vh] overflow-y-scroll gap-[52px] relative no-scrollbar">
            {!show && <div className='w-full h-full fixed top-0 left-0 z-[51]' onClick={() => handelClose(HeadermodalRef)}></div>}
            <Header  show={show} modalRef={HeadermodalRef} handelShaw={handelShaw}/>
            <Body leaderRef={leaderRef} handelShaw={handelShaw} />
            {showModal && <div className=" glass w-full h-full fixed top-0 left-0 z-[50] bg-[#fff] opacity-[0.9] filter blur-[4px]"/>}
            <LeaderModal leaderRef={leaderRef} handelClose={handelClose}/>
        </div>
    )
}