import { useRef } from "react"
import { useImperativeHandle } from "react"

type ModalRef = {
    modalRef: any,
}


export default function UserModal ({modalRef}: ModalRef) {
    return (
        <div className='modal-user absolute w-[270px] h-[292px]  bg-[#FFF] bottom-[0px] left-[75px] z-[55] rounded-[37px] translate-y-[300px] -translate-x-[85px] overflow-hidden  flex-col items-end justify-center hidden'
            ref={modalRef}>
            <img src="/modalbg.jpg" alt="" className="w-[500px] rounded-[37px] absolute top-[0px] left-[0px] z-[2] object-cover" />
            <div className='z-[2] w-full h-full flex flex-col items-center  gap-[20px] relative'>
                <span className='absolute z-[1] w-[350px] top-[50px] -left-[50px]'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path fill="#FFF"  d="M0,256L21.8,234.7C43.6,213,87,171,131,149.3C174.5,128,218,128,262,149.3C305.5,171,349,213,393,224C436.4,235,480,213,524,186.7C567.3,160,611,128,655,106.7C698.2,85,742,75,785,85.3C829.1,96,873,128,916,144C960,160,1004,160,1047,160C1090.9,160,1135,160,1178,138.7C1221.8,117,1265,75,1309,80C1352.7,85,1396,139,1418,165.3L1440,192L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"></path>
                    </svg>
                    <div className="w-[950px] h-[600px] bg-[#FFF] z-[1] mt-[-10px]">
                    </div>
                </span>
                <div className='flex flex-col items-center gap-[10px] w-full h-full justify-end z-[2] '>
                    <div className="relative after:animate-ping">
                        <img className="w-[110px] h-[110px] rounded-full outline  outline-[5px] outline-[#FFF] object-cover" 
                        src="/userProfile.jpg" alt="" />
                    </div>
                    <div className='text-center'>
                        <p className="font-[Poppins] text-[16px] font-[600] text-[#00539D]">Achraf Sabbar</p>
                        <p className="font-[Poppins] text-[14px] font-[6500] text-[#AEBAC7]">asabbar</p>
                    </div>
                    <div className='flex gap-[20px] pb-[15px]'>
                        <span className='felx flex-col items-center justify-center'>
                                <span className='flex items-center gap-[5px]'>
                                <p className='text-[20px] font-[700] text-[#064A85]'>
                                    25
                                </p>  
                                <span>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 16L0 5.33333L2.7 0H15.3L18 5.33333L9 16ZM6.8625 4.44444H11.1375L9.7875 1.77778H8.2125L6.8625 4.44444ZM8.1 12.1556V6.22222H3.105L8.1 12.1556ZM9.9 12.1556L14.895 6.22222H9.9V12.1556ZM13.14 4.44444H15.525L14.175 1.77778H11.79L13.14 4.44444ZM2.475 4.44444H4.86L6.21 1.77778H3.825L2.475 4.44444Z" fill="#064A85"/>
                                    </svg>
                                </span>  
                            </span>   
                            <p className='text-[10px] font-[300] text-[#4C7CA6]'>
                                Rewards
                            </p>
                        </span>
                        <div className='line w-[1px] h-[52px] bg-[#537DA3]'></div>
                        <span className='felx flex-col items-center justify-center'>
                                <span className='flex items-center gap-[5px]'>
                                <p className='text-[20px] font-[700] text-[#064A85]'>
                                    20
                                </p>  
                                <span>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 12L0 1L5.5 6L9 0L12.5 6L18 1L16 12H2ZM16 15C16 15.6 15.6 16 15 16H3C2.4 16 2 15.6 2 15V14H16V15Z" fill="#064A85"/>
                                    </svg>
                                </span>  
                            </span>   
                            <p className='text-[10px] font-[300] text-[#4C7CA6]'>
                                Win matches
                            </p>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}