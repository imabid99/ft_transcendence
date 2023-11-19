'use client';
import { useState , useEffect , useRef, use } from 'react';
import { useParams } from 'next/navigation';
import Avatar from '@/components/Dashboard/Chat/Avatar/Avatar';
import LeftMessagesGroup from '@/components/Dashboard/Chat/Messages/LeftMessagesGroup';
import RightMessages from '@/components/Dashboard/Chat/Messages/RightMessages';
import Link from 'next/link';
import ChannelInfo  from '@/components/Dashboard/Chat/Messages/ChannelInfo';
import axiosInstance from '@/utils/axiosInstance';
import { useContext } from 'react';
import { contextdata } from '@/app/contextApi';
import NotMemmber from '../NotMemmber';

type Message = {
  fromName :    string,
  content :     string,
  createdAt:    string,
  Avatar?:      string,
}


export default function Page() {
  const { msgId } = useParams();
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [show, setShow] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [member, setMember] = useState<boolean>(true);
  const [group, setGroup] = useState<any>(null);
  const infoRef = useRef<HTMLInputElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);;
  const {user, profiles, socket} :any= useContext(contextdata);
  
  const getAvatar = (id: number) => {
    const profile = profiles.find((profile:any) => profile.userId === id);
    if (profile) {
      return profile.avatar;
    }
    return null;
  }

  useEffect(() => {
    async function getgroup() {
      try {
        const res = await axiosInstance.get(`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/chat/channel/${msgId}`);
        setGroup(res.data);
        setMessages(res.data.channel.Messages);
        setMember(true);
      } catch (err) {
        setMember(false);
        console.log(err);
      }
    }
    getgroup();
    return () => {
      setGroup(null);
    }
  }, []);

  useEffect(() => {
    if( !socket) return;
    socket.on('message-to-group', (payload:any) => {
      if (payload.groupId !== msgId) return;
      const newMessage: Message = {
        fromName: payload.fromName,
        content: payload.content,
        createdAt: payload.createdAt,
        Avatar: payload.Avatar,
      };
      console.log("newMessage: ", newMessage)
      if(messages?.length === 0)
        setMessages([newMessage])
      else
        setMessages((messages:any) => [...messages, newMessage]);
      console.log(messages)
    });
    
    return () => {
      socket.off('message-to-group');
    }
  }, [socket]);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
		e.preventDefault();
		if (!inputRef.current?.value || !group.channel.name) return;
    const content = inputRef.current?.value.trim();
    if(content === '') return;
		const payload = {
			groupId: msgId,
			message: {
				fromName: user.username,
				content: content,
				createdAt: new Date().toISOString(),
        groupId: msgId,
        Avatar: getAvatar(user.id),
			},
		}
		socket.emit("message-to-group", payload);
		inputRef.current.value = '';
	}

  useEffect(() => {
    if(!messages) return;
     const scrol = document.querySelector('.message__body');
     if (scrol) {
       scrol.scrollTop = scrol.scrollHeight;
     }
  }, [messages])

  if (!member) {
    return (
      <NotMemmber />
    )
  }

  if(messages === null)
  {
    return (
			<div className="flex justify-center items-center  bg-gray-50 dark:bg-gray-900 w-[calc(100%-450px)] min-h-full min-w-[490px] lg:max-xl:w-[calc(100%-350px)] lsm:max-lg:min-w-full ">
				<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
			</div>
    )
  }

  const handleshowInfo = () => {
    infoRef.current?.classList.toggle("right-[-700px]");
    infoRef.current?.classList.toggle("right-0");
    setShowInfo(!showInfo);
  }

  messages?.sort((a, b) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  })
  return (
      <div className='message w-[calc(100%-450px)] min-h-full flex flex-col min-w-[490px] lg:max-xl:w-[calc(100%-350px)] lsm:max-lg:min-w-full '>
        {show && <div className='message__header__bg w-full h-full absolute top-0 left-0 z-[1]' onClick={() => setShow(false)}></div>}
        <div className='message__header flex justify-between items-center px-[42px] py-[20px] bg-[#FFF] lsm:max-lg:px-[10px] border-b-[1px] boder-[#EAEAEA] h-[100px]' >
          <div className='message__header__left flex items-center gap-[10px]'>
            <Link href="/Chat" className='pr-[10px] py-[5px] lg:hidden'>
              <svg width="9" height="13" viewBox="0 0 9 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.04118 12.0012C6.56787 12.0017 6.1088 11.8393 5.74118 11.5412L0.64118 7.33117C0.441185 7.17195 0.279673 6.96968 0.168662 6.73941C0.0576506 6.50914 0 6.2568 0 6.00117C0 5.74554 0.0576506 5.49319 0.168662 5.26292C0.279673 5.03265 0.441185 4.83038 0.64118 4.67117L5.74118 0.461168C6.04821 0.215162 6.41818 0.0603538 6.80891 0.0143849C7.19965 -0.031584 7.59544 0.0331352 7.95118 0.201168C8.26035 0.337447 8.52377 0.559841 8.70996 0.841787C8.89615 1.12373 8.99725 1.45331 9.00118 1.79117V10.2112C8.99725 10.549 8.89615 10.8786 8.70996 11.1606C8.52377 11.4425 8.26035 11.6649 7.95118 11.8012C7.66531 11.9312 7.35521 11.9993 7.04118 12.0012Z" fill="#00498A"/>
              </svg>
            </Link>
            <div className='message__header__left flex items-center cursor-pointer pr-[30px] z-[1]' onClick={()=>handleshowInfo()}>
              <Avatar url={`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/${group?.channel.avatar}`} status={false} />
              <div className='message__header__left__info ml-2'>
                <div className='message__header__left__info__name text-[#034B8A] font-[600] font-[Poppins] text-[25px] truncate max-w-[250px] lsm:max-lg:max-w-[150px]'>{`${group?.channel.name}`}</div>
                <div className='message__header__left__info__status text-[#C0C1C5] text-[16px] font-[Poppins]'>{group?.channel.Members.length} members</div>
              </div>
            </div>
          </div>
        </div>
        <div className='message__body flex-1 flex flex-col max-h-[calc(100%-200px)] overflow-y-scroll no-scrollbar'>
          <div className='chat__start w-full flex flex-col items-center justify-start mt-[32px] gap-[16px] self-start'>
              <img src={`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/${group?.channel.avatar}`} alt=""  className='w-[150px] h-[150px] rounded-full outline outline-[6px] outline-[#FFF]
              message-avatar-shadow object-cover
              '/>
              <span className='text-center max-w-[80%]'>
                <p className='max-w-[300px] truncate text-[30px] text-[#4278A7] font-[600] font-[Poppins]'>{`${group?.channel.name}`}</p>
              </span>
          </div>
          <div className='flex flex-col px-[45px] gap-[16px] self-start w-full py-[5px]'>
          {
            user && messages?.map((message:Message, index) => {
              return (
                message.fromName !== user.username ? (<LeftMessagesGroup key={`LeftMessagesGroup${index}`} message={message} />) : (<RightMessages key={`RightMessages${index}`} message={message} avatar={getAvatar(user.id)} />)
              )
            })
          }
          </div>
        </div>
        <div className='w-full min-h-[90px] bg-[#FFF] px-[42px] py-[15px] lsm:max-lg:px-[10px] border-t-[1px] boder-[#EAEAEA] h-[100px] flex justify-center items-center'>
          <form className='flex  h-full w-full  items-center gap-[12px]' onSubmit={(e) => handleSubmit(e)}>
            <div className='h-full flex items-center justify-center bg-[#F5FBFF] w-[calc(100%-80px)] rounded-[23px]'>
              <input ref={inputRef} type="text" autoFocus  className='w-full messageInput flex-1 outline-none bg-transparent text-[#064A85] font-[Poppins] font-[500] text-[16px] placeholder-[#064A85] placeholder-opacity-[0.5] px-[15px] ' placeholder='Type a message...' />
            </div>
            <button className='w-[70px] h-[70px] flex items-center justify-center bg-[#F5FBFF]  rounded-full ' type='submit'>
              <svg  viewBox="0 0 38 34" fill="none" xmlns="http://www.w3.org/2000/svg" width={34} height={33}>
                <path  d="M2.2635 13.6044C-0.636006 10.1992 1.30472 4.94392 5.70971 4.27612L30.4903 0.516263C35.2364 -0.205318 38.7122 4.93021 36.2783 9.06811L23.5786 30.6777C21.3215 34.5189 15.7229 34.3663 13.6377 30.41L9.77073 23.0739L22.5082 14.453C22.9244 14.1714 23.211 13.7351 23.3051 13.2401C23.3991 12.7452 23.2929 12.2321 23.0098 11.8138C22.7267 11.3955 22.2898 11.1062 21.7954 11.0096C21.3009 10.9129 20.7894 11.0169 20.3732 11.2985L7.63729 19.9184L2.26507 13.6033L2.2635 13.6044Z" fill="#064A85" />
              </svg> 
            </button>
          </form>
        </div>
        {
          showInfo && <div className="w-full h-full fixed top-0 left-0 z-[50]  inset-0 bg-black bg-opacity-5 backdrop-blur-[1.5px]" onClick={()=>{handleshowInfo()}}/>
        }
        {group && user && <ChannelInfo infoRef={infoRef} handleshowInfo={handleshowInfo} group={group} userId={user.id}/>}
      </div>
  )
}
