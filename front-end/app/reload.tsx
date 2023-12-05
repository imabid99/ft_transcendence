'use client'

import {
    useEffect,
    useState,
    useRef,
    useContext,
} from 'react'
import { useRouter } from 'next/navigation'
import { contextdata } from '@/app/contextApi'
import axiosInstance from '@/utils/axiosInstance';
import { Toaster, toast } from 'sonner'



export default function Reload({children,}: {children: React.ReactNode}) {

	const {user,
		setProfiles,
		setMessages,
		socket,
		setMyChannels,
		setChannels,
		setMyFriends,
		notifSocket,
		setUser,
	} :any= useContext(contextdata);
	// const [myNotif, setMyNotif] = useState<any>([]);
	const router = useRouter();
	const [refresh, setRefresh] = useState<string>("");

	useEffect(() => {
		if (!socket)  return;
		socket.on("refresh", () => {
			setRefresh(new Date().getTime().toString());
		});
		notifSocket.on("refresh", () => {
			setRefresh(new Date().getTime().toString());
		}
		);
		return () => {
			socket.off("refresh");
			notifSocket.off("refresh");
		}
	}, [socket]);

	useEffect(() => {
		if (!user) {
			return;
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
		  async function getMyFriends() {
			try{
			  const getFriends = async () => {
				  try{
					  const res = await axiosInstance.get(`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/friendship/show`);
					  setMyFriends(res.data);
				  }
				  catch(err){
					  console.log(err);
				  }
			  }
			  getFriends();
		  }
		  catch(error)
		  {
			  console.log(error)
		  }

		  }
		getChannels();
		getProfiles();
		getMessages();
		getMyChannels();
		getMyFriends();
	}, [refresh, user])

    return (
		<>
            {children}
		</>
    )
}