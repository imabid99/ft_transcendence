
import axiosInstance from "@/utils/axiosInstance";
import Link from "next/link";

type props  = {
    name: string,
    username: string,
    avatar: string,
    cover: string,
    online: string
    userId: string
}

const Friend = ({ cover, avatar, name, username, online,userId }:props) => {
    const avatarUrl = `http://${process.env.NEXT_PUBLIC_APP_URL}:3000/${avatar}`;
    const coverUrl = `http://${process.env.NEXT_PUBLIC_APP_URL}:3000/${cover}`;
    const matchInvite = async () => {
        try{
            const res = await axiosInstance.post(`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/game/request/${userId}`);
        }
        catch(err){
        }
    }
    return (
    <div className="w-[242px] h-[250px] rounded-[34px] bg-white teamS overflow-x-hidden relative">
                        <span className='absolute z-[1] w-[350px] top-[76px]  overflow-hidden '>
                        <svg width="242" height="64" viewBox="0 0 242 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M33 2.33827C19.8 -4.46173 -1.83333 15.8333 -10.5 21.4999L-14 61.3393L251.5 63.3393V54.3393C252.833 47.6726 261.1 36.3 251.5 21.5C241.9 6.7 217.5 -0.000549078 209.5 2.33827C199 5.40798 192.5 15.8393 165 15.8393C137.5 15.8393 130 6.33929 111.5 2.33827C93 -1.66275 89 15.8393 67.5 15.8393C46 15.8393 49.5 10.8383 33 2.33827Z" fill="white"/>
                        </svg>
                </span>
        <div className="w-[242px] h-[92px]">
        <img
            src={coverUrl}
            alt=""
            className="object-cover w-full h-full filter blur-[0.8px]"
        />
        </div>
        <Link href={`/Profile/users/${userId}`}>
        <div className="relative z-[10]">
            <div className="rounded-full w-[76px] h-[76px] absolute -top-[38px] right-[83px] cursor-pointer">
                    <img src={avatarUrl} alt="" className="object-cover rounded-full w-full h-full"/>
            </div>
            <div>
                <img
                src={online === 'online' ? "pellipse-179.svg" : online === 'in-game' ? "ingame.svg" : "not_online.svg"}
                alt=""
                className="absolute -top-[47px] right-[75px]"
                />
            </div>
        </div>
        </Link>
    <div className="pt-[55px]  text-center">
        <div className="text-[#033B6C] text-[12px] font-[600]">
        {name}
        </div>
        <div className="text-[#064A85] text-[9px] font-[600]">{username}</div>
    </div>
    <div className="flex justify-center gap-[8px] pt-[12px]">

        <Link href={`Chat/me/${userId}`} className="w-[90px] h-[34px] rounded-[8px] bg-[#50A6D3] flex items-center justify-center gap-[5px] messageButt hover:bg-[#3e8fcdcb] cursor-pointer">
            <img src="send.svg" alt="" />
            <p className="text-[#fff] text-[10px] font-[400]">Message</p>
        </Link>
        <button onClick={matchInvite} disabled={online === 'online' ? false : true} className={`w-[90px] h-[34px] rounded-[8px] flex items-center justify-center gap-[5px]  ${online === 'online' ? 'bg-[#62AAE7] hover:bg-[#3e8acdcb] playButt cursor-pointer' : online === 'in-game' ? 'bg-[#F2C571] cursor-not-allowed playButt1 ' : 'bg-[#D0D0D0] cursor-not-allowed playButt1 '}`}>
            <img src="pong-icon.svg" alt="" />
            <p className="text-[#fff] text-[10px] font-[400]">{online === 'in-game' ? 'In Game' : 'Play With'}</p>
        </button>
        </div>
    </div>
);
};

export default Friend;