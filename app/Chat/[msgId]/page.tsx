'use client';
import { useParams } from 'next/navigation';
import Avatar from '@/components/Dashboard/Chat/Avatar/Avatar';
import LeftMessages from '@/components/Dashboard/Chat/Messages/LeftMessages';
import RightMessages from '@/components/Dashboard/Chat/Messages/RightMessages';
import { useState , useEffect ,useRef} from 'react'
import ChannelInfo  from '@/components/Dashboard/Chat/Messages/ChannelInfo';
import Link from 'next/link';


export default function Page() {
  const [messages, setMessages] = useState <any[]>( [
    {
      "message_id": 1333521513,
      "message_from": 1333521511,
      "message_to": 1333521512,
      "content": "Hey there! How's your day going??",
      "created_at": "Sat Jul 29 2023 13:30",
    },
    {
      "message_id": 1333521513,
      "message_from": 1333521512,
      "message_to": 1333521511,
      "content": "Hi! I'm just a program, so I don't experience days, but I'm here to assist you. How can I help you today?",
      "created_at": "Sat Jul 29 2023 13:32",
    },
    {
      "message_id": 1333521513,
      "message_from": 1333521511,
      "message_to": 1333521512,
      "content": "Oh, right! Well, I'm planning a trip to Europe next month, and I'm still unsure about which countries to visit. Any recommendations?",
      "created_at": "Sat Jul 29 2023 13:33",
    },
    {
      "message_id": 1333521513,
      "message_from": 1333521511,
      "message_to": 1333521512,
      "content": "Oh, right! Well, I'm planning a trip to Europe next month, and I'm still unsure about which countries to visit. Any recommendations?",
      "created_at": "Sat Jul 29 2023 13:33",
    },
    {
      "message_id": 1333521513,
      "message_from": 1333521512,
      "message_to": 1333521511,
      "content": "That sounds exciting! Europe has so much to offer. What are your interests? Are you more into history, art, nature, or something else?",
      "created_at": "Sat Jul 29 2023 13:34",
    },
    {
      "message_id": 1333521513,
      "message_from": 1333521511,
      "message_to": 1333521512,
      "content": "I love history and architecture, but I also enjoy spending time in beautiful natural settings.",
      "created_at": "Sat Jul 29 2023 13:34",
    },
    {
      "message_id": 1333521513,
      "message_from": 1333521512,
      "message_to": 1333521511,
      "content": "Great choices! For history and architecture, you should definitely visit Italy with its stunning cities like Rome, Florence, and Venice. Greece is also a must-visit for its ancient ruins and rich history. And don't forget about France with its iconic landmarks like the Eiffel Tower and historic sites in Paris.",
      "created_at": "Sat Jul 29 2023 13:35",
    },
    {
      "message_id": 1333521513,
      "message_from": 1333521511,
      "message_to": 1333521512,
      "content": "Italy and Greece sound fantastic! What about natural beauty? I've heard Switzerland and Norway are breathtaking.",
      "created_at": "Sat Jul 29 2023 13:36",
    },
    {
      "message_id": 1333521513,
      "message_from": 1333521512,
      "message_to": 1333521511,
      "content": "Absolutely! Switzerland is famous for its picturesque landscapes, from the Swiss Alps to the serene lakes. Norway is equally stunning, with its majestic fjords and Northern Lights during certain times of the year. Both countries offer a lot of outdoor activities too, like hiking and skiing.",
      "created_at": "Sat Jul 29 2023 13:39",
    },
    {
      "message_id": 1333521513,
      "message_from": 1333521511,
      "message_to": 1333521512,
      "content": "Wow, I'm getting more excited about this trip already! By the way, any news on travel restrictions or COVID-19 guidelines in those countries?",
      "created_at": "Sat Jul 29 2023 13:40",
    },
    {
      "message_id": 1333521513,
      "message_from": 1333521512,
      "message_to": 1333521511,
      "content": "As of my last update in September 2021, travel regulations may have changed since then. It's crucial to check the official websites of the countries you plan to visit and consult with their embassies for the most up-to-date information on COVID-19 guidelines and entry requirements.",
      "created_at": "Sat Jul 29 2023 13:43",
    },
    {
      "message_id": 1333521513,
      "message_from": 1333521511,
      "message_to": 1333521512,
      "content": "Right, I'll make sure to do that. Thanks for the reminder. One last question: do you have any tips for budget-friendly travel in Europe?",
      "created_at": "Sat Jul 29 2023 13:44",
    },
    {
      "message_id": 1333521513,
      "message_from": 1333521512,
      "message_to": 1333521511,
      "content": "Of course! Consider using budget airlines for intercity travel, book accommodation in advance to get better deals, and opt for local street food or markets to save on food expenses. Additionally, some cities offer free walking tours, which can be a great way to explore and learn about the history and culture without breaking the bank.",
      "created_at": "Sat Jul 29 2023 13:45",
    },
    {
      "message_id": 1333521513,
      "message_from": 1333521511,
      "message_to": 1333521512,
      "content": "Those are excellent tips! Thanks a bunch for all the information.",
      "created_at": "Sat Jul 29 2023 13:46",
    },
    {
      "message_id": 1333521513,
      "message_from": 1333521512,
      "message_to": 1333521511,
      "content": "You're welcome! If you have any more questions or need further assistance while planning your trip, feel free to ask anytime. Have an amazing time in Europe!",
      "created_at": "Sat Jul 29 2023 13:46",
    },
    {
      "message_id": 1333521513,
      "message_from": 1333521511,
      "message_to": 1333521512,
      "content": " Thanks! I'll definitely reach out if I need more help. Have a great day!",
      "created_at": "Sat Jul 29 2023 13:46",
    }
  ]);
  
  const { msgId } = useParams();
  const [show, setShow] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const infoRef = useRef(null);
  const handleshowInfo = () => {
    console.log("message__info");
    console.log(showInfo);
    infoRef.current?.classList.toggle("right-[-700px]");
    infoRef.current?.classList.toggle("right-0");
    setShowInfo(!showInfo);
  }
  
  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (e.target[0].value === '') return;
    let date = new Date();
    date.setHours(date.getHours() + 1);

    console.log( date.toString().slice(0, 21));
    const newMessage ={
      "message_id": 1333521513,
      "message_from": 1333521511,
      "message_to": 1333521512,
      "content": e.target[0].value,
      "created_at": date.toString().slice(0, 21),
    }

    setMessages([...messages, newMessage]);
    e.target[0].value = '';

    setTimeout(()=>{
      const scrol = document.querySelector('.message__body');
      if (scrol) {
        scrol.scrollTop = scrol.scrollHeight;
      }
    }, 100
    )
  }

  /* sort messages by date */
  const user_id = 1333521511;
  messages.sort((a, b) => {
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  })

  /* scroll to bottom */
 useEffect(() => {
    const scrol = document.querySelector('.message__body');
    if (scrol) {
      scrol.scrollTop = scrol.scrollHeight;
    }
  }, [])


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
              <div className='message__header__left__info__name text-[#034B8A] font-[600] font-[Poppins] text-[25px] truncate lsm:max-lg:max-w-[150px]'>{msgId.replace(/%20/g, ' ')}
              </div>
              <div className='message__header__left__info__status text-[#C0C1C5] text-[16px] font-[Poppins]'>Online</div>
            </div>
          </div>
        </div>
        <div className='message__header__right flex flex-col items-center justify-center gap-[2px] cursor-pointer relative z-[2] px-[10px]' onClick={() => {setShow(!show)}}>
          <span className='w-[7px] h-[7px] bg-[#02549D] rounded-full'></span>
          <span className='w-[7px] h-[7px] bg-[#02549D] rounded-full'></span>
          <span className='w-[7px] h-[7px] bg-[#02549D] rounded-full'></span>
          {show && (<div className='message__header__right__dropdown absolute top-[30px] right-0 min-w-[230px] bg-[#EDFAFF] rounded-[10px] shadow-[0px 4px 4px rgba(0, 0, 0, 0.25)] flex flex-col px-[20px] justify-center gap-[5px]'>
            <span className='py-[10px] text-[#AF1C1C] text-[16px] font-[Poppins] font-[500] flex items-center gap-[15px] '>
              <span >
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.857143 12.4444C0.857143 12.857 1.03775 13.2527 1.35925 13.5444C1.68074 13.8361 2.11677 14 2.57143 14H9.42857C9.88323 14 10.3193 13.8361 10.6408 13.5444C10.9622 13.2527 11.1429 12.857 11.1429 12.4444V3.11111H0.857143V12.4444ZM2.57143 4.66667H9.42857V12.4444H2.57143V4.66667ZM9 0.777778L8.14286 0H3.85714L3 0.777778H0V2.33333H12V0.777778H9Z" fill="#970505"/>
                </svg>
              </span>
              <p className='text-[14px] font-[Poppins] font-[500]'>
                Delete conversation
              </p>
            </span>
            <span className='py-[10px] text-[#AF1C1C] text-[16px] font-[Poppins] font-[500] flex items-center gap-[15px]'>
              <span>
                <svg width="12" height="16" viewBox="0 0 58 71" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M53.7186 40.297C53.5326 40.0361 53.3092 39.7718 53.0825 39.5138L52.8418 39.2365C51.9194 38.189 50.9379 37.3083 49.9186 36.613C49.7889 36.5054 49.6512 36.4075 49.5091 36.3226C49.4889 36.3096 49.4684 36.2965 49.4483 36.2835C48.6447 35.7646 47.8383 35.2882 46.9409 34.8839C41.1336 32.3024 34.2906 33.2056 29.0396 37.5345C23.0767 36.1773 16.9636 36.647 11.3188 38.9104C5.9712 41.0247 1.93359 45.6614 0.515681 51.3258L0.223393 52.5166C-0.301959 54.7091 0.109422 57.0486 1.35061 58.9314C2.67151 60.9348 4.79276 62.2563 7.18454 62.5597C12.2127 63.1735 17.3369 63.4835 22.4095 63.4835C23.7566 63.4835 25.1166 63.4201 26.473 63.3629C26.7144 63.6656 26.894 63.9998 27.1709 64.2864C27.3156 64.4528 27.4527 64.5788 27.6019 64.7375L27.6057 64.7432L27.6111 64.7469C27.8244 64.9737 28.0472 65.225 28.2277 65.3924C28.3481 65.5197 28.584 65.7709 28.9343 66.0222C32.0153 68.6945 35.9406 70.166 40.0172 70.166C44.3004 70.166 48.396 68.5639 51.5084 65.6894C55.3959 62.2239 57.625 57.1566 57.625 51.7892C57.625 48.9114 56.9732 46.0563 55.7304 43.5079C55.1161 42.2647 54.4034 41.1357 53.7186 40.297ZM44.4115 41.0247C44.7323 41.1694 45.0191 41.3595 45.3169 41.5333L30.2052 57.3049C30.0164 56.9464 29.8153 56.5862 29.686 56.2364C29.628 56.0797 29.6079 55.9948 29.5297 55.8515C29.5189 55.8187 29.4251 55.5414 29.4142 55.509C29.0156 54.38 28.8123 53.1304 28.8123 51.7892C28.8123 48.9505 29.7785 46.2488 31.3962 44.3269L32.5061 43.1327C35.6966 40.0982 40.5237 39.2986 44.4115 41.0247ZM7.94071 55.9233C7.38591 55.8548 6.90602 55.5708 6.62621 55.1435C6.41524 54.8271 6.35121 54.4876 6.43093 54.1581L6.71553 53.0031C7.60648 49.44 10.1766 46.5067 13.6014 45.1525C16.4036 44.0298 19.4504 43.4361 22.4095 43.4361C23.0347 43.4361 23.6616 43.4622 24.29 43.5143C24.0336 44.0425 23.8175 44.5912 23.6119 45.1438C23.5815 45.2257 23.5409 45.3022 23.5117 45.3847C23.1919 46.2835 22.9604 47.2154 22.7786 48.1623C22.7347 48.3908 22.6976 48.619 22.6621 48.8496C22.5129 49.8165 22.4095 50.7945 22.4095 51.7892C22.4095 52.7652 22.5004 53.7161 22.6448 54.6587C22.6902 54.9544 22.7668 55.2494 22.8269 55.5431C22.9127 55.9621 22.9697 56.3844 23.0859 56.8011C18.0216 56.8077 12.932 56.5301 7.94071 55.9233ZM47.3078 60.6482C43.9543 63.7398 38.6602 64.2106 34.7234 62.0391L49.8456 46.2564C49.9032 46.365 49.9788 46.4442 50.0341 46.5555C50.8111 48.1509 51.2222 49.9619 51.2222 51.7892C51.2222 55.1989 49.8107 58.4162 47.3078 60.6482ZM22.4095 33.4124C31.2351 33.4124 38.4165 25.9173 38.4165 16.7062C38.4165 7.49507 31.2351 0 22.4095 0C13.5838 0 6.40243 7.49507 6.40243 16.7062C6.40243 25.9173 13.5838 33.4124 22.4095 33.4124ZM22.4095 6.68248C27.7056 6.68248 32.0137 11.1788 32.0137 16.7062C32.0137 22.2336 27.7056 26.7299 22.4095 26.7299C17.1134 26.7299 12.8053 22.2336 12.8053 16.7062C12.8053 11.1788 17.1134 6.68248 22.4095 6.68248Z" fill="#AF1C1C"/>
                </svg>
              </span>
              <p className='text-[14px] font-[Poppins] font-[500]'>
              Block
              </p>
            </span>
            <span className='py-[10px] text-[#AF1C1C] text-[16px] font-[Poppins] font-[900] flex items-center gap-[15px]'>
              <span>
                <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.629032 12.478H3.42612L6.93612 15.8464C7.04095 15.9488 7.17095 16 7.29678 16C7.39742 16 7.49806 15.9716 7.58614 15.9033C7.79581 15.761 7.92581 15.4652 7.92581 15.1465V0.853851C7.92581 0.535225 7.79581 0.239345 7.58614 0.0971014C7.37646 -0.0508381 7.12903 -0.0280564 6.93612 0.153988L3.42612 3.52235H0.629032C0.280959 3.52235 0 3.90925 0 4.37581V11.6246C0 12.0911 0.280959 12.478 0.629032 12.478ZM1.25806 5.22928H2.99839V10.7711H1.25806V5.22928ZM12.8157 5.30888C12.57 4.97549 12.1719 4.97549 11.9262 5.30888L10.8322 6.79327L9.73812 5.30888C9.4924 4.97549 9.09434 4.97549 8.84863 5.30888C8.60291 5.64199 8.60291 6.18262 8.84863 6.51573L9.94268 8.00013L8.84863 9.48452C8.60291 9.81763 8.60291 10.3583 8.84863 10.6914C8.97149 10.8581 9.13243 10.9414 9.29337 10.9414C9.45432 10.9414 9.61526 10.8581 9.73812 10.6914L10.8322 9.20698L11.9262 10.6914C12.0491 10.8581 12.21 10.9414 12.371 10.9414C12.5319 10.9414 12.6929 10.8581 12.8157 10.6914C13.0614 10.3583 13.0614 9.81763 12.8157 9.48452L11.7217 8.00013L12.8157 6.51573C13.0614 6.18262 13.0614 5.64199 12.8157 5.30888Z" fill="#AF1C1C"/>
                </svg>
              </span>
              <p className='text-[14px] font-[Poppins] font-[500]'>
              Mute
              </p>
            </span>
          </div>)}
        </div>
      </div>
      <div className='message__body flex-1 flex flex-col max-h-[calc(100%-208px)] overflow-y-scroll no-scrollbar'>
        <div className='chat__start w-full flex flex-col items-center justify-start mt-[32px] gap-[16px] self-start'>
            <img src="/userProfile.jpg" alt=""  className='w-[150px] h-[150px] rounded-full outline outline-[6px] outline-[#FFF]
            message-avatar-shadow object-cover
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
              message.message_from !== user_id ? (<LeftMessages key={`i+${index}`} message={message} />) : (<RightMessages key={`i+${index}`} message={message} />)
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
            <input  type="text" autoFocus  className='lsm:w-[150px] lsm:max-lg:w-[200px] messageInput flex-1 outline-none bg-transparent text-[#064A85] font-[Poppins] font-[500] text-[16px] placeholder-[#064A85] placeholder-opacity-[0.5] px-[15px]' placeholder='Type a message...' />
            <button className='min-w-[33px] h-[50px] flex items-center justify-center mr-[5px] ' type='submit'>
              <svg  viewBox="0 0 38 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path  d="M2.2635 13.6044C-0.636006 10.1992 1.30472 4.94392 5.70971 4.27612L30.4903 0.516263C35.2364 -0.205318 38.7122 4.93021 36.2783 9.06811L23.5786 30.6777C21.3215 34.5189 15.7229 34.3663 13.6377 30.41L9.77073 23.0739L22.5082 14.453C22.9244 14.1714 23.211 13.7351 23.3051 13.2401C23.3991 12.7452 23.2929 12.2321 23.0098 11.8138C22.7267 11.3955 22.2898 11.1062 21.7954 11.0096C21.3009 10.9129 20.7894 11.0169 20.3732 11.2985L7.63729 19.9184L2.26507 13.6033L2.2635 13.6044Z" fill="#064A85" />
              </svg> 
            </button>
        </form>
      </div>
      {
        showInfo && <div className=" glass w-full h-full fixed top-0 left-0 z-[50] bg-[#fff] opacity-[0.9] filter blur-[4px]" onClick={()=>{handleshowInfo()}}/>
      }
      <ChannelInfo infoRef={infoRef} handleshowInfo={handleshowInfo}/>
    </div>
  )
}
