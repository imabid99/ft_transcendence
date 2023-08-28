'use client';
import { useState , useEffect , useRef, use } from 'react';
import { useParams } from 'next/navigation';
import Avatar from '@/components/Dashboard/Chat/Avatar/Avatar';
import LeftMessagesGroup from '@/components/Dashboard/Chat/Messages/LeftMessagesGroup';
import RightMessages from '@/components/Dashboard/Chat/Messages/RightMessages';
import Link from 'next/link';
import ChannelInfo  from '@/components/Dashboard/Chat/Messages/ChannelInfo';
import axiosInstance from '@/utils/axiosInstance';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { contextdata } from '@/app/contextApi';
type Message = {
  fromName :    string,
  content :     string,
  createdAt:    string,
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
  const {user, socket} :any= useContext(contextdata);
  
  
  useEffect(() => {
    async function getgroup() {
      try {
        const res = await axiosInstance.get(`http://10.13.1.7:3000/api/chat/channel/${msgId}`);
        setGroup(res.data);
        setMessages(res.data.Messages);
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
      console.log("message-to-group payload : ",payload);
      const newMessage: Message = {
        fromName: payload.fromName,
        content: payload.content,
        createdAt: payload.createdAt,
      };
  
      setMessages((messages:any) => [...messages, newMessage]);
    });
    socket.on('refresh', () => {
      async function getgroup() {
        try {
          const res = await axiosInstance.get(`http://10.13.1.7:3000/api/chat/channel/${msgId}`);
          setGroup(res.data);
          setMessages(res.data.Messages);
        } catch (err) {
          console.log(err);
        }
      }
      getgroup();
    });
    
    return () => {
      socket.off('message-to-group');
    }
    
  }, [socket]);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
		e.preventDefault();
		if (!inputRef.current?.value || !group.name) return;
		const payload = {
			groupId: msgId,
			message: {
				fromName: user.username,
				content: inputRef.current.value,
				createdAt: new Date().toISOString(),
			},
		}
		socket.emit("message-to-group", payload);
		inputRef.current.value = '';
	}

  console.log("group : ", group);
  useEffect(() => {
    if(!messages) return;
     const scrol = document.querySelector('.message__body');
     if (scrol) {
       scrol.scrollTop = scrol.scrollHeight;
     }
  }, [messages])

  if (!member) {
    return (
      <div className=' items-center justify-center w-[calc(100%-450px)] min-h-full flex flex-col min-w-[490px] lg:max-xl:w-[calc(100%-350px)] lsm:max-lg:min-w-full '>
          <h1 className='text-[100px] text-[#034B8A] font-bold'>404</h1>
          <h1 className='text-[30px] text-[#034B8A] font-bold'>Page Not Found</h1>
          <Link href="/Chat" className='text-[#AF1C1C] font-bold underline'>
            Go Back
          </Link>
      </div>
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
    console.log("message__info");
    console.log(showInfo);
    infoRef.current?.classList.toggle("right-[-700px]");
    infoRef.current?.classList.toggle("right-0");
    setShowInfo(!showInfo);
  }

  // sort messages by date
  messages?.sort((a, b) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  })
  
  return (
      <div className='message w-[calc(100%-450px)] min-h-full flex flex-col min-w-[490px] lg:max-xl:w-[calc(100%-350px)] lsm:max-lg:min-w-full '>
        {show && <div className='message__header__bg w-full h-full absolute top-0 left-0 z-[1]' onClick={() => setShow(false)}></div>}
        <div className='message__header flex justify-between items-center px-[42px] py-[20px] bg-[#FFF] lsm:max-lg:px-[10px]' >
          <div className='message__header__left flex items-center gap-[10px]'>
            <Link href="/Chat" className='pr-[10px] py-[5px] lg:hidden'>
              <svg width="9" height="13" viewBox="0 0 9 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.04118 12.0012C6.56787 12.0017 6.1088 11.8393 5.74118 11.5412L0.64118 7.33117C0.441185 7.17195 0.279673 6.96968 0.168662 6.73941C0.0576506 6.50914 0 6.2568 0 6.00117C0 5.74554 0.0576506 5.49319 0.168662 5.26292C0.279673 5.03265 0.441185 4.83038 0.64118 4.67117L5.74118 0.461168C6.04821 0.215162 6.41818 0.0603538 6.80891 0.0143849C7.19965 -0.031584 7.59544 0.0331352 7.95118 0.201168C8.26035 0.337447 8.52377 0.559841 8.70996 0.841787C8.89615 1.12373 8.99725 1.45331 9.00118 1.79117V10.2112C8.99725 10.549 8.89615 10.8786 8.70996 11.1606C8.52377 11.4425 8.26035 11.6649 7.95118 11.8012C7.66531 11.9312 7.35521 11.9993 7.04118 12.0012Z" fill="#00498A"/>
              </svg>
            </Link>
            <div className='message__header__left flex items-center cursor-pointer pr-[30px]' onClick={()=>handleshowInfo()}>
              <Avatar url="/userProfile.jpg" status={false} />
              <div className='message__header__left__info ml-2'>
                <div className='message__header__left__info__name text-[#034B8A] font-[600] font-[Poppins] text-[25px] truncate max-w-[250px] lsm:max-lg:max-w-[150px]'>{`${group?.name}`}</div>
              </div>
            </div>
          </div>
        </div>
        <div className='message__body flex-1 flex flex-col max-h-[calc(100%-208px)] overflow-y-scroll no-scrollbar'>
          <div className='chat__start w-full flex flex-col items-center justify-start mt-[32px] gap-[16px] self-start'>
              <img src="/userProfile.jpg" alt=""  className='w-[150px] h-[150px] rounded-full outline outline-[6px] outline-[#FFF]
              message-avatar-shadow object-cover
              '/>
              <span className='text-center max-w-[80%]'>
                <p className='max-w-[300px] truncate text-[30px] text-[#4278A7] font-[600] font-[Poppins]'>{`${group?.name}`}</p>
              </span>
          </div>
          <div className='flex flex-col px-[45px] gap-[16px] self-start w-full py-[5px]'>
          {
            user && messages?.map((message:Message, index) => {
              return (
                message.fromName !== user.username ? (<LeftMessagesGroup key={`i+${index}`} message={message} />) : (<RightMessages key={`i+${index}`} message={message} />)
              )
            })
          }
          </div>
        </div>
        <div className='w-full min-h-[90px] bg-[#FFF] px-[42px] py-[15px] lsm:max-lg:px-[10px]'>
          <form className='flex pr-[5px] bg-[#F5FBFF] h-full w-full rounded-[23px] items-center' onSubmit={(e) => handleSubmit(e)}>
            <span className='cursor-pointer p-[20px] relative lsm:max-lg:hidden'>
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.20833 12.4583C9.63931 12.4583 10.0526 12.2871 10.3574 11.9824C10.6621 11.6776 10.8333 11.2643 10.8333 10.8333C10.8333 10.4024 10.6621 9.98903 10.3574 9.68429C10.0526 9.37954 9.63931 9.20833 9.20833 9.20833C8.77736 9.20833 8.36403 9.37954 8.05929 9.68429C7.75454 9.98903 7.58333 10.4024 7.58333 10.8333C7.58333 11.2643 7.75454 11.6776 8.05929 11.9824C8.36403 12.2871 8.77736 12.4583 9.20833 12.4583ZM8.96133 16.6118C8.86687 16.5043 8.75204 16.4166 8.62348 16.3537C8.49492 16.2909 8.35517 16.2541 8.21232 16.2455C8.06946 16.237 7.92633 16.2568 7.79118 16.3039C7.65604 16.351 7.53156 16.4244 7.42493 16.5198C7.31831 16.6153 7.23166 16.7309 7.16998 16.8601C7.10831 16.9892 7.07283 17.1293 7.0656 17.2722C7.05837 17.4151 7.07953 17.5581 7.12786 17.6928C7.17618 17.8275 7.25072 17.9513 7.34717 18.057C8.05805 18.8528 8.92919 19.4893 9.90341 19.9247C10.8776 20.3601 11.9329 20.5845 13 20.5833C14.0671 20.5845 15.1224 20.3601 16.0966 19.9247C17.0708 19.4893 17.942 18.8528 18.6528 18.057C18.8413 17.8425 18.9375 17.5622 18.9204 17.2771C18.9034 16.9921 18.7744 16.7253 18.5617 16.5348C18.3489 16.3443 18.0695 16.2455 17.7843 16.26C17.4991 16.2744 17.2311 16.4008 17.0387 16.6118C16.5311 17.1808 15.9088 17.6358 15.2127 17.9468C14.5165 18.2579 13.7625 18.418 13 18.4167C11.3967 18.4167 9.95583 17.7212 8.96133 16.6118ZM18.4167 10.8333C18.4167 11.2643 18.2455 11.6776 17.9407 11.9824C17.636 12.2871 17.2226 12.4583 16.7917 12.4583C16.3607 12.4583 15.9474 12.2871 15.6426 11.9824C15.3379 11.6776 15.1667 11.2643 15.1667 10.8333C15.1667 10.4024 15.3379 9.98903 15.6426 9.68429C15.9474 9.37954 16.3607 9.20833 16.7917 9.20833C17.2226 9.20833 17.636 9.37954 17.9407 9.68429C18.2455 9.98903 18.4167 10.4024 18.4167 10.8333ZM26 13C26 11.2928 25.6637 9.60235 25.0104 8.02512C24.3571 6.44788 23.3995 5.01477 22.1924 3.80761C20.9852 2.60045 19.5521 1.64288 17.9749 0.989566C16.3977 0.336255 14.7072 0 13 0C11.2928 0 9.60235 0.336255 8.02512 0.989566C6.44788 1.64288 5.01477 2.60045 3.80761 3.80761C2.60045 5.01477 1.64288 6.44788 0.989566 8.02512C0.336255 9.60235 -2.5439e-08 11.2928 0 13C5.13764e-08 16.4478 1.36964 19.7544 3.80761 22.1924C6.24558 24.6304 9.55219 26 13 26C16.4478 26 19.7544 24.6304 22.1924 22.1924C24.6304 19.7544 26 16.4478 26 13ZM2.16667 13C2.16667 10.1268 3.30803 7.37132 5.33968 5.33968C7.37132 3.30803 10.1268 2.16667 13 2.16667C15.8732 2.16667 18.6287 3.30803 20.6603 5.33968C22.692 7.37132 23.8333 10.1268 23.8333 13C23.8333 15.8732 22.692 18.6287 20.6603 20.6603C18.6287 22.692 15.8732 23.8333 13 23.8333C10.1268 23.8333 7.37132 22.692 5.33968 20.6603C3.30803 18.6287 2.16667 15.8732 2.16667 13Z" fill="#064A85" />
              </svg>
            </span>
            <div className=' line w-[1px] h-[40px] bg-[#064A85] opacity-[0.3] lsm:max-lg:hidden' />
              <input ref={inputRef} type="text" autoFocus  className='lsm:w-[150px] lsm:max-lg:w-[200px] messageInput flex-1 outline-none bg-transparent text-[#064A85] font-[Poppins] font-[500] text-[16px] placeholder-[#064A85] placeholder-opacity-[0.5] px-[15px]' placeholder='Type a message...' />
              <button className='min-w-[33px] h-[50px] flex items-center justify-center mr-[5px] ' type='submit'>
                <svg  viewBox="0 0 38 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path  d="M2.2635 13.6044C-0.636006 10.1992 1.30472 4.94392 5.70971 4.27612L30.4903 0.516263C35.2364 -0.205318 38.7122 4.93021 36.2783 9.06811L23.5786 30.6777C21.3215 34.5189 15.7229 34.3663 13.6377 30.41L9.77073 23.0739L22.5082 14.453C22.9244 14.1714 23.211 13.7351 23.3051 13.2401C23.3991 12.7452 23.2929 12.2321 23.0098 11.8138C22.7267 11.3955 22.2898 11.1062 21.7954 11.0096C21.3009 10.9129 20.7894 11.0169 20.3732 11.2985L7.63729 19.9184L2.26507 13.6033L2.2635 13.6044Z" fill="#064A85" />
                </svg> 
              </button>
          </form>
        </div>
        {
          showInfo && <div className="  w-full h-full fixed top-0 left-0 z-[50]  inset-0 bg-white-900 bg-opacity-50 backdrop-blur-sm" onClick={()=>{handleshowInfo()}}/>
        }
        {group && user && <ChannelInfo infoRef={infoRef} handleshowInfo={handleshowInfo} group={group} userId={user.id}/>}
      </div>
  )
}
