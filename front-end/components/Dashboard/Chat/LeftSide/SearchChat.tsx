'use client'
import { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import { contextdata } from "@/app/contextApi";
import Channel from "../Channel/Channel";

export default function SearchChat() {

	const inputRef = useRef<HTMLInputElement | null>(null);
	const [closeSearch, setCloseSearch] = useState<boolean>(true);
	const { myFriends, user } :any= useContext(contextdata);
	const [users, setUsers] = useState<any>([]);
	const [showBody, setShowBody] = useState<boolean>(false);

	const handleSearch = (e: any) => {
		const value = e.target.value;
		const result = myFriends.filter((profile: any) => {
			if (profile.userId === user.id) return false;
			return profile.firstName.toLowerCase().includes(value.toLowerCase()) || profile.lastName.toLowerCase().includes(value.toLowerCase())|| profile.username.toLowerCase().includes(value.toLowerCase());
		});
		setUsers(result);
	}
	const clearInputValue = () => {
		if (inputRef.current) {
		inputRef.current.value = '';
		}
	};
	return (
		<div className="search flex items-center w-full px-[25px] pt-[30px] relative h-[66px] searchShadow">
			<span className=" bg-[#F5F7F9] rounded-l-[15px] opacity-70 h-[60px] w-[60px] flex justify-center items-center">
				{
					closeSearch ? (
						<span onClick={() => { setCloseSearch(false); inputRef.current?.focus(); }} className="cursor-pointer">
							<svg
								width="21"
								height="20"
								viewBox="0 0 21 20"
								fill="none"
								strokeWidth={2}
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M9.32 17C13.915 17 17.64 13.4183 17.64 9C17.64 4.58172 13.915 1 9.32 1C4.72499 1 1 4.58172 1 9C1 13.4183 4.72499 17 9.32 17Z"
									stroke="#898f9496"
								/>
								<path
									d="M19.7193 18.9984L15.1953 14.6484"
									stroke="#898f9496"
								/>
							</svg>
						</span>
					) : (
						<span className="cursor-pointer" onClick={() => { setCloseSearch(true); setShowBody(false);clearInputValue()}} >
							<svg width="17" height="18" viewBox="0 0 17 18" fill="#898f9496" xmlns="http://www.w3.org/2000/svg" className="
						hover:fill-black
						">
								<path d="M15 2L2 16M2 2L15 16" stroke="#D2D6D8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</span>
					)
				}
			</span>
			<input
				ref={inputRef}
				onFocus={() => { setShowBody(true); setCloseSearch(false); }}
				type="text"
				onChange={handleSearch}
				placeholder="Search..."
				className="rounded-r-[15px] pr-[15px] w-[calc(100%-49px)] bg-[#f5f7f9b3] h-[60px]  outline-none text-[#898f94] font-[Poppins] font-[300] text-[16px] leading-[24px] placeholder:text-[#898f9496]"
			/>
			{
				showBody && (
					<div className="absolute top-[85px] rounded-[15px] w-[calc(100%-50px)] h-[400px] bg-[#FFF] z-[2] py-[25px] px-[25px] flex flex-col gap-[20px] overflow-y-scroll no-scrollbar p-inf">
						{
							users?.map((user: any) => {
								return(
									<Channel
										avatar={`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/${user.avatar}`}
										channel={`${user.firstName} ${user.lastName}`}
										lastMessage={''}
										lastMessageTime={''}
										notification={0}
										active={false}
										link={`/Chat/me/${user.userId}`}
										key={user.userId}
									/>
								)
							})
						}
					</div>
				)
			}
		</div>
	)
}