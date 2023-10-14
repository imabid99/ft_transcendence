'use client'
import UsersOnline from "./UsersOline";
import GroupsChannels from "./GroupsChannels";
import UsersDm from "./UsersDm";
import NewModal from "./NewModal";
import { useState , useEffect } from "react";
import { useContext } from "react";
import { contextdata } from "@/app/contextApi";
import SelectUsersBody from '../group/SelectUsersBody'
import GroupInfo from '../group/GroupInfo'
import Search from "../search/Search";
import axiosInstance from "@/utils/axiosInstance";
import SearchChat from "./SearchChat";

export default function  LeftSide() {

	const [showBody, setShowBody] = useState<string | null>(null);
	const [groupUsers, setGroupUsers] = useState<number[]>([]);
	const [refresh, setRefresh] = useState<string>("");

	const {user,setUsers,setProfiles,setMessages ,socket,setMyChannels,setChannels, dashboardRef,setMediaDashbord} :any= useContext(contextdata);
	useEffect(() => {
		if (!socket)  return;
		socket.on("refresh", () => {
			setRefresh(new Date().getTime().toString());
		});
	}, [socket]);

	useEffect(() => {
		if (!user) {
		  return;
		}
		async function getUsers() {
			try
			{
				const resp = await axiosInstance.get(`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/user/all`);
					if (resp.data === null) {
					return;
				}
				setUsers(resp.data);
			}
			catch (error)
			{
				console.log("get : users ",error);
				return;
			}
		}
		async function getProfiles() {
				try
				{
					const resp = await axiosInstance.get(`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/user/profiles`);
					if (resp.data === null) {
						return;
				}
				setProfiles(resp.data);
				}
				catch (error)
				{
					console.log("get : profiles ", error);
					return;
				}
				}
		async function getMessages() {
			try
			{
				const resp = await axiosInstance.get(`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/chat/messages/${user?.id}`);
				if (resp.data === null) {
					return;
				}
				resp.data.sort ((a:any, b:any) => {
					return (
						new Date(a.createdAt).getTime() -
						new Date(b.createdAt).getTime()
					);
				});
				setMessages(resp.data);
			}
			catch (error)
			{
			console.log("get : messages ", error);
			return;
			}
		}
		async function getMyChannels() {
			try
			{
			  const resp = await axiosInstance.get(`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/chat/myChannels/${user?.id}`);
			  if (resp.data === null) {
				return;
			  }
			  setMyChannels(resp.data);
			}
			catch (error)
			{
			  console.log("error : getChannels ", error);
			  return;
			}
		  }    async function getChannels() {
			try
			{
			  const resp = await axiosInstance.get(`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/chat/channels`);
			  if (resp.data === null) {
				return;
			  }
			  setChannels(resp.data);
			}
			catch (error)
			{
			  console.log("error : profiles ", error);
			  return;
			}
		  }
		getChannels();
		getUsers();
		getProfiles();
		getMessages();
		getMyChannels();
	}, [refresh, user])

	return (
		<>	
			<div className="chat__left w-[450px]  bg-[#FFF] border-r-[1px] relative overflow-hidden lg:max-xl:w-[350px] lsm:max-lg:w-full">
					<div className="chat__left__head flex justify-between items-center border-b-[1px]  border-[#E5E5E5] pl-[42px] pr-[25px] lsm:max-lg:px-[10px] h-[100px]">
						<div className="flex items-center py-[35px] justify-between lsm:max-sm:gap-[20px] lsm:max-sm:px-[20px]">
							<div className="hidden lsm:max-sm:block cursor-pointer" onClick={() => {
								setMediaDashbord(true)
								dashboardRef.current?.classList.add("!left-0")
							}}>
								<svg width="30" height="28" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M17.5 14C17.8852 14.0002 18.2556 14.1486 18.5344 14.4144C18.8132 14.6802 18.979 15.0431 18.9975 15.4279C19.016 15.8127 18.8858 16.1898 18.6338 16.4812C18.3818 16.7726 18.0274 16.9558 17.644 16.993L17.5 17H1.5C1.11478 16.9998 0.744405 16.8514 0.465613 16.5856C0.186821 16.3198 0.020988 15.9569 0.00247574 15.5721C-0.0160365 15.1873 0.114192 14.8102 0.366175 14.5188C0.618159 14.2274 0.972581 14.0442 1.356 14.007L1.5 14H17.5ZM17.5 7C17.8978 7 18.2794 7.15804 18.5607 7.43934C18.842 7.72064 19 8.10218 19 8.5C19 8.89782 18.842 9.27936 18.5607 9.56066C18.2794 9.84196 17.8978 10 17.5 10H1.5C1.10218 10 0.720644 9.84196 0.43934 9.56066C0.158035 9.27936 0 8.89782 0 8.5C0 8.10218 0.158035 7.72064 0.43934 7.43934C0.720644 7.15804 1.10218 7 1.5 7H17.5ZM17.5 0C17.8978 0 18.2794 0.158035 18.5607 0.43934C18.842 0.720644 19 1.10218 19 1.5C19 1.89782 18.842 2.27936 18.5607 2.56066C18.2794 2.84196 17.8978 3 17.5 3H1.5C1.10218 3 0.720644 2.84196 0.43934 2.56066C0.158035 2.27936 0 1.89782 0 1.5C0 1.10218 0.158035 0.720644 0.43934 0.43934C0.720644 0.158035 1.10218 0 1.5 0H17.5Z" fill="#034B8A"/>
								</svg> 
							</div>
							<div className="flex items-center gap-[10px]">
								<img
									src="/userProfile.jpg"
									alt=""
									className="max-w-[64px] max-h-[64px] min-w-[64px] min-h-[64px] rounded-full object-cover border-[3px] border-[#064A85] border-opacity-25"
								/>
								<p className="text-[20px] font-[200] font-[Poppins] text-[#BDBFC3] leading-6">
									Hello ,<br/>
									<span className="text-[20px] font-[500] font-[Poppins] text-[#034B8A]">
										{
											user?.username
										}
									</span>
								</p>
							</div>
						</div>
						{/* {
							!showBody &&
							<div className="z-[10] bg-[#EDFAFF]  cursor-pointer w-[54px] h-[54px] notifShadow flex justify-center items-center rounded-[20px] hover:bg-[#e0f2f9]" onClick={() => {setShowBody("search")}}>
								<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path
									d="M9.32 17C13.915 17 17.64 13.4183 17.64 9C17.64 4.58172 13.915 1 9.32 1C4.72499 1 1 4.58172 1 9C1 13.4183 4.72499 17 9.32 17Z"
									stroke="#034B8A"
									strokeWidth="2"
									/>
									<path
									d="M19.7193 18.9984L15.1953 14.6484"
									stroke="#034B8A"
									strokeWidth="2"
									/>
								</svg>
							</div>
						} */}
					</div>
					{
						!showBody && (
							<>
								<SearchChat />
								<UsersOnline />
								<div id="scroll" className="max-h-[calc(100%-299px)] overflow-y-scroll no-scrollbar h-[calc(100%-299px)] px-[25px] py-[25px] flex flex-col gap-[25px]">
									<GroupsChannels />
									<UsersDm />
								</div>
								<NewModal setShowBody={setShowBody}/>
							</>
						)
					}
					{
						showBody === 'newChat' 
					}
					{
						showBody === 'selectUsers' && <SelectUsersBody setShowBody={setShowBody} setGroupUsers={setGroupUsers} groupUsers={groupUsers} />
					}
					{
						showBody === 'groupInfo'  && <GroupInfo setShowBody={setShowBody}  setGroupUsers={setGroupUsers} groupUsers={groupUsers} />
					}
					{
						showBody === "search" && <Search setShowBody={setShowBody} />
					}
			</div>
		</>
	)
}