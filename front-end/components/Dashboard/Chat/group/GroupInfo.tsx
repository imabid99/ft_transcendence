'use client';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { useContext } from "react";
import { contextdata } from "@/app/contextApi";
import axiosInstance from "@/utils/axiosInstance";

type GroupInfoProps =
{
    setShowBody : any,
    setGroupUsers: any,
    groupUsers: any,
}

export default function GroupInfo({setShowBody,setGroupUsers,groupUsers}:GroupInfoProps)
{
	const [showTypeGroup, setShowTypeGroup] = useState(false);
	const [showAnimationLoading, setShowAnimationLoading] = useState(false);
	const [GroupName, setGroupName] = useState('');
    const [groupType, setGroupType] = useState('Group Type');
    const [showError, setShowError] = useState<string|null>(null);
    const [protectedPassword, setProtectedPassword] = useState('');
    const [avatar, setAvatar] = useState<FormData | null>(null);
    const [avatarUrl, setAvatarUrl] = useState("/groupAvatar.jpg");
    const [showUploadImage, setShowUploadImage] = useState(false);
    const router = useRouter();
    const {user, socket} :any = useContext(contextdata);

	const createGroup = () => {
        console.log("create-group");
		if (GroupName === '') {
			setShowError('badGroupName');
			return;
		}
		if (groupType === 'Group Type') {
			setShowError('badTypeGroup');
			return;
		}
        if (groupType === 'Protected' && protectedPassword === '') {
            setShowError('badTypeGroup');
            return;
        }

		setShowAnimationLoading(true);
			setShowBody(null);
			setGroupType('Group Type');
			setShowError(null);
			setGroupName('');
			setGroupUsers([]);
            const payload = {
                groupName: GroupName,
                groupType: groupType,
                groupUsers: groupUsers,
                protectedPassword: protectedPassword,
                username: user?.username,
            }
            socket.io.opts.query = {
                'file' : avatar,
            }
            socket.emit('create-group', payload);
            socket.on('update-groupAvatar', async (data: any) => {
                try{
                    if(!avatar){
                        setShowAnimationLoading(false)
                        router.push(`/Chat`)
                        return;
                    }
                    await axiosInstance.post(`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/upload/channelAvatar/${data.groupId}`,avatar)
                    setShowAnimationLoading(false)
                    router.push(`/Chat`)
                }
                catch(err){
                    console.log("update-groupAvatar : ",err);
                }
            })

	}
    const handleUploadImage = (e: any) => {
        const file = e.target.files?.[0];
        const maxFileSize = 1024 * 1024 * 5;
        const formData = new FormData();
        formData.append('file', file);

        if (!file) return;
        if (file?.size > maxFileSize) {
            alert("File is too large. Please upload a file smaller than 5 MB.");
            return;
        }
        setAvatar(formData);
        setAvatarUrl(URL.createObjectURL(file));
    }
    return (
        <div className="flex flex-col  overflow-y-scroll  max-h-[calc(100%-270px)] min-h-[calc(100%-135px)] no-scrollbar">
            <div className=" flex gap-2 items-center  py-[27px] px-[25px]">
                <span onClick={() => {setShowBody("selectUsers") ;setGroupUsers([])}} className="cursor-pointer">
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.0412 21.0012C15.5679 21.0017 15.1088 20.8393 14.7412 20.5412L9.64118 16.3312C9.44119 16.172 9.27967 15.9697 9.16866 15.7394C9.05765 15.5091 9 15.2568 9 15.0012C9 14.7455 9.05765 14.4932 9.16866 14.2629C9.27967 14.0327 9.44119 13.8304 9.64118 13.6712L14.7412 9.46117C15.0482 9.21516 15.4182 9.06035 15.8089 9.01438C16.1996 8.96842 16.5954 9.03314 16.9512 9.20117C17.2604 9.33745 17.5238 9.55984 17.71 9.84179C17.8961 10.1237 17.9972 10.4533 18.0012 10.7912V19.2112C17.9972 19.549 17.8961 19.8786 17.71 20.1606C17.5238 20.4425 17.2604 20.6649 16.9512 20.8012C16.6653 20.9312 16.3552 20.9993 16.0412 21.0012Z" fill="#00498A"/>
                    </svg>
                </span>
                <p className="text-[25px] font-[600] font-[Poppins] text-[#00498A] leading-6 cursor-pointer" >
                    New Group
                </p>
            </div>
            <div className='w-full py-[95px] flex justify-center items-center'>
                <div className="w-[200px] h-[200px] rounded-full border-[1px] border-[#E5E5E5] border-opacity-50 relative  flex flex-col justify-center items-center gap-[10px] cursor-pointer "
                    onMouseEnter={() => {setShowUploadImage(true)}}
                    onMouseLeave={() => {setShowUploadImage(false)}}
                >
                    <img src={avatarUrl} alt="" className="z-[0] w-full h-full rounded-full object-cover opacity-[0.8] absolute top-[0px] left-[0px]" />
                        {
                            showUploadImage && (
                                <>
                                    <svg width="61" height="61" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg" className="z-[1]">
                                        <path d="M51.5595 8.71428C52.7993 8.71428 54.0269 8.95847 55.1722 9.4329C56.3176 9.90733 57.3583 10.6027 58.2349 11.4793C59.1116 12.356 59.807 13.3967 60.2814 14.542C60.7558 15.6874 61 16.915 61 18.1548V51.5595C61 52.7993 60.7558 54.0269 60.2814 55.1722C59.807 56.3176 59.1116 57.3583 58.2349 58.2349C57.3583 59.1116 56.3176 59.807 55.1722 60.2814C54.0269 60.7558 52.7993 61 51.5595 61H18.1548C16.915 61 15.6874 60.7558 14.542 60.2814C13.3967 59.807 12.356 59.1116 11.4793 58.2349C10.6027 57.3583 9.90733 56.3176 9.4329 55.1722C8.95847 54.0269 8.71428 52.7993 8.71428 51.5595V33.4106C10.0911 33.9857 11.5522 34.3982 13.0714 34.6364V51.5595C13.0714 52.1637 13.176 52.7447 13.3706 53.285L30.285 36.7249C31.4445 35.5898 32.9848 34.9266 34.6062 34.8643C36.2277 34.802 37.8143 35.3451 39.0574 36.388L39.4292 36.7249L56.3408 53.2879C56.5354 52.7476 56.6429 52.1666 56.6429 51.5595V18.1548C56.6429 16.8066 56.1073 15.5136 55.154 14.5603C54.2007 13.607 52.9077 13.0714 51.5595 13.0714H34.6364C34.4052 11.5749 33.9936 10.1119 33.4106 8.71428H51.5595ZM33.5761 39.6326L33.3321 39.8359L16.4642 56.3553C16.9929 56.5412 17.5622 56.6429 18.1548 56.6429H51.5595C52.1492 56.6429 52.7185 56.5412 53.2443 56.3553L36.3821 39.8388C36.0143 39.4783 35.5306 39.2597 35.0169 39.222C34.5032 39.1842 33.9928 39.3297 33.5761 39.6326ZM44.3034 18.881C46.0383 18.881 47.7022 19.5701 48.929 20.7969C50.1558 22.0237 50.8449 23.6876 50.8449 25.4225C50.8449 27.1574 50.1558 28.8213 48.929 30.048C47.7022 31.2748 46.0383 31.964 44.3034 31.964C42.5685 31.964 40.9046 31.2748 39.6779 30.048C38.4511 28.8213 37.7619 27.1574 37.7619 25.4225C37.7619 23.6876 38.4511 22.0237 39.6779 20.7969C40.9046 19.5701 42.5685 18.881 44.3034 18.881ZM15.9762 0C18.0742 -3.1263e-08 20.1517 0.413236 22.09 1.21611C24.0283 2.01899 25.7895 3.19579 27.2731 4.67932C28.7566 6.16284 29.9334 7.92405 30.7363 9.86237C31.5391 11.8007 31.9524 13.8782 31.9524 15.9762C31.9524 18.0742 31.5391 20.1517 30.7363 22.09C29.9334 24.0283 28.7566 25.7895 27.2731 27.2731C25.7895 28.7566 24.0283 29.9334 22.09 30.7363C20.1517 31.5391 18.0742 31.9524 15.9762 31.9524C11.739 31.9524 7.67543 30.2692 4.67932 27.2731C1.6832 24.2769 0 20.2133 0 15.9762C0 11.739 1.6832 7.67543 4.67932 4.67932C7.67543 1.6832 11.739 6.31384e-08 15.9762 0ZM44.3034 23.2381C44.0166 23.2381 43.7325 23.2946 43.4675 23.4044C43.2025 23.5141 42.9617 23.675 42.7588 23.8779C42.556 24.0807 42.3951 24.3215 42.2853 24.5865C42.1755 24.8516 42.119 25.1356 42.119 25.4225C42.119 25.7093 42.1755 25.9934 42.2853 26.2584C42.3951 26.5234 42.556 26.7642 42.7588 26.9671C42.9617 27.1699 43.2025 27.3308 43.4675 27.4406C43.7325 27.5504 44.0166 27.6069 44.3034 27.6069C44.8828 27.6069 45.4384 27.3767 45.848 26.9671C46.2577 26.5574 46.4878 26.0018 46.4878 25.4225C46.4878 24.8431 46.2577 24.2875 45.848 23.8779C45.4384 23.4682 44.8828 23.2381 44.3034 23.2381ZM15.9762 5.80952L15.7148 5.82986C15.4246 5.88287 15.1574 6.023 14.9488 6.2316C14.7402 6.4402 14.6001 6.70737 14.547 6.99757L14.5238 7.2619V14.5238H7.25609L6.99467 14.547C6.70447 14.6001 6.43729 14.7402 6.2287 14.9488C6.0201 15.1574 5.87997 15.4246 5.82695 15.7148L5.80371 15.9762L5.82695 16.2376C5.87997 16.5278 6.0201 16.795 6.2287 17.0036C6.43729 17.2122 6.70447 17.3523 6.99467 17.4053L7.25609 17.4286H14.5238V24.6992L14.547 24.9606C14.6001 25.2508 14.7402 25.518 14.9488 25.7266C15.1574 25.9352 15.4246 26.0753 15.7148 26.1283L15.9762 26.1545L16.2376 26.1283C16.5278 26.0753 16.795 25.9352 17.0036 25.7266C17.2122 25.518 17.3523 25.2508 17.4053 24.9606L17.4286 24.6992V17.4286H24.705L24.9664 17.4053C25.2566 17.3523 25.5238 17.2122 25.7324 17.0036C25.941 16.795 26.0811 16.5278 26.1341 16.2376L26.1574 15.9762L26.1341 15.7148C26.0809 15.4242 25.9404 15.1567 25.7312 14.9481C25.5221 14.7394 25.2543 14.5995 24.9635 14.547L24.7021 14.5238H17.4286V7.2619L17.4053 7.00048C17.3528 6.70975 17.213 6.44194 17.0043 6.23278C16.7957 6.02362 16.5282 5.88306 16.2376 5.82986L15.9762 5.80952Z" fill="white"/>
                                    </svg>
                                    <p className="text-[16px] font-[400] font-[Poppins] text-[#FFF] leading-6 cursor-pointer z-[1]" >
                                        Add group avatar
                                    </p>
                                </>
                            )
                        }
                    <input onChange={handleUploadImage} type="file" id="img" name="img" accept=".jpg,.jpeg,.png,.gif"  className="absolute top-[0px] left-[0px] w-full h-full opacity-0 cursor-pointer z-[1]" />
                </div>
            </div>
            <form className="min-h-[500px] px-[39px] flex flex-col gap-[30px] py-[25px]">
                {
                    showError === 'badGroupName' ? (
                        <label htmlFor="GroupName" className=" groupInfo flex items-center border-[1px] border-[#FF0000]  ">
                            <span className="p-[19px] bg-[#F9FCFE] rounded-l-[11px]">
                                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 12V9.90001C0 9.47501 0.106182 9.08426 0.318545 8.72776C0.530909 8.37126 0.812606 8.09951 1.16364 7.91251C1.91515 7.52501 2.67879 7.23426 3.45455 7.04026C4.2303 6.84626 5.01818 6.74951 5.81818 6.75001C6.61818 6.75001 7.40606 6.84701 8.18182 7.04101C8.95758 7.23501 9.72121 7.52551 10.4727 7.91251C10.8242 8.10001 11.1062 8.37201 11.3185 8.72851C11.5309 9.08501 11.6368 9.47551 11.6364 9.90001V12H0ZM13.0909 12V9.75C13.0909 9.20001 12.9423 8.67176 12.6451 8.16526C12.3479 7.65876 11.9268 7.22451 11.3818 6.86251C12 6.93751 12.5818 7.06576 13.1273 7.24726C13.6727 7.42876 14.1818 7.65051 14.6545 7.91251C15.0909 8.16251 15.4242 8.44051 15.6545 8.74651C15.8848 9.05251 16 9.387 16 9.75V12H13.0909ZM5.81818 6.00001C5.01818 6.00001 4.33333 5.70626 3.76364 5.11876C3.19394 4.53126 2.90909 3.82501 2.90909 3.00001C2.90909 2.17502 3.19394 1.46877 3.76364 0.881268C4.33333 0.293769 5.01818 1.92305e-05 5.81818 1.92305e-05C6.61818 1.92305e-05 7.30303 0.293769 7.87273 0.881268C8.44242 1.46877 8.72727 2.17502 8.72727 3.00001C8.72727 3.82501 8.44242 4.53126 7.87273 5.11876C7.30303 5.70626 6.61818 6.00001 5.81818 6.00001ZM13.0909 3.00001C13.0909 3.82501 12.8061 4.53126 12.2364 5.11876C11.6667 5.70626 10.9818 6.00001 10.1818 6.00001C10.0485 6.00001 9.87879 5.98426 9.67273 5.95276C9.46667 5.92126 9.29697 5.88701 9.16364 5.85001C9.49091 5.45001 9.74255 5.00626 9.91855 4.51876C10.0945 4.03126 10.1823 3.52501 10.1818 3.00001C10.1818 2.47502 10.0941 1.96877 9.91855 1.48127C9.74303 0.993768 9.49139 0.550018 9.16364 0.150019C9.33333 0.087519 9.50303 0.0467693 9.67273 0.0277693C9.84242 0.00876935 10.0121 -0.000480769 10.1818 1.92305e-05C10.9818 1.92305e-05 11.6667 0.293769 12.2364 0.881268C12.8061 1.46877 13.0909 2.17502 13.0909 3.00001Z" fill="#04427A"/>
                                </svg>
                            </span>
                            <input id="GroupName" type="text" autoFocus className="w-[calc(100%-54px)] h-[50px]  bg-[#F9FCFE] pr-[20px] text-[15px] font-[300] font-[Poppins] text-[#A5BFD6] outline-none rounded-r-[11px]" placeholder="Group Name" onChange={(e) => setGroupName(e.target.value)} />
                        </label>
                    )
                    :
                    (
                        <label htmlFor="GroupName" className=" flex items-center ">
                            <span className="p-[19px] bg-[#F9FCFE] rounded-l-[11px]">
                                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 12V9.90001C0 9.47501 0.106182 9.08426 0.318545 8.72776C0.530909 8.37126 0.812606 8.09951 1.16364 7.91251C1.91515 7.52501 2.67879 7.23426 3.45455 7.04026C4.2303 6.84626 5.01818 6.74951 5.81818 6.75001C6.61818 6.75001 7.40606 6.84701 8.18182 7.04101C8.95758 7.23501 9.72121 7.52551 10.4727 7.91251C10.8242 8.10001 11.1062 8.37201 11.3185 8.72851C11.5309 9.08501 11.6368 9.47551 11.6364 9.90001V12H0ZM13.0909 12V9.75C13.0909 9.20001 12.9423 8.67176 12.6451 8.16526C12.3479 7.65876 11.9268 7.22451 11.3818 6.86251C12 6.93751 12.5818 7.06576 13.1273 7.24726C13.6727 7.42876 14.1818 7.65051 14.6545 7.91251C15.0909 8.16251 15.4242 8.44051 15.6545 8.74651C15.8848 9.05251 16 9.387 16 9.75V12H13.0909ZM5.81818 6.00001C5.01818 6.00001 4.33333 5.70626 3.76364 5.11876C3.19394 4.53126 2.90909 3.82501 2.90909 3.00001C2.90909 2.17502 3.19394 1.46877 3.76364 0.881268C4.33333 0.293769 5.01818 1.92305e-05 5.81818 1.92305e-05C6.61818 1.92305e-05 7.30303 0.293769 7.87273 0.881268C8.44242 1.46877 8.72727 2.17502 8.72727 3.00001C8.72727 3.82501 8.44242 4.53126 7.87273 5.11876C7.30303 5.70626 6.61818 6.00001 5.81818 6.00001ZM13.0909 3.00001C13.0909 3.82501 12.8061 4.53126 12.2364 5.11876C11.6667 5.70626 10.9818 6.00001 10.1818 6.00001C10.0485 6.00001 9.87879 5.98426 9.67273 5.95276C9.46667 5.92126 9.29697 5.88701 9.16364 5.85001C9.49091 5.45001 9.74255 5.00626 9.91855 4.51876C10.0945 4.03126 10.1823 3.52501 10.1818 3.00001C10.1818 2.47502 10.0941 1.96877 9.91855 1.48127C9.74303 0.993768 9.49139 0.550018 9.16364 0.150019C9.33333 0.087519 9.50303 0.0467693 9.67273 0.0277693C9.84242 0.00876935 10.0121 -0.000480769 10.1818 1.92305e-05C10.9818 1.92305e-05 11.6667 0.293769 12.2364 0.881268C12.8061 1.46877 13.0909 2.17502 13.0909 3.00001Z" fill="#04427A"/>
                                </svg>
                            </span>
                            <input id="GroupName" type="text" autoFocus className="w-[calc(100%-54px)] h-[50px]  bg-[#F9FCFE] pr-[20px] text-[15px] font-[300] font-[Poppins] text-[#A5BFD6] outline-none rounded-r-[11px]" placeholder="Group Name" onChange={(e) => setGroupName(e.target.value)} />
                        </label>
                    )
                    }
                <label htmlFor="typeGroup" className="flex items-center w-full rounded-[11px]  gap-[20px] flex-col">
                    {
                        showError === 'badTypeGroup' && (
                        <p className="text-[15px] font-[500] font-[Poppins] text-[#FF0000]">
                            select group type
                        </p>
                        )
                    }
                    <p className="w-full relative text-center py-[10px] px-[20px] bg-[#F9FCFE] cursor-pointer text-[15px] font-[500] font-[Poppins] text-[#afb8bf]" onClick={() => setShowTypeGroup(!showTypeGroup)}>
                        <>
                            {groupType}
                        </>
                        {showTypeGroup && (<div className="flex flex-col gap-[10px] absolute top-[0px] left-[0px] w-full bg-[#F9FCFE] rounded-[11px] py-[10px] px-[20px]">
                            <span className="hover:text-[#00498A] cursor-pointer" onClick={() => setGroupType('Public')}>
                                Public
                            </span>
                            <span className="hover:text-[#00498A] cursor-pointer" onClick={() => setGroupType('Private')}>
                                Private
                            </span>
                            <span className="hover:text-[#00498A] cursor-pointer" onClick={() => setGroupType('Protected')}>
                                Protected
                            </span>
                        </div>)}
                    </p>
                </label>
                {
                    groupType === 'Protected' && (
                        <label htmlFor="Protected"  className="groupInfo flex flex-col gap-[10px] mt-[30px] ">
                            <p className="text-[15px] font-[500] font-[Poppins] text-[#00539D]">
                                Group password
                            </p>
                            <input onChange={(e) => setProtectedPassword(e.target.value)} autoFocus type="password" id="protected" className="w-full h-[50px]  px-[20px]   bg-[#F9FCFE] pr-[20px] text-[15px] font-[300] font-[Poppins] text-[#A5BFD6] outline-none rounded-[11px]" placeholder="Password" />
                        </label>
                    )
                }
            </form>
            <div  onClick={createGroup} className="  bg-[#025063] min-h-[70px] min-w-[70px] rounded-full absolute bottom-[54px] right-[50px] z-[10] flex justify-center items-center cursor-pointer" >
                <div className="flex justify-center items-center relative">
                    <svg  fill="#FFF"  viewBox="0 0 24 24" height="40px" width="40px" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#FFF" d="M6,12.4 L18,12.4 M12.6,7 L18,12.4 L12.6,17.8"></path>
                    </svg>
                </div>
            </div>
            {
                showAnimationLoading &&
                (
                    <div className="Animation Loading min-w-full min-h-full  z-[20] absolute top-[0px] left-[0px] flex justify-center items-center bg-[#000000] bg-opacity-[0.1]">
                        <svg className="animate-spin " strokeWidth="2" stroke="#F9FCFE" fill="none"  viewBox="0 0 24 24"   height="55px" width="55px"  xmlns="http://www.w3.org/2000/svg"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M12 6l0 -3"></path><path d="M16.25 7.75l2.15 -2.15"></path><path d="M18 12l3 0"></path><path d="M16.25 16.25l2.15 2.15"></path><path d="M12 18l0 3"></path><path d="M7.75 16.25l-2.15 2.15"></path><path d="M6 12l-3 0"></path><path d="M7.75 7.75l-2.15 -2.15"></path>
                        </svg>
                    </div>
                )
            }
        </div>
    );
}