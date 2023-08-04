import "../globals.css";
import Head from "next/head";
<<<<<<< HEAD
import LeftSide from "@/components/Dashboard/Chat/LeftSide/LeftSide";
import Dashboard from '@/components/Dashboard/Dashboard/Dashboard'
=======
import Channel from "@/components/Dashboard/Chat/Channel/Channel";
import Avatars from "@/components/Dashboard/Chat/Avatar/Avatar";

>>>>>>> 0650be8586181921e07289db010e711347cf96fb
export const metadata = {
  title: "Inbox",
  description: "ft_transcendence",
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
<<<<<<< HEAD
        <meta httpEquiv="refresh" content="0;url=/new-page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div className="h-[100vh] w-[100vw] flex  pl-[150px] bg-[#FAFDFF] lsm:max-lg:overflow-x-hidden lsm:max-lg:pl-[100px]">
          <Dashboard path='Chat'/>
          <LeftSide />
          {children}
        </div>
=======
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-[100vh] w-[100vw] flex ">
        <div className="h-[100vh] w-[100vw] flex  pl-[150px] bg-[#FAFDFF]">
          <div className="chat__left w-[490px] h-full bg-[#FFF] border-r-[1px]">
            <div className="chat__left__head flex justify-between items-center border-b-[1px]  border-[#E5E5E5] pl-[42px] pr-[25px]">
              <div className="flex items-center gap-[10px] py-[35px]">
                <img
                  src="https://i.pravatar.cc"
                  alt=""
                  className="w-[64px] h-[64px] rounded-full object-cover border-[3px] border-[#064A85] border-opacity-25"
                />
                <p className="text-[20px] font-[200] font-[Poppins] text-[#BDBFC3] leading-6">
                  Hello , <br />
                  <span className="text-[20px] font-[500] font-[Poppins] text-[#034B8A]">
                    Achraf Sabbar
                  </span>
                </p>
              </div>
              <div className="z-[50] bg-[#EDFAFF]  cursor-pointer w-[54px] h-[54px] notifShadow flex justify-center items-center rounded-[20px] ">
                <div
                  className="w-[22px] h-[30px] relative  before:absolute before:top-[0px] before:right-[0px] before:w-[10px] before:h-[10px] before:bg-[#AF1C1C] before:rounded-full
                      before:outline before:outline-[2px] before:outline-[#fff]  "
                >
                  <svg
                    width="22"
                    height="30px"
                    viewBox="0 0 34 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.9264 34.4558C13.9262 34.2443 20.0186 34.2443 21.0184 34.4558C21.8731 34.6532 22.7974 35.1145 22.7974 36.1217C22.7477 37.0805 22.1852 37.9305 21.408 38.4704C20.4002 39.256 19.2175 39.7535 17.9811 39.9328C17.2974 40.0214 16.6255 40.0234 15.9656 39.9328C14.7272 39.7535 13.5445 39.256 12.5388 38.4684C11.7596 37.9305 11.197 37.0805 11.1473 36.1217C11.1473 35.1145 12.0716 34.6532 12.9264 34.4558ZM17.0904 0C21.2507 0 25.5005 1.97404 28.0249 5.24933C29.6628 7.35833 30.4141 9.46531 30.4141 12.7406V13.5927C30.4141 16.1045 31.078 17.5851 32.539 19.2912C33.6462 20.5481 34 22.1616 34 23.912C34 25.6605 33.4255 27.3203 32.2747 28.6679C30.768 30.2833 28.6431 31.3147 26.4745 31.494C23.3319 31.7619 20.1873 31.9875 17.001 31.9875C13.8127 31.9875 10.6701 31.8525 7.52751 31.494C5.35691 31.3147 3.23204 30.2833 1.72733 28.6679C0.57644 27.3203 0 25.6605 0 23.912C0 22.1616 0.355802 20.5481 1.46098 19.2912C2.96767 17.5851 3.58784 16.1045 3.58784 13.5927V12.7406C3.58784 9.37668 4.42666 7.17704 6.15399 5.02372C8.72213 1.88339 12.8387 0 16.9115 0H17.0904Z"
                      fill="#00539D"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="chat__left__bottom flex flex-col gap-[24px] px-[25px] py-[25px]">
              <div className="search flex items-center ">
                <span className="p-[15px] bg-[#f5f7f9b3] rounded-l-[15px]">
                  <svg
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.32 17C13.915 17 17.64 13.4183 17.64 9C17.64 4.58172 13.915 1 9.32 1C4.72499 1 1 4.58172 1 9C1 13.4183 4.72499 17 9.32 17Z"
                      stroke="#898F94"
                    />
                    <path
                      d="M19.7193 18.9984L15.1953 14.6484"
                      stroke="#898F94"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Search..."
                  className="rounded-r-[15px] pr-[15px] w-[calc(100%-49px)] bg-[#f5f7f9b3] h-[50px]  outline-none pl-[15px] text-[#898F94] font-[Poppins] font-[300] text-[16px] leading-[24px]"
                />
              </div>
              <div className="chat__left__bottom__online__users flex flex-col gap-[20px]">
                <p className="text-[20px] font-[500] font-[Poppins] text-[#DEDEDE]">
                  Online Now
                </p>
                <div className="flex  gap-[16px] w-[calc(100%-50px)] items-center flex-nowrap overflow-x-scroll no-scrollbar">
                  <Avatars url="https://i.pravatar.cc" status={true} />
                  <Avatars url="https://i.pravatar.cc" status={true} />
                  <Avatars url="https://i.pravatar.cc" status={true} />
                  <Avatars url="https://i.pravatar.cc" status={true} />
                  <Avatars url="https://i.pravatar.cc" status={true} />
                  <Avatars url="https://i.pravatar.cc" status={true} />
                  <Avatars url="https://i.pravatar.cc" status={true} />
                  <Avatars url="https://i.pravatar.cc" status={true} />
                  <Avatars url="https://i.pravatar.cc" status={true} />
                  <Avatars url="https://i.pravatar.cc" status={true} />
                  <Avatars url="https://i.pravatar.cc" status={true} />
                  <Avatars url="https://i.pravatar.cc" status={true} />
                  <Avatars url="https://i.pravatar.cc" status={true} />
                </div>
              </div>
            </div>
            <div className="max-h-[calc(100%-370px)] overflow-y-scroll no-scrollbar h-[calc(100%-373px)] px-[25px] py-[25px]">
              <div className="chat__left__bottom__groups flex flex-col  justify-center items-center">
                <span className="flex items-center justify-start gap-[10px] w-full mb-[20px]">
                  <span className="flex justify-center items-center bg-[#0074D9] rounded-[15px] w-[27px] h-[27px]">
                    <svg
                      width="12"
                      height="10"
                      viewBox="0 0 12 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.74634 0C5.12986 0 4.53862 0.243841 4.1027 0.67788C3.66677 1.11192 3.42188 1.7006 3.42188 2.31443C3.42188 2.92825 3.66677 3.51693 4.1027 3.95097C4.53862 4.38501 5.12986 4.62885 5.74634 4.62885C6.36283 4.62885 6.95407 4.38501 7.38999 3.95097C7.82591 3.51693 8.07081 2.92825 8.07081 2.31443C8.07081 1.7006 7.82591 1.11192 7.38999 0.67788C6.95407 0.243841 6.36283 0 5.74634 0ZM4.15592 2.31443C4.15592 1.89444 4.32348 1.49166 4.62174 1.19468C4.92001 0.89771 5.32454 0.730872 5.74634 0.730872C6.16815 0.730872 6.57268 0.89771 6.87094 1.19468C7.16921 1.49166 7.33677 1.89444 7.33677 2.31443C7.33677 2.73441 7.16921 3.1372 6.87094 3.43417C6.57268 3.73114 6.16815 3.89798 5.74634 3.89798C5.32454 3.89798 4.92001 3.73114 4.62174 3.43417C4.32348 3.1372 4.15592 2.73441 4.15592 2.31443Z"
                        fill="white"
                      />
                      <path
                        d="M8.68401 0.974609C8.58667 0.974609 8.49332 1.01311 8.42449 1.08164C8.35566 1.15018 8.31699 1.24313 8.31699 1.34005C8.31699 1.43696 8.35566 1.52991 8.42449 1.59845C8.49332 1.66698 8.58667 1.70548 8.68401 1.70548C9.35786 1.70548 9.78507 2.14693 9.78507 2.55816C9.78507 2.9694 9.35786 3.41085 8.68401 3.41085C8.58667 3.41085 8.49332 3.44935 8.42449 3.51788C8.35566 3.58641 8.31699 3.67936 8.31699 3.77628C8.31699 3.8732 8.35566 3.96615 8.42449 4.03469C8.49332 4.10322 8.58667 4.14172 8.68401 4.14172C9.6319 4.14172 10.5191 3.49222 10.5191 2.55816C10.5191 1.62411 9.6319 0.974609 8.68401 0.974609ZM3.17869 1.34005C3.17869 1.24313 3.14002 1.15018 3.07119 1.08164C3.00236 1.01311 2.90901 0.974609 2.81167 0.974609C1.86378 0.974609 0.976562 1.62411 0.976562 2.55816C0.976562 3.49222 1.86378 4.14172 2.81167 4.14172C2.90901 4.14172 3.00236 4.10322 3.07119 4.03469C3.14002 3.96615 3.17869 3.8732 3.17869 3.77628C3.17869 3.67936 3.14002 3.58641 3.07119 3.51788C3.00236 3.44935 2.90901 3.41085 2.81167 3.41085C2.13831 3.41085 1.71061 2.9694 1.71061 2.55816C1.71061 2.14693 2.13831 1.70548 2.81167 1.70548C2.90901 1.70548 3.00236 1.66698 3.07119 1.59845C3.14002 1.52991 3.17869 1.43696 3.17869 1.34005Z"
                        fill="white"
                      />
                      <path
                        d="M5.7485 5.36133C4.87548 5.36133 4.06804 5.59521 3.46857 5.99329C2.87155 6.38991 2.44531 6.97753 2.44531 7.67576C2.44531 8.37398 2.87155 8.96209 3.46857 9.35822C4.06804 9.75582 4.87548 9.99018 5.7485 9.99018C6.62153 9.99018 7.42897 9.7563 8.02844 9.35822C8.62546 8.9616 9.0517 8.37398 9.0517 7.67576C9.0517 6.97753 8.62497 6.38942 8.02844 5.99329C7.42897 5.59569 6.62153 5.36133 5.7485 5.36133ZM3.17936 7.67576C3.17936 7.29765 3.41033 6.91078 3.87572 6.60186C4.33914 6.29441 5.00027 6.0922 5.7485 6.0922C6.49723 6.0922 7.15787 6.29441 7.62129 6.60186C8.08667 6.91078 8.31765 7.29765 8.31765 7.67576C8.31765 8.05386 8.08667 8.44073 7.62129 8.74965C7.15787 9.0571 6.49674 9.25931 5.7485 9.25931C4.99978 9.25931 4.33914 9.0571 3.87572 8.74965C3.41033 8.44073 3.17936 8.05386 3.17936 7.67576Z"
                        fill="white"
                      />
                      <path
                        d="M9.30619 6.13538C9.31646 6.08842 9.33592 6.04394 9.36348 6.00448C9.39103 5.96502 9.42613 5.93136 9.46677 5.90543C9.50741 5.87949 9.55278 5.8618 9.6003 5.85335C9.64782 5.8449 9.69654 5.84587 9.74368 5.85619C10.214 5.959 10.6382 6.14464 10.9534 6.40142C11.268 6.65771 11.5 7.01048 11.5 7.43146C11.5 7.85293 11.268 8.20521 10.9534 8.46151C10.6382 8.71829 10.2144 8.90393 9.74368 9.00674C9.69658 9.01704 9.64789 9.018 9.60041 9.00957C9.55294 9.00114 9.50759 8.98348 9.46696 8.9576C9.42634 8.93172 9.39123 8.89812 9.36365 8.85873C9.33606 8.81935 9.31654 8.77493 9.30619 8.72803C9.29585 8.68113 9.29488 8.63266 9.30335 8.58538C9.31181 8.53811 9.32955 8.49296 9.35554 8.45251C9.38153 8.41206 9.41527 8.3771 9.45483 8.34964C9.4944 8.32217 9.539 8.30273 9.58611 8.29243C9.97417 8.20814 10.2839 8.06245 10.4885 7.89581C10.693 7.72917 10.766 7.56594 10.766 7.43146C10.766 7.29698 10.693 7.13424 10.4885 6.96712C10.2839 6.80048 9.97417 6.65528 9.58611 6.5705C9.53899 6.56022 9.49436 6.5408 9.45479 6.51334C9.41521 6.48588 9.38146 6.45093 9.35546 6.41047C9.32946 6.37001 9.31173 6.32485 9.30328 6.27757C9.29482 6.23028 9.29581 6.1818 9.30619 6.1349V6.13538ZM1.75681 5.85619C1.85194 5.83552 1.95143 5.85331 2.03338 5.90567C2.11534 5.95803 2.17304 6.04066 2.19381 6.13538C2.21457 6.23011 2.1967 6.32916 2.14411 6.41076C2.09153 6.49236 2.00854 6.54982 1.9134 6.5705C1.52583 6.65479 1.21606 6.80048 1.01151 6.96712C0.806957 7.13376 0.734043 7.29698 0.734043 7.43146C0.734043 7.56594 0.806957 7.72868 1.01151 7.89581C1.21606 8.06245 1.52583 8.20765 1.91389 8.29243C2.00903 8.31324 2.09196 8.37082 2.14446 8.45251C2.19695 8.5342 2.2147 8.63331 2.19381 8.72803C2.17291 8.82275 2.11508 8.90533 2.03304 8.9576C1.95099 9.00987 1.85145 9.02754 1.75632 9.00674C1.28555 8.90393 0.861766 8.71829 0.546617 8.46151C0.231957 8.20521 0 7.85245 0 7.43146C0 7.00999 0.231957 6.65771 0.546617 6.40142C0.861766 6.14464 1.28604 5.959 1.75681 5.85619Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                  <p className="text-[16px] font-[500] font-[Poppins] text-[#0174D9]">
                    Groups & Channels
                  </p>
                </span>
                <div className="flex flex-col gap-[20px] overflow-y-hidden max-h-[235px] rounded-[5px] w-full">
                  <Channel
                    avatar="https://i.pravatar.cc"
                    channel="1337 team"
                    lastMessage="Ghda anmchi"
                    lastMessageTime="12:00"
                    notification={6}
                    active={false}
                  />
                  <Channel
                    avatar="https://i.pravatar.cc"
                    channel="Channel Name"
                    lastMessage="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                    lastMessageTime="12:00"
                    notification={0}
                    active={false}
                  />
                  <Channel
                    avatar="https://i.pravatar.cc"
                    channel="Leet"
                    lastMessage="Ewa ya hamid"
                    lastMessageTime="12:00"
                    notification={0}
                    active={false}
                  />
                  <Channel
                    avatar="https://i.pravatar.cc"
                    channel="Channel Name"
                    lastMessage="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                    lastMessageTime="12:00"
                    notification={10}
                    active={false}
                  />
                  <Channel
                    avatar="https://i.pravatar.cc"
                    channel="Channel Name"
                    lastMessage="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                    lastMessageTime="12:00"
                    notification={0}
                    active={false}
                  />
                  <Channel
                    avatar="https://i.pravatar.cc"
                    channel="Zanadi9a"
                    lastMessage="Obeaj ara chi bosa"
                    lastMessageTime="12:00"
                    notification={100}
                    active={false}
                  />
                  <Channel
                    avatar="https://i.pravatar.cc"
                    channel="Channel Name"
                    lastMessage="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                    lastMessageTime="12:00"
                    notification={0}
                    active={false}
                  />
                  <Channel
                    avatar="https://i.pravatar.cc"
                    channel="Channel Name"
                    lastMessage="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                    lastMessageTime="12:00"
                    notification={0}
                    active={false}
                  />
                  <Channel
                    avatar="https://i.pravatar.cc"
                    channel="Channel Name"
                    lastMessage="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                    lastMessageTime="12:00"
                    notification={99}
                    active={false}
                  />
                  <Channel
                    avatar="https://i.pravatar.cc"
                    channel="Channel Name"
                    lastMessage="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                    lastMessageTime="12:00"
                    notification={0}
                    active={false}
                  />
                  <Channel
                    avatar="https://i.pravatar.cc"
                    channel="Channel Name"
                    lastMessage="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                    lastMessageTime="12:00"
                    notification={0}
                    active={false}
                  />
                  <Channel
                    avatar="https://i.pravatar.cc"
                    channel="Channel Name"
                    lastMessage="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                    lastMessageTime="12:00"
                    notification={0}
                    active={false}
                  />
                  <Channel
                    avatar="https://i.pravatar.cc"
                    channel="Channel Name"
                    lastMessage="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                    lastMessageTime="12:00"
                    notification={0}
                    active={false}
                  />
                  <Channel
                    avatar="https://i.pravatar.cc"
                    channel="Channel Name"
                    lastMessage="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                    lastMessageTime="12:00"
                    notification={0}
                    active={false}
                  />
                  <Channel
                    avatar="https://i.pravatar.cc"
                    channel="Channel Name"
                    lastMessage="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                    lastMessageTime="12:00"
                    notification={0}
                    active={false}
                  />
                  <Channel
                    avatar="https://i.pravatar.cc"
                    channel="Channel Name"
                    lastMessage="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                    lastMessageTime="12:00"
                    notification={0}
                    active={false}
                  />
                </div>
                <span className="cursor-pointer">
                  <svg
                    stroke="currentColor"
                    fill="#034B8A"
                    viewBox="0 0 24 24"
                    height="20px"
                    width="20px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="none"
                      d="M24 24H0V0h24v24z"
                      opacity=".87"
                    ></path>
                    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"></path>
                  </svg>
                </span>
              </div>
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
                  <Channel
                    avatar="https://i.pravatar.cc"
                    channel="Achraf Sabbar"
                    lastMessage="Mcha liya tele"
                    lastMessageTime="12:00"
                    notification={100}
                    active={true}
                  />
                  <Channel
                    avatar="https://i.pravatar.cc"
                    channel="Imad abid"
                    lastMessage="Ta ana mcha liya tele"
                    lastMessageTime="12:00"
                    notification={6}
                    active={false}
                  />
                  <Channel
                    avatar="https://i.pravatar.cc"
                    channel="Zakaria ait sliman"
                    lastMessage="Kifach manchfokch "
                    lastMessageTime="12:00"
                    notification={0}
                    active={true}
                  />
                  <Channel
                    avatar="https://i.pravatar.cc"
                    channel="Saad gmira"
                    lastMessage="Obeaj doz t3acha"
                    lastMessageTime="12:00"
                    notification={0}
                    active={true}
                  />
                  <Channel
                    avatar="https://i.pravatar.cc"
                    channel="Channel Name"
                    lastMessage="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                    lastMessageTime="12:00"
                    notification={10}
                    active={true}
                  />
                  <Channel
                    avatar="https://i.pravatar.cc"
                    channel="Channel Name"
                    lastMessage="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                    lastMessageTime="12:00"
                    notification={0}
                    active={false}
                  />
                  <Channel
                    avatar="https://i.pravatar.cc"
                    channel="Channel Name"
                    lastMessage="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                    lastMessageTime="12:00"
                    notification={0}
                    active={true}
                  />
                  <Channel
                    avatar="https://i.pravatar.cc"
                    channel="Channel Name"
                    lastMessage="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                    lastMessageTime="12:00"
                    notification={0}
                    active={true}
                  />
                  <Channel
                    avatar="https://i.pravatar.cc"
                    channel="Channel Name"
                    lastMessage="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                    lastMessageTime="12:00"
                    notification={99}
                    active={false}
                  />
                  <Channel
                    avatar="https://i.pravatar.cc"
                    channel="Channel Name"
                    lastMessage="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                    lastMessageTime="12:00"
                    notification={0}
                    active={false}
                  />
                  <Channel
                    avatar="https://i.pravatar.cc"
                    channel="Channel Name"
                    lastMessage="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                    lastMessageTime="12:00"
                    notification={0}
                    active={false}
                  />
                  <Channel
                    avatar="https://i.pravatar.cc"
                    channel="Channel Name"
                    lastMessage="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                    lastMessageTime="12:00"
                    notification={0}
                    active={false}
                  />
                  <Channel
                    avatar="https://i.pravatar.cc"
                    channel="Channel Name"
                    lastMessage="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                    lastMessageTime="12:00"
                    notification={0}
                    active={false}
                  />
                  <Channel
                    avatar="https://i.pravatar.cc"
                    channel="Channel Name"
                    lastMessage="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                    lastMessageTime="12:00"
                    notification={0}
                    active={false}
                  />
                  <Channel
                    avatar="https://i.pravatar.cc"
                    channel="Channel Name"
                    lastMessage="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                    lastMessageTime="12:00"
                    notification={0}
                    active={false}
                  />
                  <Channel
                    avatar="https://i.pravatar.cc"
                    channel="Channel Name"
                    lastMessage="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                    lastMessageTime="12:00"
                    notification={0}
                    active={false}
                  />
                </div>
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
>>>>>>> 0650be8586181921e07289db010e711347cf96fb
    </>
  );
}
