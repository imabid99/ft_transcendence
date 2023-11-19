'use client'

import {
    useEffect,
    useState,
    useRef,
    useContext,
} from 'react'
import { useRouter } from 'next/router'
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
	const [refresh, setRefresh] = useState<string>("");
	const [myNotif, setMyNotif] = useState<any>([]);
	const router = useRouter();

	useEffect(() => {
		if (!socket)  return;
		socket.on("refresh", () => {
			setRefresh(new Date().getTime().toString());
		});
		notifSocket.on("refresh", () => {
			setRefresh(new Date().getTime().toString());
		}
		);
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


	useEffect(() => {
	  if (!notifSocket) return;

		console.log("notifSocket : ", notifSocket);
		notifSocket.on('notification', (payload:any) => {
			console.log("payload : ", payload);
			setMyNotif((prev:any) => [...prev, payload]);
			setTimeout(() => {
			setMyNotif([]);
			}
			, 100);
		})
		notifSocket.on('start-invite-game', (payload:any) => {
			router.push(`/Game/invite/${payload.gameId}`);
		})
		return () => {
		setMyNotif([]);
		socket.off('notification');
		}
	}
	, [notifSocket]);
    return (
        <div className='w-full h-ful relative'>
			{
            <div className='w-full absolute'>
				<Toaster position="top-right"  richColors/>
				{myNotif.length !== 0 && myNotif.map((notif:any, index:number) => (
				<div key={index}>
					
					{notif.type === 'success' && toast.success(notif.message)}
					{notif.type === 'info' && toast.info(notif.message)}
					{notif.type === 'error' && toast.error(notif.message)}
					{notif.type === 'warning' && toast.warning(notif.message)}
				</div>
				))
				}
			</div>
			}
            {children}
        </div>
    )
}