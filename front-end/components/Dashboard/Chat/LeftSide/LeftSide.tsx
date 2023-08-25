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

export default function  LeftSide() {

	const [showBody, setShowBody] = useState<string | null>(null);
	const [groupUsers, setGroupUsers] = useState<number[]>([]);
	const [refresh, setRefresh] = useState<string>("");

	const {user,setUsers,setProfiles,setMessages ,socket,setMyChannels} :any= useContext(contextdata);
	useEffect(() => {
		if (!socket)  return;
		socket.on("refresh", (payload:any) => {
			setRefresh(payload);
		});
	}, [socket]);

	useEffect(() => {
		if (!user) {
		  return;
		}
		async function getUsers() {
			try
			{
				const resp = await axiosInstance.get('http://localhost:3000/api/user/all');
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
					const resp = await axiosInstance.get('http://localhost:3000/api/user/profiles');
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
			const resp = await axiosInstance.get(`http://localhost:3000/api/user/messages/${user?.id}`);
			if (resp.data === null) {
				return;
			}
			setMessages(resp.data);
			}
			catch (error)
			{
			console.log("get : messages ", error);
			return;
			}
		}
		async function getMyChannels() {
			console.log("getChannels user : ", user);
			try
			{
			  const resp = await axiosInstance.get(`http://localhost:3000/api/user/myChannels/${user?.id}`);
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
		  }
			getUsers();
			getProfiles();
			getMessages();
			getMyChannels();
	}, [refresh, user])

	return (
		<>	
			<div className="chat__left w-[450px]  bg-[#FFF] border-r-[1px] relative overflow-hidden lg:max-xl:w-[350px] lsm:max-lg:w-full">
					<div className="chat__left__head flex justify-between items-center border-b-[1px]  border-[#E5E5E5] pl-[42px] pr-[25px] lsm:max-lg:px-[10px]">
						<div className="flex items-center gap-[10px] py-[35px]">
							<img
								src="/userProfile.jpg"
								alt=""
								className="max-w-[64px] max-h-[64px] min-w-[64px] min-h-[64px] rounded-full object-cover border-[3px] border-[#064A85] border-opacity-25"
							/>
							<p className="text-[20px] font-[200] font-[Poppins] text-[#BDBFC3] leading-6">
								Hello , <br />
								<span className="text-[20px] font-[500] font-[Poppins] text-[#034B8A]">
									{
										user?.username
									}
								</span>
							</p>
						</div>
						{
							!showBody &&
							<div className="z-[10] bg-[#EDFAFF]  cursor-pointer w-[54px] h-[54px] notifShadow flex justify-center items-center rounded-[20px] " onClick={() => {setShowBody("search")}}>
								<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path
									d="M9.32 17C13.915 17 17.64 13.4183 17.64 9C17.64 4.58172 13.915 1 9.32 1C4.72499 1 1 4.58172 1 9C1 13.4183 4.72499 17 9.32 17Z"
									stroke="#898F94"
									stroke-width="2"
									/>
									<path
									d="M19.7193 18.9984L15.1953 14.6484"
									stroke="#898F94"
									stroke-width="2"
									/>
								</svg>
							</div>
						}
					</div>
					{
						!showBody && (
							<>
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