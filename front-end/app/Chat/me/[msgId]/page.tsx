'use client';
import { useState , useEffect , useRef, use } from 'react';
import { useParams } from 'next/navigation';
import Avatar from '@/components/Dashboard/Chat/Avatar/Avatar';
import LeftMessages from '@/components/Dashboard/Chat/Messages/LeftMessages';
import RightMessages from '@/components/Dashboard/Chat/Messages/RightMessages';
import Link from 'next/link';
import axiosInstance from '@/utils/axiosInstance';
import { useContext } from 'react';
import { contextdata } from '@/app//contextApi';
import { useRouter } from 'next/navigation';
import NotUser from '../NotUser';

type Message = {
  fromId :    number,
  toId  :     number,
  content :   string,
  createdAt:  string,
}


export default function Page() {
  const { msgId } = useParams();
  const [messages, setMessages] = useState <Message[] | null>(null);
  const [show, setShow] = useState(false);
  const [isBlocked, setIsBlocked] = useState<boolean>(false);
  const [isIblocked, setIsIblocked] = useState<boolean>(false);
  const [receiver, setReceiver] = useState<any>(null);
  const [isUser, setIsUser] = useState<boolean>(true);
  const {user,socket} :any= useContext(contextdata);
  const inputRef = useRef<HTMLInputElement | null>(null);;
  const router = useRouter();

  if (user?.id === parseInt(msgId)) 
  {
    router.push('/Chat');
  }
  useEffect(() => {
    if(!user || !receiver || !socket) return;
    
    socket.on('privet-message', (payload:any) => {
      if(!user|| !receiver) return;
      if (payload.fromId !== receiver.userId && payload.fromId !== user.id) return;
      const msg = {
        id: messages? messages.length + 1 : 1,
        fromId: payload.fromId,
        toId: payload.toId,
        content: payload.content,
        createdAt: payload.createdAt,
      }
      setMessages((prev: any) => [...prev, msg]);
    });
    socket.on('refresh', () => {
      async function fetchIsBlocked() {
        setTimeout(async () => {
          try {
            const res = await axiosInstance.get(`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/user/is-blocked/${user.id}/${msgId}`);
            if (res.data === null) {
              return;
            }
            if (!res.data.iBlocked && !res.data.heBlocked) {
              setIsBlocked(false);
              return;
            }
            if(res.data.iBlocked)
            {
              setIsIblocked(true);
            }
            setIsBlocked(true);
          } catch (err) {
            console.log(err);
          }
        }, 500);
      }
      fetchIsBlocked();
    });
    
    return () => {
      socket.off('connect');
      socket.off('message');
      socket.off('disconnect');
      socket.off('privet-message');
    }

  }, [ user,receiver,socket]);

  useEffect(() => {
    async function getReceiver() {
      try {
        const res = await axiosInstance.get(`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/user/profile/${msgId}`);
        setReceiver(res.data);
      } catch (err) {
        setIsUser(false);
        console.log(err);
      }
    }
    getReceiver();
    return () => {
      setReceiver(null);
    }
  }, [])

  useEffect(() => {
    if(!user || !receiver) return;
    async function fetchMessages() {
      try {
        const res = await axiosInstance.get(`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/chat/messages/${user.id}`);

        const onlyMyMessages = res.data.filter((msg: Message) => {
          return (msg.fromId === user.id && msg.toId === receiver.userId) || (msg.fromId === receiver.userId && msg.toId === user.id);
        })
        setMessages(onlyMyMessages);
      } catch (err) {
        console.log(err);
      }
    }
    async function fetchIsBlocked() {
      try {
        const res = await axiosInstance.get(`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/user/is-blocked/${user.id}/${msgId}`);
        if (res.data === null) {
          return;
        }
        if (!res.data.iBlocked && !res.data.heBlocked) {
          setIsBlocked(false);
          return;
        }
        if(res.data.iBlocked)
        {
          setIsIblocked(true);
        }
        setIsBlocked(true);
      } catch (err) {
        console.log(err);
      }
    }
    fetchIsBlocked();
    fetchMessages();
    return () => {
      setMessages(null);
    }
    
  }, [user, receiver])
  
  useEffect(() => {
    if(!messages) return;
     const scrol = document.querySelector('.message__body');
     if (scrol) {
       scrol.scrollTop = scrol.scrollHeight;
    }
  }, [messages])
  
  if(!isUser)
  {
    return <NotUser />
  }

  if(messages === null)
  {
    return (
			<div className="flex justify-center items-center  bg-gray-50 dark:bg-gray-900 w-[calc(100%-450px)] min-h-full min-w-[490px] lg:max-xl:w-[calc(100%-350px)] lsm:max-lg:min-w-full ">
				<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
			</div>
    )
  }

  const handleSubmit = (e: { preventDefault: () => void; }) => {
		e.preventDefault();
		if (!inputRef.current?.value || !receiver.username) return;
    const content = inputRef.current?.value.trim();
    if(content === '') return;
		const payload = {
			room: receiver.username,
			sander: user.username,
			message: {
				fromId: user.id,
				toId: receiver.userId,
				content: content,
				createdAt: new Date().toISOString(),
			},
		}
		socket.emit("privet-message", payload);
		inputRef.current.value = '';
	}



  const handleBlock = async () => {
    const payload = {
      userId: user?.id,
      blockedId: receiver?.userId,
    }
    socket.emit('block-user', payload);
    setIsBlocked(true);
    setIsIblocked(true);
  }
  const handleUnBlock = async () => {
    const payload = {
      userId: user?.id,
      blockedId: receiver?.userId,
    }
    socket.emit('unblock-user', payload);
    setIsBlocked(false);
    setIsIblocked(false);
  }
  




  
  /* sort messages by date */
  messages?.sort((a, b) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  })

  /* scroll to bottom */

  return (
      <div className='message w-[calc(100%-450px)] min-h-full flex flex-col min-w-[490px] lg:max-xl:w-[calc(100%-350px)] lsm:max-lg:min-w-full relative'>
        {
          show && 
          (
            <div className='w-full h-full  bg-opacity-50 absolute top-0 left-0 z-[1]' onClick={()=>setShow(false)}></div>
          )
        }
        <div className='message__header flex justify-between items-center px-[42px] py-[20px] bg-[#FFF] lsm:max-lg:px-[10px] border-b-[1px] boder-[#EAEAEA]' >
          <div className='message__header__left flex items-center gap-[10px] '>
            <Link href="/Chat" className='pr-[10px] py-[5px] lg:hidden'>
              <svg width="9" height="13" viewBox="0 0 9 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.04118 12.0012C6.56787 12.0017 6.1088 11.8393 5.74118 11.5412L0.64118 7.33117C0.441185 7.17195 0.279673 6.96968 0.168662 6.73941C0.0576506 6.50914 0 6.2568 0 6.00117C0 5.74554 0.0576506 5.49319 0.168662 5.26292C0.279673 5.03265 0.441185 4.83038 0.64118 4.67117L5.74118 0.461168C6.04821 0.215162 6.41818 0.0603538 6.80891 0.0143849C7.19965 -0.031584 7.59544 0.0331352 7.95118 0.201168C8.26035 0.337447 8.52377 0.559841 8.70996 0.841787C8.89615 1.12373 8.99725 1.45331 9.00118 1.79117V10.2112C8.99725 10.549 8.89615 10.8786 8.70996 11.1606C8.52377 11.4425 8.26035 11.6649 7.95118 11.8012C7.66531 11.9312 7.35521 11.9993 7.04118 12.0012Z" fill="#00498A"/>
              </svg>
            </Link>
            <Link href={`/Profile/${receiver?.userId}`} className='message__header__left flex items-center cursor-pointer pr-[30px]'>
              <Avatar url="/userProfile.jpg" status={false} />
              <div className='message__header__left__info ml-2'>
                <div className='message__header__left__info__name text-[#034B8A] font-[600] font-[Poppins] text-[25px] truncate max-w-[250px] lsm:max-lg:max-w-[150px]'>{`${receiver?.firstName} ${receiver?.lastName}`}</div>
                <div className='message__header__left__info__status text-[#C0C1C5] text-[16px] font-[Poppins]'>{receiver?.status}</div>
              </div>
            </Link>
          </div>
          <div className='message__header__right flex flex-col items-center justify-center gap-[2px] cursor-pointer relative z-[2] px-[10px]' onClick={() => {setShow(!show)}}>
            <span className='w-[7px] h-[7px] bg-[#02549D] rounded-full'></span>
            <span className='w-[7px] h-[7px] bg-[#02549D] rounded-full'></span>
            <span className='w-[7px] h-[7px] bg-[#02549D] rounded-full'></span>
            {show && (<div className='message__header__right__dropdown absolute top-[30px] right-0 min-w-[230px] bg-[#EDFAFF] rounded-[10px] shadow-[0px 4px 4px rgba(0, 0, 0, 0.25)] flex flex-col px-[20px] justify-center gap-[5px]'>
              <span className='py-[10px] text-[#AF1C1C] text-[16px] font-[Poppins] font-[500] flex items-center gap-[15px] '>
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M483.13 245.38C461.92 149.49 430 98.31 382.65 84.33A107.13 107.13 0 00352 80c-13.71 0-25.65 3.34-38.28 6.88C298.5 91.15 281.21 96 256 96s-42.51-4.84-57.76-9.11C185.6 83.34 173.67 80 160 80a115.74 115.74 0 00-31.73 4.32c-47.1 13.92-79 65.08-100.52 161C4.61 348.54 16 413.71 59.69 428.83a56.62 56.62 0 0018.64 3.22c29.93 0 53.93-24.93 70.33-45.34 18.53-23.1 40.22-34.82 107.34-34.82 59.95 0 84.76 8.13 106.19 34.82 13.47 16.78 26.2 28.52 38.9 35.91 16.89 9.82 33.77 12 50.16 6.37 25.82-8.81 40.62-32.1 44-69.24 2.57-28.48-1.39-65.89-12.12-114.37zM208 240h-32v32a16 16 0 01-32 0v-32h-32a16 16 0 010-32h32v-32a16 16 0 0132 0v32h32a16 16 0 010 32zm84 4a20 20 0 1120-20 20 20 0 01-20 20zm44 44a20 20 0 1120-19.95A20 20 0 01336 288zm0-88a20 20 0 1120-20 20 20 0 01-20 20zm44 44a20 20 0 1120-20 20 20 0 01-20 20z">
                  </path>
                  </svg>
                <p className='text-[14px] font-[Poppins] font-[500]'>
                  Invite to play 
                </p>
              </span>
              {
                isBlocked && isIblocked ? (
                  <span className='py-[10px] text-[#AF1C1C] text-[16px] font-[Poppins] font-[500] flex items-center gap-[15px]' onClick={handleUnBlock}>
                    <span>
                      <svg width="12" height="16" viewBox="0 0 65 65" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M32.25 32.25C41.1196 32.25 48.375 24.9936 48.375 16.125C48.375 7.25642 41.1196 0 32.25 0C23.3804 0 16.125 7.25642 16.125 16.125C16.125 24.9936 23.3804 32.25 32.25 32.25ZM32.25 40.3125C21.5675 40.3125 0 45.755 0 56.4375V64.5H64.5V56.4375C64.5 45.755 42.9325 40.3125 32.25 40.3125Z" fill="#AF1C1C"/>
                      </svg>
                    </span>
                    <p className='text-[14px] font-[Poppins] font-[500]'>
                      Unblock
                    </p>
                  </span>
                )
                :
                (
                  !isIblocked && isBlocked? (
                    <span className='py-[10px] text-[#AF1C1C] text-[16px] font-[Poppins] font-[500] flex items-center gap-[15px] cursor-not-allowed'>
                      <svg width="12" height="16" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M43 0C19.2532 0 0 19.2532 0 43C0 66.7468 19.2532 86 43 86C66.7468 86 86 66.7468 86 43C86 19.2532 66.7468 0 43 0ZM43 10.75C60.7805 10.75 75.25 25.2195 75.25 43C75.25 49.9553 73.014 56.3837 69.2569 61.6566L24.3434 16.7431C29.7838 12.8461 36.3079 10.7503 43 10.75ZM10.75 43C10.75 36.0447 12.986 29.6162 16.7431 24.3434L61.6566 69.2569C56.2158 73.1531 49.692 75.2488 43 75.25C25.2195 75.25 10.75 60.7805 10.75 43Z" fill="#AF1C1C"/>
                      </svg> 
                      <p className='text-[14px] font-[Poppins] font-[500]'>
                        your are blocked
                      </p>
                    </span>
                  )
                  :
                  (
                  <span className='py-[10px] text-[#AF1C1C] text-[16px] font-[Poppins] font-[500] flex items-center gap-[15px]' onClick={handleBlock}>
                    <span>
                      <svg width="12" height="16" viewBox="0 0 58 71" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M53.7186 40.297C53.5326 40.0361 53.3092 39.7718 53.0825 39.5138L52.8418 39.2365C51.9194 38.189 50.9379 37.3083 49.9186 36.613C49.7889 36.5054 49.6512 36.4075 49.5091 36.3226C49.4889 36.3096 49.4684 36.2965 49.4483 36.2835C48.6447 35.7646 47.8383 35.2882 46.9409 34.8839C41.1336 32.3024 34.2906 33.2056 29.0396 37.5345C23.0767 36.1773 16.9636 36.647 11.3188 38.9104C5.9712 41.0247 1.93359 45.6614 0.515681 51.3258L0.223393 52.5166C-0.301959 54.7091 0.109422 57.0486 1.35061 58.9314C2.67151 60.9348 4.79276 62.2563 7.18454 62.5597C12.2127 63.1735 17.3369 63.4835 22.4095 63.4835C23.7566 63.4835 25.1166 63.4201 26.473 63.3629C26.7144 63.6656 26.894 63.9998 27.1709 64.2864C27.3156 64.4528 27.4527 64.5788 27.6019 64.7375L27.6057 64.7432L27.6111 64.7469C27.8244 64.9737 28.0472 65.225 28.2277 65.3924C28.3481 65.5197 28.584 65.7709 28.9343 66.0222C32.0153 68.6945 35.9406 70.166 40.0172 70.166C44.3004 70.166 48.396 68.5639 51.5084 65.6894C55.3959 62.2239 57.625 57.1566 57.625 51.7892C57.625 48.9114 56.9732 46.0563 55.7304 43.5079C55.1161 42.2647 54.4034 41.1357 53.7186 40.297ZM44.4115 41.0247C44.7323 41.1694 45.0191 41.3595 45.3169 41.5333L30.2052 57.3049C30.0164 56.9464 29.8153 56.5862 29.686 56.2364C29.628 56.0797 29.6079 55.9948 29.5297 55.8515C29.5189 55.8187 29.4251 55.5414 29.4142 55.509C29.0156 54.38 28.8123 53.1304 28.8123 51.7892C28.8123 48.9505 29.7785 46.2488 31.3962 44.3269L32.5061 43.1327C35.6966 40.0982 40.5237 39.2986 44.4115 41.0247ZM7.94071 55.9233C7.38591 55.8548 6.90602 55.5708 6.62621 55.1435C6.41524 54.8271 6.35121 54.4876 6.43093 54.1581L6.71553 53.0031C7.60648 49.44 10.1766 46.5067 13.6014 45.1525C16.4036 44.0298 19.4504 43.4361 22.4095 43.4361C23.0347 43.4361 23.6616 43.4622 24.29 43.5143C24.0336 44.0425 23.8175 44.5912 23.6119 45.1438C23.5815 45.2257 23.5409 45.3022 23.5117 45.3847C23.1919 46.2835 22.9604 47.2154 22.7786 48.1623C22.7347 48.3908 22.6976 48.619 22.6621 48.8496C22.5129 49.8165 22.4095 50.7945 22.4095 51.7892C22.4095 52.7652 22.5004 53.7161 22.6448 54.6587C22.6902 54.9544 22.7668 55.2494 22.8269 55.5431C22.9127 55.9621 22.9697 56.3844 23.0859 56.8011C18.0216 56.8077 12.932 56.5301 7.94071 55.9233ZM47.3078 60.6482C43.9543 63.7398 38.6602 64.2106 34.7234 62.0391L49.8456 46.2564C49.9032 46.365 49.9788 46.4442 50.0341 46.5555C50.8111 48.1509 51.2222 49.9619 51.2222 51.7892C51.2222 55.1989 49.8107 58.4162 47.3078 60.6482ZM22.4095 33.4124C31.2351 33.4124 38.4165 25.9173 38.4165 16.7062C38.4165 7.49507 31.2351 0 22.4095 0C13.5838 0 6.40243 7.49507 6.40243 16.7062C6.40243 25.9173 13.5838 33.4124 22.4095 33.4124ZM22.4095 6.68248C27.7056 6.68248 32.0137 11.1788 32.0137 16.7062C32.0137 22.2336 27.7056 26.7299 22.4095 26.7299C17.1134 26.7299 12.8053 22.2336 12.8053 16.7062C12.8053 11.1788 17.1134 6.68248 22.4095 6.68248Z" fill="#AF1C1C"/>
                      </svg>
                    </span>
                    <p className='text-[14px] font-[Poppins] font-[500]'>
                      Block
                    </p>
                  </span>
                  )
                )
              }
            </div>)}
          </div>
        </div>
        <div className='message__body flex-1 flex flex-col max-h-[calc(100%-208px)] overflow-y-scroll no-scrollbar'>
          <div className='chat__start w-full flex flex-col items-center justify-start mt-[32px] gap-[16px] self-start'>
              <img src="/userProfile.jpg" alt=""  className='w-[150px] h-[150px] rounded-full outline outline-[6px] outline-[#FFF]
              message-avatar-shadow object-cover
              '/>
              <span className='text-center max-w-[80%]'>
                <p className='max-w-[300px] truncate text-[30px] text-[#4278A7] font-[600] font-[Poppins]'>{`${receiver?.firstName} ${receiver?.lastName}`}</p>
              </span>
          </div>
          <div className='flex flex-col px-[45px] gap-[16px] self-start w-full py-[5px]'>
          {
            user && messages && messages.map((message:Message, index) => {
              return (
                message.fromId !== user.id ?
                (!isBlocked && <LeftMessages key={`i+${index}`} message={message} sender={receiver}/>)
                :
                (<RightMessages key={`i+${index}`} message={message} />)
              )
            })
          }
          </div>
        </div>
        <div className='w-full min-h-[90px] bg-[#FFF] px-[42px] py-[15px] lsm:max-lg:px-[10px] border-t-[1px] boder-[#EAEAEA]'>
          <form className='flex pr-[5px] bg-[#F5FBFF] h-full w-full rounded-[23px] items-center ' onSubmit={(e) => handleSubmit(e)}>
            {
              !isBlocked  ? (
                <>
                  <input ref={inputRef} type="text" autoFocus  className='lsm:w-[150px] lsm:max-lg:w-[200px] messageInput flex-1 outline-none bg-transparent text-[#064A85] font-[Poppins] font-[500] text-[16px] placeholder-[#064A85] placeholder-opacity-[0.5] px-[15px]' placeholder='Type a message...' />
                  <button className='min-w-[33px] h-[50px] flex items-center justify-center mr-[5px] ' type='submit'>
                    <svg  viewBox="0 0 38 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path  d="M2.2635 13.6044C-0.636006 10.1992 1.30472 4.94392 5.70971 4.27612L30.4903 0.516263C35.2364 -0.205318 38.7122 4.93021 36.2783 9.06811L23.5786 30.6777C21.3215 34.5189 15.7229 34.3663 13.6377 30.41L9.77073 23.0739L22.5082 14.453C22.9244 14.1714 23.211 13.7351 23.3051 13.2401C23.3991 12.7452 23.2929 12.2321 23.0098 11.8138C22.7267 11.3955 22.2898 11.1062 21.7954 11.0096C21.3009 10.9129 20.7894 11.0169 20.3732 11.2985L7.63729 19.9184L2.26507 13.6033L2.2635 13.6044Z" fill="#064A85" />
                    </svg> 
                  </button>
                </>
              )
              :
              (
                <div className='cursor-not-allowed flex items-center justify-center lsm:w-[150px] lsm:max-lg:w-[200px] messageInput flex-1 outline-none bg-transparent text-[#064A85] font-[Poppins] font-[500] text-[16px] placeholder-[#064A85] placeholder-opacity-[0.5] px-[15px]'>
                  {`You can't send message to ${receiver?.username}`}
                </div>
              )
            }
          </form>
        </div>
      </div>
  )
}
