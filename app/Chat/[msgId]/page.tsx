'use client';
import { useParams } from 'next/navigation';
import Avatar from '@/components/Dashboard/Chat/Avatar/Avatar';
import LeftMessages from '@/components/Dashboard/Chat/Messages/LeftMessages';
import RightMessages from '@/components/Dashboard/Chat/Messages/RightMessages';
import { useState , useEffect } from 'react';

export default function Page() {
  const { msgId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState <any[]>( [
    {
      "message_id": 1333521513,
      "message_from": 1333521511,
      "message_to": 1333521512,
      "content": "Can someone help me with this?Can someone help me with this?Can someone help me with this?Can someone help me with this?Can someone help me with this?Can someone help me with this?Can someone help me with this?Can someone help me with this?Can someone help me with this?Can someone help me with this?",
      "created_at": "2021-09-23T07:45:13.000000Z",
    },
    {
      "message_id": 1333521513,
      "message_from": 1333521512,
      "message_to": 1333521511,
      "content": "Can someone help me with this?Can someone help me with this?Can someone help me with this?Can someone help me with this?Can someone help me with this?Can someone help me with this?Can someone help me with this?Can someone help me with this?Can someone help me with this?Can someone help me with this?",
      "created_at": "2021-09-23T07:45:14.000000Z",
    },
    {
      "message_id": 1333521513,
      "message_from": 1333521511,
      "message_to": 1333521512,
      "content": "Can someone help me with this?",
      "created_at": "2021-09-23T07:45:15.000000Z",
    },
    {
      "message_id": 1333521513,
      "message_from": 1333521512,
      "message_to": 1333521511,
      "content": "Can someone help me with this?",
      "created_at": "2021-09-23T07:45:16.000000Z",
    },
    {
      "message_id": 1333521513,
      "message_from": 1333521511,
      "message_to": 1333521512,
      "content": "Can someone help me with this?",
      "created_at": "2021-09-23T07:45:17.000000Z",
    },
    {
      "message_id": 1333521513,
      "message_from": 1333521512,
      "message_to": 1333521511,
      "content": "Can someone help me with this?",
      "created_at": "2021-09-23T07:45:18.000000Z",
    },
    {
      "message_id": 1333521513,
      "message_from": 1333521511,
      "message_to": 1333521512,
      "content": "Can someone help me with this?",
      "created_at": "2021-09-23T07:45:19.000000Z",
    },
    {
      "message_id": 1333521513,
      "message_from": 1333521512,
      "message_to": 1333521511,
      "content": "Can someone help me with this?",
      "created_at": "2021-09-23T07:19:20.000000Z",
    },
    {
      "message_id": 1333521513,
      "message_from": 1333521511,
      "message_to": 1333521512,
      "content": "Can someone help me with this?",
      "created_at": "2021-09-22T07:45:21.000000Z",
    },
    {
      "message_id": 1333521513,
      "message_from": 1333521512,
      "message_to": 1333521511,
      "content": "Can someone help me with this?",
      "created_at": "2021-09-22T07:45:22.000000Z",
    },
    {
      "message_id": 1333521513,
      "message_from": 1333521511,
      "message_to": 1333521512,
      "content": "Can someone help me with this?",
      "created_at": "2020-09-23T07:45:23.000000Z",
    },
    {
      "message_id": 1333521513,
      "message_from": 1333521512,
      "message_to": 1333521511,
      "content": "Can someone help me with this?",
      "created_at": "2020-09-23T07:45:24.000000Z",
    },
    {
      "message_id": 1333521513,
      "message_from": 1333521511,
      "message_to": 1333521512,
      "content": "Can someone help me with this?",
      "created_at": "2020-09-23T07:45:25.000000Z",
    },
    {
      "message_id": 1333521513,
      "message_from": 1333521512,
      "message_to": 1333521511,
      "content": "Can someone help me with this?",
      "created_at": "2020-09-23T07:45:26.000000Z",
    },
    {
      "message_id": 1333521513,
      "message_from": 1333521511,
      "message_to": 1333521512,
      "content": "Can someone help me with this?",
      "created_at": "2020-09-23T07:35:27.000000Z",
    }
  ]);
  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (e.target[0].value === '') return;
    const newMessage ={
      "message_id": 1333521513,
      "message_from": 1333521511,
      "message_to": 1333521512,
      "content": e.target[0].value,
      "created_at": new Date().toISOString(),
    }
    setMessages([...messages, newMessage]);
    e.target[0].value = '';
  }

  const user_id = 1333521511;
  messages.sort((a, b) => {
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  })

 useEffect(() => {
    const scrol = document.querySelector('.message__body');
    if (scrol) {
      scrol.scrollTop = scrol.scrollHeight;
      setIsLoading(false);
    }
    console.log('scroll');
  }, [])
  return (
    <div className='message w-[calc(100%-490px)] min-h-full flex flex-col min-w-[490px]'>
      <div className='message__header flex justify-between items-center px-[42px] py-[35px] bg-[#FFF] '>
        <div className='message__header__left flex items-center'>
          <Avatar url="https://i.pravatar.cc" status={false} />
          <div className='message__header__left__info ml-2'>
            <div className='message__header__left__info__name text-[#034B8A] font-[600] font-[Poppins] text-[25px]'>{msgId.replace(/%20/g, ' ')}
            </div>
            <div className='message__header__left__info__status text-[#C0C1C5] text-[16px] font-[Poppins]'>Online</div>
          </div>
        </div>
        <div className='message__header__right flex flex-col items-center justify-center gap-[2px] cursor-pointer'>
          <span className='w-[7px] h-[7px] bg-[#02549D] rounded-full'></span>
          <span className='w-[7px] h-[7px] bg-[#02549D] rounded-full'></span>
          <span className='w-[7px] h-[7px] bg-[#02549D] rounded-full'></span>
        </div>
      </div>
      <div className='message__body flex-1 flex flex-col max-h-[calc(100%-224px)] overflow-y-scroll no-scrollbar '>
        <div className='chat__start w-full flex flex-col items-center justify-start mt-[32px] gap-[16px] self-start'>
            <img src="https://i.pravatar.cc" alt=""  className='w-[150px] h-[150px] rounded-full outline outline-[6px] outline-[#FFF]
            message-avatar-shadow
            '/>
            <span className='text-center'>
              <p className='text-[30px] text-[#4278A7] font-[600] font-[Poppins]'>{msgId.replace(/%20/g, ' ')}</p>
              <p className='text-[20px] text-[#4278a780] font-[500] font-[Poppins]'>{msgId.replace(/%20/g, ' ')}</p>
            </span>
        </div>
        <div className='flex flex-col px-[45px] gap-[16px] self-start w-full py-[5px]'>
        {
          messages.map((message, index) => {
            return (
              message.message_from !== user_id ? (<LeftMessages key={index} message={message} />) : (<RightMessages key={index} message={message} />)
            )
          })
        }
        </div>
      </div>
      <div className='w-full min-h-[90px] bg-[#FFF] px-[42px] py-[15px]'>
        <form className='flex bg-[#F5FBFF] h-full w-full rounded-[23px] items-center' onSubmit={(e) => handleSubmit(e)}>
          <span className='cursor-pointer p-[20px]'>
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.20833 12.4583C9.63931 12.4583 10.0526 12.2871 10.3574 11.9824C10.6621 11.6776 10.8333 11.2643 10.8333 10.8333C10.8333 10.4024 10.6621 9.98903 10.3574 9.68429C10.0526 9.37954 9.63931 9.20833 9.20833 9.20833C8.77736 9.20833 8.36403 9.37954 8.05929 9.68429C7.75454 9.98903 7.58333 10.4024 7.58333 10.8333C7.58333 11.2643 7.75454 11.6776 8.05929 11.9824C8.36403 12.2871 8.77736 12.4583 9.20833 12.4583ZM8.96133 16.6118C8.86687 16.5043 8.75204 16.4166 8.62348 16.3537C8.49492 16.2909 8.35517 16.2541 8.21232 16.2455C8.06946 16.237 7.92633 16.2568 7.79118 16.3039C7.65604 16.351 7.53156 16.4244 7.42493 16.5198C7.31831 16.6153 7.23166 16.7309 7.16998 16.8601C7.10831 16.9892 7.07283 17.1293 7.0656 17.2722C7.05837 17.4151 7.07953 17.5581 7.12786 17.6928C7.17618 17.8275 7.25072 17.9513 7.34717 18.057C8.05805 18.8528 8.92919 19.4893 9.90341 19.9247C10.8776 20.3601 11.9329 20.5845 13 20.5833C14.0671 20.5845 15.1224 20.3601 16.0966 19.9247C17.0708 19.4893 17.942 18.8528 18.6528 18.057C18.8413 17.8425 18.9375 17.5622 18.9204 17.2771C18.9034 16.9921 18.7744 16.7253 18.5617 16.5348C18.3489 16.3443 18.0695 16.2455 17.7843 16.26C17.4991 16.2744 17.2311 16.4008 17.0387 16.6118C16.5311 17.1808 15.9088 17.6358 15.2127 17.9468C14.5165 18.2579 13.7625 18.418 13 18.4167C11.3967 18.4167 9.95583 17.7212 8.96133 16.6118ZM18.4167 10.8333C18.4167 11.2643 18.2455 11.6776 17.9407 11.9824C17.636 12.2871 17.2226 12.4583 16.7917 12.4583C16.3607 12.4583 15.9474 12.2871 15.6426 11.9824C15.3379 11.6776 15.1667 11.2643 15.1667 10.8333C15.1667 10.4024 15.3379 9.98903 15.6426 9.68429C15.9474 9.37954 16.3607 9.20833 16.7917 9.20833C17.2226 9.20833 17.636 9.37954 17.9407 9.68429C18.2455 9.98903 18.4167 10.4024 18.4167 10.8333ZM26 13C26 11.2928 25.6637 9.60235 25.0104 8.02512C24.3571 6.44788 23.3995 5.01477 22.1924 3.80761C20.9852 2.60045 19.5521 1.64288 17.9749 0.989566C16.3977 0.336255 14.7072 0 13 0C11.2928 0 9.60235 0.336255 8.02512 0.989566C6.44788 1.64288 5.01477 2.60045 3.80761 3.80761C2.60045 5.01477 1.64288 6.44788 0.989566 8.02512C0.336255 9.60235 -2.5439e-08 11.2928 0 13C5.13764e-08 16.4478 1.36964 19.7544 3.80761 22.1924C6.24558 24.6304 9.55219 26 13 26C16.4478 26 19.7544 24.6304 22.1924 22.1924C24.6304 19.7544 26 16.4478 26 13ZM2.16667 13C2.16667 10.1268 3.30803 7.37132 5.33968 5.33968C7.37132 3.30803 10.1268 2.16667 13 2.16667C15.8732 2.16667 18.6287 3.30803 20.6603 5.33968C22.692 7.37132 23.8333 10.1268 23.8333 13C23.8333 15.8732 22.692 18.6287 20.6603 20.6603C18.6287 22.692 15.8732 23.8333 13 23.8333C10.1268 23.8333 7.37132 22.692 5.33968 20.6603C3.30803 18.6287 2.16667 15.8732 2.16667 13Z" fill="#064A85" />
            </svg>
          </span>
          <div className=' line w-[1px] h-[40px] bg-[#064A85] opacity-[0.3]'/>
            <input type="text" className='flex-1 outline-none bg-transparent text-[#064A85] font-[Poppins] font-[500] text-[16px] placeholder-[#064A85] placeholder-opacity-[0.5] px-[15px]' placeholder='Type a message...' />
            <button className=' w-[55px] h-[50px] flex items-center justify-center' type='submit'>
              <svg width="35" height="30" viewBox="0 0 38 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path  d="M2.2635 13.6044C-0.636006 10.1992 1.30472 4.94392 5.70971 4.27612L30.4903 0.516263C35.2364 -0.205318 38.7122 4.93021 36.2783 9.06811L23.5786 30.6777C21.3215 34.5189 15.7229 34.3663 13.6377 30.41L9.77073 23.0739L22.5082 14.453C22.9244 14.1714 23.211 13.7351 23.3051 13.2401C23.3991 12.7452 23.2929 12.2321 23.0098 11.8138C22.7267 11.3955 22.2898 11.1062 21.7954 11.0096C21.3009 10.9129 20.7894 11.0169 20.3732 11.2985L7.63729 19.9184L2.26507 13.6033L2.2635 13.6044Z" fill="#064A85" />
              </svg> 
            </button>
        </form>
      </div>
    </div>
  )
}
