'use client';
import HandlRightClick from "./HandlRightClick"
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { contextdata } from "@/app/contextApi";
import Link from "next/link";

type ChannelInfoProps = {
    infoRef: any,
    handleshowInfo: any,
    group: any,
    userId: number,
}

export default function ChannelInfo({infoRef, handleshowInfo, group, userId}: ChannelInfoProps) {
    const [showAccessPassword, setShowAccessPassword] = useState<boolean>(false);
    const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
    const mytype = group?.channel.Owners.find((owner: any) => owner.id === userId) ? 3 : group?.channel.Admins.find((admin: any) => admin.id === userId) ? 2 : 1;
    const {socket, profiles}: any = useContext(contextdata);
    const router = useRouter();
    const [password, setPassword] = useState<string>("");

    const handleExit = () => {
        socket.emit("leaveGroup", {groupId: group?.channel.id});
        handleshowInfo();
        router.push("/Chat");
    }
    const handleRemove = () => {
        socket?.emit("removeGroupPass", {groupId: group?.channel.id});
        setShowAccessPassword(false);
    }
    
    const handleSetAccessPassword = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (!password) return;
        socket?.emit("setGroupPass", {groupId: group?.channel.id, password: password});
        setShowAccessPassword(false);
        setShowPasswordModal(false);
    }

    return (
        <div className="h-[100vh] bg-[#FFF] lsm:max-sm:w-[100vw] sm:min-w-[524px] fixed right-[-700px] top-0 z-[60] groupInfo p-[42px] !pb-0 ease-in duration-300 delay-100 "
            ref={infoRef}>
            <div className="w-full h-full  flex relative  flex-col gap-[30px] overflow-y-scroll no-scrollbar ">
                <div className="w-full flex items-center justify-between">
                    <div onClick={handleshowInfo} className="flex items-center gap-[14px] cursor-pointer">
                        <span>
                            <svg width="9" height="13" viewBox="0 0 9 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.04118 12.0012C6.56787 12.0017 6.1088 11.8393 5.74118 11.5412L0.64118 7.33117C0.441185 7.17195 0.279673 6.96968 0.168662 6.73941C0.0576506 6.50914 0 6.2568 0 6.00117C0 5.74554 0.0576506 5.49319 0.168662 5.26292C0.279673 5.03265 0.441185 4.83038 0.64118 4.67117L5.74118 0.461168C6.04821 0.215162 6.41818 0.0603538 6.80891 0.0143849C7.19965 -0.031584 7.59544 0.0331352 7.95118 0.201168C8.26035 0.337447 8.52377 0.559841 8.70996 0.841787C8.89615 1.12373 8.99725 1.45331 9.00118 1.79117V10.2112C8.99725 10.549 8.89615 10.8786 8.70996 11.1606C8.52377 11.4425 8.26035 11.6649 7.95118 11.8012C7.66531 11.9312 7.35521 11.9993 7.04118 12.0012Z" fill="#00498A"/>
                            </svg>
                        </span>
                        <p className="text-[#00498A] text-[30px] font-[Poppins] font-[600]">
                            Group info
                        </p>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-[5px] justify-center items-center relative">
                    <img src={`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/${group?.channel.avatar}`} alt="" className="rounded-full w-[250px] h-[250px] object-cover"/>
                    <p className="text-[#024077] text-[35px] font-[Poppins] font-[700]">
                        {group.channel.name}
                    </p>
                    <p className="text-[#064A85] text-[20px] font-[Poppins] font-[400]">
                        {group.channel.Members.length} members
                    </p>
                    {
                        showAccessPassword &&
                            <div className="min-h-full w-full absolute top-0 left-0 bg-white flex  justify-center  gap-[20px] lsm:max-sm:flex-col lsm:max-sm:justify-start lsm:max-sm:items-center">
                                    <button className="bg-[#00959C] px-[20px] py-[22px] flex justify-between items-center w-[220px] rounded-[11px]  max-h-[62px]" onClick={handleRemove}>
                                        <span>
                                            <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9.9749 0C12.7603 0 15.2218 1.7201 16.1303 4.26808C16.2259 4.52534 16.202 4.80598 16.0825 5.05154C15.9629 5.2971 15.749 5.48419 15.4848 5.56722C14.9468 5.75314 14.3491 5.47367 14.1458 4.93577C13.5362 3.20398 11.8637 2.04634 9.9988 2.04634C7.55888 2.04634 5.58757 3.96522 5.57442 6.31442V7.89303L5.56007 7.89537H14.9779C17.7513 7.89537 20 10.0949 20 12.8078V18.617C20 21.3299 17.7513 23.5294 14.9779 23.5294H5.02092C2.24866 23.5294 0 21.3299 0 18.617V12.8078C0 10.5767 1.53019 8.7139 3.61267 8.1152L3.48237 8.1304V6.33781C3.50628 2.84266 6.41243 0 9.9749 0ZM9.99402 13.3913C9.4202 13.3913 8.95398 13.8473 8.95398 14.4086V17.0045C8.95398 17.5775 9.4202 18.0335 9.99402 18.0335C10.5798 18.0335 11.046 17.5775 11.046 17.0045V14.4086C11.046 13.8473 10.5798 13.3913 9.99402 13.3913Z" fill="white"/>
                                            </svg> 
                                        </span>
                                        <p className="text-[#fff] text-[0.9em] font-[Poppins] font-[400]">
                                            Set Public
                                        </p>
                                        <span className="opacity-0">
                                            <svg width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12.5012 1.95882C12.5017 2.43213 12.3393 2.8912 12.0412 3.25882L7.83117 8.35882C7.67195 8.55881 7.46968 8.72033 7.23941 8.83134C7.00914 8.94235 6.7568 9 6.50117 9C6.24554 9 5.99319 8.94235 5.76292 8.83134C5.53265 8.72033 5.33038 8.55881 5.17117 8.35882L0.961168 3.25882C0.715162 2.95179 0.560354 2.58182 0.514385 2.19109C0.468416 1.80035 0.533135 1.40456 0.701168 1.04882C0.837447 0.739647 1.05984 0.476233 1.34179 0.290043C1.62373 0.103852 1.95331 0.00275326 2.29117 -0.0011797H10.7112C11.049 0.00275326 11.3786 0.103852 11.6606 0.290043C11.9425 0.476233 12.1649 0.739647 12.3012 1.04882C12.4312 1.33469 12.4993 1.64479 12.5012 1.95882Z" fill="white"/>
                                            </svg> 
                                        </span>
                                    </button>
                                    <div className="bg-[#508BBD] px-[20px] py-[22px] flex justify-between items-center w-[220px] rounded-[11px] max-h-[62px] relative">
                                        <span>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17.202 0C21.2676 0 24 2.8536 24 7.1004V16.9008C24 21.1476 21.2676 24 17.2008 24H6.7992C2.7324 24 0 21.1476 0 16.9008V7.1004C0 2.8536 2.7324 0 6.7992 0H17.202ZM8.2092 8.8788C6.4884 8.8788 5.088 10.2792 5.088 12C5.088 13.722 6.4884 15.1224 8.2092 15.1224C9.6156 15.1224 10.794 14.1816 11.1828 12.9H13.7172V14.2224C13.7172 14.7192 14.1204 15.1224 14.6172 15.1224C15.114 15.1224 15.5172 14.7192 15.5172 14.2224V12.9H17.1132V14.2224C17.1132 14.7192 17.5164 15.1224 18.0132 15.1224C18.51 15.1224 18.9132 14.7192 18.9132 14.2224V12C18.9132 11.5032 18.51 11.1 18.0132 11.1H11.1828C10.794 9.8196 9.6156 8.8788 8.2092 8.8788ZM8.20932 10.6787C8.93772 10.6787 9.53172 11.2715 9.53172 12.0011C9.53172 12.7295 8.93772 13.3223 8.20932 13.3223C7.48092 13.3223 6.88692 12.7295 6.88692 12.0011C6.88692 11.2715 7.48092 10.6787 8.20932 10.6787Z" fill="white"/>
                                            </svg> 
                                        </span>
                                        <p className="text-[#fff] text-[0.9em] font-[Poppins] font-[400]">
                                            Set password
                                        </p>
                                        <span className="cursor-pointer" onClick={()=> setShowPasswordModal(!showPasswordModal)}>
                                            {
                                                !showPasswordModal ?
                                                (
                                                    <svg width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12.5012 1.95882C12.5017 2.43213 12.3393 2.8912 12.0412 3.25882L7.83117 8.35882C7.67195 8.55881 7.46968 8.72033 7.23941 8.83134C7.00914 8.94235 6.7568 9 6.50117 9C6.24554 9 5.99319 8.94235 5.76292 8.83134C5.53265 8.72033 5.33038 8.55881 5.17117 8.35882L0.961168 3.25882C0.715162 2.95179 0.560354 2.58182 0.514385 2.19109C0.468416 1.80035 0.533135 1.40456 0.701168 1.04882C0.837447 0.739647 1.05984 0.476233 1.34179 0.290043C1.62373 0.103852 1.95331 0.00275326 2.29117 -0.0011797H10.7112C11.049 0.00275326 11.3786 0.103852 11.6606 0.290043C11.9425 0.476233 12.1649 0.739647 12.3012 1.04882C12.4312 1.33469 12.4993 1.64479 12.5012 1.95882Z" fill="white"/>
                                                    </svg> 
                                                )
                                                :
                                                (
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M9.78625 0.401124C9.90402 0.276612 10.0456 0.176973 10.2025 0.108097C10.3594 0.0392216 10.5286 0.00250718 10.6999 0.000123981C10.8713 -0.00225922 11.0414 0.0297372 11.2002 0.094222C11.359 0.158707 11.5033 0.254371 11.6244 0.375561C11.7456 0.49675 11.8413 0.641005 11.9058 0.799799C11.9703 0.958593 12.0023 1.1287 11.9999 1.30007C11.9975 1.47145 11.9608 1.6406 11.8919 1.79754C11.823 1.95448 11.7234 2.09602 11.5989 2.21379L7.84197 5.97077C7.837 5.97573 7.83305 5.98163 7.83036 5.98812C7.82766 5.99461 7.82628 6.00157 7.82628 6.00859C7.82628 6.01562 7.82766 6.02258 7.83036 6.02907C7.83305 6.03556 7.837 6.04146 7.84197 6.04642L11.5989 9.8034C11.7196 9.92209 11.8155 10.0635 11.8813 10.2195C11.947 10.3755 11.9812 10.5429 11.9819 10.7122C11.9827 10.8814 11.9498 11.0492 11.8854 11.2057C11.821 11.3622 11.7262 11.5044 11.6065 11.6241C11.4868 11.7438 11.3446 11.8386 11.1881 11.9031C11.0316 11.9676 10.8639 12.0004 10.6947 11.9998C10.5254 11.9991 10.358 11.9649 10.202 11.8992C10.046 11.8335 9.90454 11.7376 9.78582 11.6169L6.02891 7.85994C6.02395 7.85497 6.01805 7.85102 6.01156 7.84833C6.00507 7.84563 5.99811 7.84425 5.99109 7.84425C5.98406 7.84425 5.9771 7.84563 5.97061 7.84833C5.96412 7.85102 5.95822 7.85497 5.95326 7.85994L2.19635 11.6169C2.07765 11.7376 1.93624 11.8336 1.78027 11.8993C1.6243 11.9651 1.45685 11.9993 1.28759 12C1.11833 12.0007 0.950606 11.9679 0.794089 11.9035C0.637572 11.839 0.495362 11.7442 0.375661 11.6245C0.25596 11.5049 0.161138 11.3627 0.0966644 11.2062C0.0321905 11.0497 -0.000659172 10.882 1.00221e-05 10.7127C0.000679216 10.5434 0.0348541 10.376 0.100563 10.22C0.166273 10.064 0.262216 9.92255 0.382859 9.80383L4.13977 6.04685C4.14475 6.04188 4.14869 6.03599 4.15139 6.0295C4.15408 6.02301 4.15547 6.01605 4.15547 6.00902C4.15547 6.00199 4.15408 5.99504 4.15139 5.98855C4.14869 5.98205 4.14475 5.97616 4.13977 5.9712L0.382859 2.21422C0.145602 1.97312 0.0132246 1.64803 0.014562 1.30977C0.0158993 0.971509 0.150843 0.64748 0.389999 0.408263C0.629155 0.169046 0.953148 0.0340234 1.2914 0.0326063C1.62966 0.0311892 1.95477 0.163492 2.19592 0.400697L5.95283 4.15767C5.95779 4.16265 5.96369 4.1666 5.97018 4.16929C5.97667 4.17198 5.98363 4.17337 5.99066 4.17337C5.99768 4.17337 6.00464 4.17198 6.01113 4.16929C6.01762 4.1666 6.02352 4.16265 6.02848 4.15767L9.78539 0.400697L9.78625 0.401124Z" fill="white"/>
                                                    </svg> 
                                                )
                                            }
                                        </span>
                                        {
                                            showPasswordModal &&
                                            <form className="absolute -bottom-[160px] left-0 bg-[#518DC1] w-full px-[30px] py-[28px] flex flex-col gap-[24px] rounded-bl-[11px] rounded-br-[11px]" onSubmit={(e) => handleSetAccessPassword(e)}>
                                                <input autoFocus type="password" className="w-full outline-none h-[46px] text-[12px] text-[#083E6D] px-[24px] rounded-[9px]" onChange={(e) => setPassword(e.target.value)} placeholder="New password"/>
                                                <button className="bg-[#00959C]  w-full h-[46px] text-white text-[16px] font-[700] shadow-8xl rounded-[9px] flex justify-center items-center">
                                                    SAVE
                                                </button>
                                            </form>
                                        }
                                    </div>

                            </div>
                    }
                </div>
                <p className="text-[#064A85] text-[20px] font-[Poppins] font-[400] flex items-center gap-[10px]">
                    <span>
                        <svg width="26" height="20" viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 20V16.5C0 15.7917 0.172545 15.1404 0.517636 14.5463C0.862727 13.9521 1.32048 13.4992 1.89091 13.1875C3.11212 12.5417 4.35303 12.0571 5.61364 11.7338C6.87424 11.4104 8.15455 11.2492 9.45455 11.25C10.7545 11.25 12.0348 11.4117 13.2955 11.735C14.5561 12.0583 15.797 12.5425 17.0182 13.1875C17.5894 13.5 18.0475 13.9533 18.3926 14.5475C18.7377 15.1417 18.9099 15.7925 18.9091 16.5V20H0ZM21.2727 20V16.25C21.2727 15.3333 21.0312 14.4529 20.5483 13.6088C20.0653 12.7646 19.381 12.0408 18.4955 11.4375C19.5 11.5625 20.4455 11.7763 21.3318 12.0788C22.2182 12.3813 23.0455 12.7508 23.8136 13.1875C24.5227 13.6042 25.0644 14.0675 25.4386 14.5775C25.8129 15.0875 26 15.645 26 16.25V20H21.2727ZM9.45455 10C8.15455 10 7.04167 9.51043 6.11591 8.53127C5.19015 7.5521 4.72727 6.37502 4.72727 5.00002C4.72727 3.62503 5.19015 2.44795 6.11591 1.46878C7.04167 0.489615 8.15455 3.20508e-05 9.45455 3.20508e-05C10.7545 3.20508e-05 11.8674 0.489615 12.7932 1.46878C13.7189 2.44795 14.1818 3.62503 14.1818 5.00002C14.1818 6.37502 13.7189 7.5521 12.7932 8.53127C11.8674 9.51043 10.7545 10 9.45455 10ZM21.2727 5.00002C21.2727 6.37502 20.8099 7.5521 19.8841 8.53127C18.9583 9.51043 17.8455 10 16.5455 10C16.3288 10 16.053 9.97377 15.7182 9.92127C15.3833 9.86877 15.1076 9.81168 14.8909 9.75002C15.4227 9.08335 15.8316 8.34377 16.1176 7.53127C16.4036 6.71877 16.5462 5.87502 16.5455 5.00002C16.5455 4.12503 16.4028 3.28128 16.1176 2.46878C15.8324 1.65628 15.4235 0.916697 14.8909 0.250031C15.1667 0.145865 15.4424 0.0779488 15.7182 0.0462822C15.9939 0.0146156 16.2697 -0.000801281 16.5455 3.20508e-05C17.8455 3.20508e-05 18.9583 0.489615 19.8841 1.46878C20.8099 2.44795 21.2727 3.62503 21.2727 5.00002Z" fill="#04427A"/>
                        </svg>
                    </span>
                    members
                </p>
                <div className="w-full flex flex-col gap-[25px] overflow-y-scroll no-scrollbar min-h-[calc(300px)] h-[calc(100%-600px)]  max-h-[calc(100%-600px)] relative">
                    {
                        group?.channel.Members.map((member: any) => {
                            if (member.id !== userId)  return null;
                            const avatar = group.membersProfile.filter((profile: any) => profile.userId === member.id)[0]?.avatar;
                            return (
                                <HandlRightClick mytype={1} type={3} id={member.id}  key={`${member.id}`}>
                                    <Link href={`/profile/users/${member.id}`}>
                                        <div className="w-full flex items-center gap-[10px] justify-between cursor-pointer">
                                            <span className="flex items-center gap-[10px]">
                                                <img src={`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/${avatar}`} alt="" className="rounded-full w-[60px] h-[60px] object-cover"/>
                                                <span>
                                                    <p className="text-[#034B8A] text-[20px] font-[Poppins] font-[500] min-w-[200px]  max-w-[300px] truncate">
                                                        {member.username}
                                                    </p>
                                                </span>
                                            </span>
                                        </div>
                                    </Link>
                                    <>
                                        <span className="">
                                            me
                                        </span>
                                    </>
                                </HandlRightClick>
                            )
                        })
                    }
                    {
                        group?.channel.Owners.map((owner: any) => {
                            if (owner.id === userId)  return null;
                            const avatar = group.membersProfile.filter((profile: any) => profile.userId === owner.id)[0]?.avatar;
                            return (
                                <HandlRightClick mytype={mytype} type={3} id={owner.id}  key={`${owner.id}`}>
                                    <Link href={`/profile/users/${owner.id}`}>
                                        <div className="w-full flex items-center gap-[10px] justify-between cursor-pointer">
                                            <span className="flex items-center gap-[10px]">
                                                <img src={`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/${avatar}`}  alt="" className="rounded-full w-[60px] h-[60px] object-cover"/>
                                                <span>
                                                    <p className="text-[#034B8A] text-[20px] font-[Poppins] font-[500] min-w-[200px]  max-w-[300px] truncate">
                                                        {owner.username}
                                                    </p>
                                                </span>
                                            </span>
                                        </div>
                                    </Link>
                                    <>
                                        <span className="">
                                            owner
                                        </span>
                                        {
                                            userId !== owner.id && (
                                            <Link href="/Game">
                                                <svg stroke="currentColor" fill="currentColor"  viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M483.13 245.38C461.92 149.49 430 98.31 382.65 84.33A107.13 107.13 0 00352 80c-13.71 0-25.65 3.34-38.28 6.88C298.5 91.15 281.21 96 256 96s-42.51-4.84-57.76-9.11C185.6 83.34 173.67 80 160 80a115.74 115.74 0 00-31.73 4.32c-47.1 13.92-79 65.08-100.52 161C4.61 348.54 16 413.71 59.69 428.83a56.62 56.62 0 0018.64 3.22c29.93 0 53.93-24.93 70.33-45.34 18.53-23.1 40.22-34.82 107.34-34.82 59.95 0 84.76 8.13 106.19 34.82 13.47 16.78 26.2 28.52 38.9 35.91 16.89 9.82 33.77 12 50.16 6.37 25.82-8.81 40.62-32.1 44-69.24 2.57-28.48-1.39-65.89-12.12-114.37zM208 240h-32v32a16 16 0 01-32 0v-32h-32a16 16 0 010-32h32v-32a16 16 0 0132 0v32h32a16 16 0 010 32zm84 4a20 20 0 1120-20 20 20 0 01-20 20zm44 44a20 20 0 1120-19.95A20 20 0 01336 288zm0-88a20 20 0 1120-20 20 20 0 01-20 20zm44 44a20 20 0 1120-20 20 20 0 01-20 20z">
                                                    </path>
                                                </svg>
                                            </Link>)

                                        }
                                    </>
                                </HandlRightClick>
                            )
                        })
                    }
                    {
                        group?.channel.Admins.map((admin: any) => {
                            if (admin.id === userId)  return null;
                            if(group.channel.Muts?.find((mute: any) => mute.id === admin.id)) {
                                return null;
                            }
                            const avatar = group.membersProfile.filter((profile: any) => profile.userId === admin.id)[0]?.avatar;
                            return (
                                <HandlRightClick mytype={mytype} type={2} id={admin.id} groupId={group.channel.id}  key={`${admin.id}`}>
                                    <Link href={`/profile/users/${admin.id}`}>
                                        <div className="w-full flex items-center gap-[10px] justify-between cursor-pointer">
                                            <span className="flex items-center gap-[10px]">
                                                <img src={`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/${avatar}`}  alt="" className="rounded-full w-[60px] h-[60px] object-cover"/>
                                                <span>
                                                    <p className="text-[#034B8A] text-[20px] font-[Poppins] font-[500] min-w-[200px]  max-w-[300px] truncate">
                                                        {admin.username}
                                                    </p>
                                                </span>
                                            </span>
                                        </div>
                                    </Link>
                                    <>
                                        <span className="">
                                            Admin
                                        </span>
                                        {
                                            userId !== admin.id && (
                                                <Link href="/Game">
                                                    <svg stroke="currentColor" fill="currentColor"  viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M483.13 245.38C461.92 149.49 430 98.31 382.65 84.33A107.13 107.13 0 00352 80c-13.71 0-25.65 3.34-38.28 6.88C298.5 91.15 281.21 96 256 96s-42.51-4.84-57.76-9.11C185.6 83.34 173.67 80 160 80a115.74 115.74 0 00-31.73 4.32c-47.1 13.92-79 65.08-100.52 161C4.61 348.54 16 413.71 59.69 428.83a56.62 56.62 0 0018.64 3.22c29.93 0 53.93-24.93 70.33-45.34 18.53-23.1 40.22-34.82 107.34-34.82 59.95 0 84.76 8.13 106.19 34.82 13.47 16.78 26.2 28.52 38.9 35.91 16.89 9.82 33.77 12 50.16 6.37 25.82-8.81 40.62-32.1 44-69.24 2.57-28.48-1.39-65.89-12.12-114.37zM208 240h-32v32a16 16 0 01-32 0v-32h-32a16 16 0 010-32h32v-32a16 16 0 0132 0v32h32a16 16 0 010 32zm84 4a20 20 0 1120-20 20 20 0 01-20 20zm44 44a20 20 0 1120-19.95A20 20 0 01336 288zm0-88a20 20 0 1120-20 20 20 0 01-20 20zm44 44a20 20 0 1120-20 20 20 0 01-20 20z">
                                                        </path>
                                                    </svg>
                                                </Link>
                                            )
                                        }
                                    </>
                                </HandlRightClick>
                            )
                        })
                    }
                    {
                        group?.channel.Members.map((member: any) => {
                            if (member.id === userId)  return null;
                            if (group.channel.Owners.find((owner: any) => owner.id === member.id) || group.channel.Admins.find((admin: any) => admin.id === member.id) || group.channel.Muts?.find((mute: any) => mute.id === member.id)) {
                                return null;
                            }
                            const avatar = group.membersProfile.filter((profile: any) => profile.userId === member.id)[0]?.avatar;
                            return(
                                <HandlRightClick mytype={mytype} type={1} id={member.id} groupId={group.channel.id}  key={`${member.id}`}>
                                    <Link href={`/profile/users/${member.id}`} >
                                        <div className="w-full flex items-center gap-[10px] justify-between cursor-pointer">
                                            <span className="flex items-center gap-[10px]">
                                                <img src={`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/${avatar}`} alt="" className="rounded-full w-[60px] h-[60px] object-cover"/>
                                                <span>
                                                    <p className="text-[#034B8A] text-[20px] font-[Poppins] font-[500] min-w-[200px]  max-w-[300px] truncate">
                                                        {member.username}
                                                    </p>
                                                </span>
                                            </span>
                                        </div>
                                    </Link> 
                                    <>
                                        <span className="">
                                            memmber
                                        </span>
                                        {
                                            userId !== member.id && (
                                                <Link href="/Game">
                                                    <svg stroke="currentColor" fill="currentColor"  viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M483.13 245.38C461.92 149.49 430 98.31 382.65 84.33A107.13 107.13 0 00352 80c-13.71 0-25.65 3.34-38.28 6.88C298.5 91.15 281.21 96 256 96s-42.51-4.84-57.76-9.11C185.6 83.34 173.67 80 160 80a115.74 115.74 0 00-31.73 4.32c-47.1 13.92-79 65.08-100.52 161C4.61 348.54 16 413.71 59.69 428.83a56.62 56.62 0 0018.64 3.22c29.93 0 53.93-24.93 70.33-45.34 18.53-23.1 40.22-34.82 107.34-34.82 59.95 0 84.76 8.13 106.19 34.82 13.47 16.78 26.2 28.52 38.9 35.91 16.89 9.82 33.77 12 50.16 6.37 25.82-8.81 40.62-32.1 44-69.24 2.57-28.48-1.39-65.89-12.12-114.37zM208 240h-32v32a16 16 0 01-32 0v-32h-32a16 16 0 010-32h32v-32a16 16 0 0132 0v32h32a16 16 0 010 32zm84 4a20 20 0 1120-20 20 20 0 01-20 20zm44 44a20 20 0 1120-19.95A20 20 0 01336 288zm0-88a20 20 0 1120-20 20 20 0 01-20 20zm44 44a20 20 0 1120-20 20 20 0 01-20 20z">
                                                        </path>
                                                    </svg>
                                                </Link>
                                            )
                                        }
                                    </>
                                </HandlRightClick>
                            )
                        })
                    }
                    {
                        group?.channel.Muts?.map((mute: any) => {
                            if (mute.id === userId)  return null;
                            const avatar = group.membersProfile.filter((profile: any) => profile.userId === mute.id)[0]?.avatar;
                            return(
                                <HandlRightClick mytype={userId == mute.id ? 1 : mytype} type={1} id={mute.id} groupId={group.channel.id}  key={`${mute.id}`} isMute={true}>
                                    <div className='flex  items-center justify-between opacity-60 w-full'>
                                        <Link href={`/profile/users/${mute.id}`} >
                                            <div className="w-full flex items-center gap-[10px] justify-between cursor-pointer">
                                                <span className="flex items-center gap-[10px]">
                                                    <img src={`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/${avatar}`} alt="" className="rounded-full w-[60px] h-[60px] object-cover"/>
                                                    <span>
                                                        <p className="text-[#034B8A] text-[20px] font-[Poppins] font-[500] min-w-[200px]  max-w-[300px] truncate">
                                                            {mute.username}
                                                        </p>
                                                    </span>
                                                </span>
                                            </div>
                                        </Link> 
                                        <>
                                            <span className="">
                                                <svg width="23" height="23" viewBox="0 0 48 48" fill="#AF1C1C" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M24.86 8.2C24.5352 8.05949 24.1789 8.00767 23.8276 8.04983C23.4762 8.09199 23.1423 8.22663 22.86 8.44L13.3 16H6C5.46957 16 4.96086 16.2107 4.58579 16.5858C4.21071 16.9609 4 17.4696 4 18V30C4 30.5304 4.21071 31.0391 4.58579 31.4142C4.96086 31.7893 5.46957 32 6 32H13.3L22.76 39.56C23.1119 39.8423 23.5489 39.9974 24 40C24.2987 40.0049 24.5941 39.9362 24.86 39.8C25.2003 39.6379 25.4879 39.3829 25.6896 39.0644C25.8913 38.746 25.9989 38.377 26 38V10C25.9989 9.62303 25.8913 9.25404 25.6896 8.93556C25.4879 8.61709 25.2003 8.3621 24.86 8.2ZM22 33.84L15.24 28.44C14.8881 28.1577 14.4511 28.0026 14 28H8V20H14C14.4511 19.9974 14.8881 19.8423 15.24 19.56L22 14.16V33.84ZM39.82 24L43.42 20.42C43.6065 20.2335 43.7544 20.0121 43.8553 19.7685C43.9562 19.5249 44.0082 19.2637 44.0082 19C44.0082 18.7363 43.9562 18.4751 43.8553 18.2315C43.7544 17.9879 43.6065 17.7665 43.42 17.58C43.2335 17.3935 43.0121 17.2456 42.7685 17.1447C42.5249 17.0438 42.2637 16.9918 42 16.9918C41.7363 16.9918 41.4751 17.0438 41.2315 17.1447C40.9879 17.2456 40.7665 17.3935 40.58 17.58L37 21.18L33.42 17.58C33.0434 17.2034 32.5326 16.9918 32 16.9918C31.4674 16.9918 30.9566 17.2034 30.58 17.58C30.2034 17.9566 29.9918 18.4674 29.9918 19C29.9918 19.5326 30.2034 20.0434 30.58 20.42L34.18 24L30.58 27.58C30.3925 27.7659 30.2438 27.9871 30.1422 28.2309C30.0407 28.4746 29.9884 28.736 29.9884 29C29.9884 29.264 30.0407 29.5254 30.1422 29.7692C30.2438 30.0129 30.3925 30.2341 30.58 30.42C30.7659 30.6075 30.9871 30.7562 31.2308 30.8578C31.4746 30.9593 31.736 31.0116 32 31.0116C32.264 31.0116 32.5254 30.9593 32.7692 30.8578C33.0129 30.7562 33.2341 30.6075 33.42 30.42L37 26.82L40.58 30.42C40.7659 30.6075 40.9871 30.7562 41.2308 30.8578C41.4746 30.9593 41.736 31.0116 42 31.0116C42.264 31.0116 42.5254 30.9593 42.7692 30.8578C43.0129 30.7562 43.2341 30.6075 43.42 30.42C43.6075 30.2341 43.7562 30.0129 43.8578 29.7692C43.9593 29.5254 44.0116 29.264 44.0116 29C44.0116 28.736 43.9593 28.4746 43.8578 28.2309C43.7562 27.9871 43.6075 27.7659 43.42 27.58L39.82 24Z"/>
                                                </svg> 
                                            </span>
                                            {
                                                userId !== mute.id && (
                                                    <Link href="/Game">
                                                        <svg stroke="currentColor" fill="currentColor"  viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M483.13 245.38C461.92 149.49 430 98.31 382.65 84.33A107.13 107.13 0 00352 80c-13.71 0-25.65 3.34-38.28 6.88C298.5 91.15 281.21 96 256 96s-42.51-4.84-57.76-9.11C185.6 83.34 173.67 80 160 80a115.74 115.74 0 00-31.73 4.32c-47.1 13.92-79 65.08-100.52 161C4.61 348.54 16 413.71 59.69 428.83a56.62 56.62 0 0018.64 3.22c29.93 0 53.93-24.93 70.33-45.34 18.53-23.1 40.22-34.82 107.34-34.82 59.95 0 84.76 8.13 106.19 34.82 13.47 16.78 26.2 28.52 38.9 35.91 16.89 9.82 33.77 12 50.16 6.37 25.82-8.81 40.62-32.1 44-69.24 2.57-28.48-1.39-65.89-12.12-114.37zM208 240h-32v32a16 16 0 01-32 0v-32h-32a16 16 0 010-32h32v-32a16 16 0 0132 0v32h32a16 16 0 010 32zm84 4a20 20 0 1120-20 20 20 0 01-20 20zm44 44a20 20 0 1120-19.95A20 20 0 01336 288zm0-88a20 20 0 1120-20 20 20 0 01-20 20zm44 44a20 20 0 1120-20 20 20 0 01-20 20z">
                                                            </path>
                                                        </svg>
                                                    </Link>
                                                )
                                            }
                                        </>
                                    </div>
                                </HandlRightClick>
                            )
                        })
                    }
                    {
                        group?.channel.Band?.map((ban: any) => {
                            if (ban.id === userId)  return null;
                            const avatar = profiles?.filter((profile: any) => profile.userId === ban.id)[0]?.avatar;
                            return(
                                <HandlRightClick mytype={userId == ban.id ? 1 : mytype} type={1} id={ban.id} groupId={group.channel.id}  key={`${ban.id}`} isBan={true}>
                                    <div className='flex  items-center justify-between opacity-60 w-full'>
                                        <Link href={`/profile/users/${ban.id}`} >
                                            <div className="w-full flex items-center gap-[10px] justify-between cursor-pointer">
                                                <span className="flex items-center gap-[10px]">
                                                    <img src={`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/${avatar}`} alt="" className="rounded-full w-[60px] h-[60px] object-cover"/>
                                                    <span>
                                                        <p className="text-[#034B8A] text-[20px] font-[Poppins] font-[500] min-w-[200px]  max-w-[300px] truncate">
                                                            {ban.username}
                                                        </p>
                                                    </span>
                                                </span>
                                            </div>
                                        </Link> 
                                        <>
                                            {
                                                userId !== ban.id && (
                                                    <Link href="/Game">
                                                        <svg stroke="currentColor" fill="currentColor"  viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M483.13 245.38C461.92 149.49 430 98.31 382.65 84.33A107.13 107.13 0 00352 80c-13.71 0-25.65 3.34-38.28 6.88C298.5 91.15 281.21 96 256 96s-42.51-4.84-57.76-9.11C185.6 83.34 173.67 80 160 80a115.74 115.74 0 00-31.73 4.32c-47.1 13.92-79 65.08-100.52 161C4.61 348.54 16 413.71 59.69 428.83a56.62 56.62 0 0018.64 3.22c29.93 0 53.93-24.93 70.33-45.34 18.53-23.1 40.22-34.82 107.34-34.82 59.95 0 84.76 8.13 106.19 34.82 13.47 16.78 26.2 28.52 38.9 35.91 16.89 9.82 33.77 12 50.16 6.37 25.82-8.81 40.62-32.1 44-69.24 2.57-28.48-1.39-65.89-12.12-114.37zM208 240h-32v32a16 16 0 01-32 0v-32h-32a16 16 0 010-32h32v-32a16 16 0 0132 0v32h32a16 16 0 010 32zm84 4a20 20 0 1120-20 20 20 0 01-20 20zm44 44a20 20 0 1120-19.95A20 20 0 01336 288zm0-88a20 20 0 1120-20 20 20 0 01-20 20zm44 44a20 20 0 1120-20 20 20 0 01-20 20z">
                                                            </path>
                                                        </svg>
                                                    </Link>
                                                )
                                            }
                                        </>
                                    </div>
                                </HandlRightClick>
                            )
                        })
                    }
                </div>
                <span className=" w-full flex items-center justify-around gap-[25px] cursor-pointer pb-[25px]">
                    {
                        mytype === 3 && 
                        <div className="flex gap-[15px] items-center " onClick={() => setShowAccessPassword(!showAccessPassword)}>
                            <span>
                                <svg width="21" height="27" viewBox="0 0 16 20"  fill="#AF1C1C"  xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 7V5C13 2.2 10.8 0 8 0C5.2 0 3 2.2 3 5V7C1.3 7 0 8.3 0 10V17C0 18.7 1.3 20 3 20H13C14.7 20 16 18.7 16 17V10C16 8.3 14.7 7 13 7ZM5 5C5 3.3 6.3 2 8 2C9.7 2 11 3.3 11 5V7H5V5ZM9.1 13.5L9 13.6V15C9 15.6 8.6 16 8 16C7.4 16 7 15.6 7 15V13.6C6.4 13 6.3 12.1 6.9 11.5C7.5 10.9 8.4 10.8 9 11.4C9.6 11.9 9.7 12.9 9.1 13.5Z"/>
                                </svg> 
                            </span>
                            <p className="text-[#AF1C1C] text-[20px] font-[Poppins] font-[500]">
                                access pass
                            </p>
                        </div>
                    }
                    <div className="flex gap-[15px]" onClick={handleExit}>
                        <span>
                            <svg width="21" height="24" viewBox="0 0 21 24" fill="#AF1C1C" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.98349 0C10.3016 0.000376943 10.6075 0.130506 10.8388 0.363798C11.0701 0.59709 11.2093 0.915937 11.2279 1.25519C11.2465 1.59445 11.1432 1.92851 10.9391 2.18911C10.7349 2.44971 10.4453 2.6172 10.1295 2.65733L9.98349 2.66667H3.74381C3.43815 2.66671 3.14313 2.78661 2.91471 3.00362C2.6863 3.22063 2.54037 3.51967 2.50461 3.844L2.49587 4V20C2.49591 20.3266 2.60813 20.6418 2.81124 20.8858C3.01436 21.1299 3.29424 21.2858 3.5978 21.324L3.74381 21.3333H9.35952C9.67759 21.3337 9.98353 21.4638 10.2148 21.6971C10.4461 21.9304 10.5853 22.2493 10.6039 22.5885C10.6226 22.9278 10.5193 23.2618 10.3151 23.5224C10.111 23.783 9.82137 23.9505 9.50553 23.9907L9.35952 24H3.74381C2.78887 24.0001 1.87001 23.6102 1.17523 22.9103C0.480447 22.2103 0.0622626 21.2532 0.00623983 20.2347L5.81594e-09 20V4C-5.31892e-05 2.97972 0.364803 1.99798 1.01992 1.25565C1.67503 0.513324 2.57088 0.0665233 3.52417 0.00666682L3.74381 0H9.98349ZM17.1055 7.28533L20.6346 11.0573C20.8686 11.3074 21 11.6464 21 12C21 12.3536 20.8686 12.6926 20.6346 12.9427L17.1055 16.7147C16.8713 16.9647 16.5538 17.1051 16.2227 17.1049C15.8917 17.1048 15.5743 16.9642 15.3403 16.714C15.1063 16.4638 14.9749 16.1246 14.975 15.7709C14.9751 15.4172 15.1067 15.078 15.3409 14.828L16.7398 13.3333H9.98349C9.65251 13.3333 9.3351 13.1929 9.10106 12.9428C8.86703 12.6928 8.73555 12.3536 8.73555 12C8.73555 11.6464 8.86703 11.3072 9.10106 11.0572C9.3351 10.8071 9.65251 10.6667 9.98349 10.6667H16.7398L15.3409 9.172C15.1067 8.92199 14.9751 8.58283 14.975 8.22914C14.9749 7.87544 15.1063 7.53619 15.3403 7.286C15.5743 7.03581 15.8917 6.89519 16.2227 6.89506C16.5538 6.89494 16.8713 7.03532 17.1055 7.28533Z" />
                            </svg> 
                        </span>
                        <p className="text-[#AF1C1C] text-[20px] font-[Poppins] font-[500]">
                            Exit group
                        </p>
                    </div>
                </span>
            </div>
        </div>
    )
}

