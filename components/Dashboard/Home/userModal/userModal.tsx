import { type } from "os";
import { useRef } from "react"
import { useImperativeHandle } from "react"

type ModalRef = {
    modalRef: any,
}


export default function UserModal ({modalRef}: ModalRef) {
    return (
        <div className='modal-user absolute w-[270px] h-[292px]  bg-[#FFF] bottom-[0px] left-[75px] z-[55] rounded-[37px] translate-y-[300px] -translate-x-[85px] overflow-hidden flex flex-col items-end justify-center hidden'
            ref={modalRef}>
            <img src="/modalbg.jpg" alt="" className="w-[500px] rounded-[37px] absolute top-[0px] left-[0px] z-[0]"/>
            <div className='z-[1] w-full h-full flex flex-col items-center  gap-[20px] relative'>
                <span className='absolute z-[1]'>
                    <svg width="602" height="374" viewBox="0 0 602 374" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_1692_2653)">
                        <path d="M182.621 92.1328C153.639 100.162 162.41 107.869 144.518 119.046L120.875 150.518C109.435 182.955 86.2507 248.213 85.0304 249.754C83.8102 251.296 119.604 281.227 137.654 296H492.673C509.197 232.84 534.741 126.241 498.743 109.799C462.746 93.3568 463.28 110.76 423.27 116.797C401.504 119.431 385.839 94.4456 367.184 95.6655C333.216 95.6655 268.801 100.807 244.777 109.799C229.567 115.492 215.003 89.9495 182.621 92.1328Z" fill="white"/>
                    </g>
                    <defs>
                        <filter id="filter0_d_1692_2653" x="0" y="0" width="602" height="374" filterUnits="userSpaceOnUse" >
                        <feFlood  result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dy="-7"/>
                        <feGaussianBlur stdDeviation="42.5"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1692_2653"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1692_2653" result="shape"/>
                        </filter>
                    </defs>
                    </svg>
                </span>
                <div className='flex flex-col items-center gap-[10px] w-full h-full justify-end z-[2]'>
                    <div className="relative after:animate-ping">
                        <img className="w-[110px] h-[110px] rounded-full outline  outline-[5px] outline-[#FFF] "
                        src="https://i.pravatar.cc/150?img=3" alt="" />
                    </div>
                    <div className='text-center'>
                        <p className="font-[Poppins] text-[16px] font-[600] text-[#00539D]">Ahmed kamal</p>
                        <p className="font-[Poppins] text-[14px] font-[6500] text-[#AEBAC7]">akamal</p>
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