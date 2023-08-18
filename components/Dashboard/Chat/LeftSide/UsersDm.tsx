import Channel from "../Channel/Channel"
import { useContext } from 'react';
import { contextdata } from '@/app/Chat/contextApi';
type constextType = {
    user: any,
    users: any,
  };
export default function UsersDm() {
    const {users, user} = useContext(contextdata);
    return (
      <div className="chat__left__bottom__groups flex flex-col  justify-center items-center">
          <span className="flex items-center justify-start gap-[10px] w-full mb-[20px]">
            <span className="flex justify-center items-center bg-[#00959C] rounded-[15px] w-[27px] h-[27px]">
              <svg
                width="12"
                height="11"
                viewBox="0 0 12 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.77778 3.63562H8.22222M3.77778 5.74412H7.11111M9.33333 1C9.77536 1 10.1993 1.16661 10.5118 1.46317C10.8244 1.75974 11 2.16197 11 2.58137V6.79837C11 7.21778 10.8244 7.62001 10.5118 7.91658C10.1993 8.21314 9.77536 8.37975 9.33333 8.37975H6.55556L3.77778 9.96112V8.37975H2.66667C2.22464 8.37975 1.80072 8.21314 1.48816 7.91658C1.17559 7.62001 1 7.21778 1 6.79837V2.58137C1 2.16197 1.17559 1.75974 1.48816 1.46317C1.80072 1.16661 2.22464 1 2.66667 1H9.33333Z"
                  stroke="white"
                />
              </svg>
            </span>
            <p className="text-[16px] font-[500] font-[Poppins] text-[#00959C]">
              All Message
            </p>
          </span>
          <div className="flex flex-col gap-[20px]  rounded-[5px] w-full">
            {
              user && users?.map((ur: any) => {
                
                return (
                  ur.id === user.userId ?  null : 
                  (<Channel
                    avatar="/userProfile.jpg"
                    channel={ur.username}
                    lastMessage="Mcha liya tele"
                    lastMessageTime="12:00"
                    notification={100}
                    active={true}
                    link={ur.id}
                    key={ur.id}
                  />)
                )
              })
            }
          </div>
        </div>
    )
}