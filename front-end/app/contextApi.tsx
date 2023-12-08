'use client';
import React, { use } from 'react';
import { createContext , useState , useEffect, useRef } from 'react';
import { getLocalStorageItem , removeLocalStorageItem } from '@/utils/localStorage';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/utils/axiosInstance';
import io, { Socket } from 'socket.io-client';
import { Toaster, toast } from 'sonner';
let newSocket: Socket | null = null;
let notificationsocket: Socket | null = null;
import MyNotif from '@/components/Dashboard/Notifications/allNotifications';

export const contextdata = createContext({});



const ContextProvider = ({ children }: { children: React.ReactNode; }) => {
  
  const router = useRouter();
  const [user, setUser] = useState<any | null>(null);
  const [profiles, setProfiles] = useState<any>(null);
  const [messages, setMessages] = useState<any>([]);
  const [socket, setSocket] = useState<any>(null);
  const [notifSocket, setNotifSocket] = useState<any>(null);
  const [myChannels, setMyChannels] = useState<any>([]);
  const [channels, setChannels] = useState<any>([]);
  const [loged, setLoged] = useState<boolean>(false);
  const [myFriends, setMyFriends] = useState<any>([]);
  const [mediaDashbord, setMediaDashbord]  = useState<boolean>(false);
  const [myNotif, setMyNotif] = useState<any>([]);
  const dashboardRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (getLocalStorageItem("Token")) {
      setLoged(true);
    }
    if(loged === false) return;
    const getUser = async () => {
      try
      {
        const resp = await axiosInstance.get(`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/user/userinfo`);
        if (resp.data === null) {
          removeLocalStorageItem("Token");
          router.push("/login");
          return;
        }
        setUser(resp.data);
      }
      catch (error)
      {
        removeLocalStorageItem("Token");
        router.push("/login");
        return;
      }
    }
    getUser();
    return () => {
      setUser(null);
    }
  }, [loged]);

  useEffect(() => {
    if (!user || newSocket || notificationsocket) {
      return;
    }
    newSocket = io(`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/chat`, {
      extraHeaders: {
        Authorization: `Bearer ${getLocalStorageItem("Token")}`,
      }
    });
    notificationsocket = io(`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/notification`, {
      extraHeaders: {
        Authorization: `Bearer ${getLocalStorageItem("Token")}`,
      }
    });
    if (newSocket) {
      setSocket(newSocket);
    }
    if (notificationsocket) {
      setNotifSocket(notificationsocket);
    }
    return () => {
      newSocket?.disconnect()
      notificationsocket?.disconnect()
    }
  }, [user]);

  useEffect(() => {
    if (!user || user === undefined) {
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
        return;
      }
    }
    async function getChannels() {
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
            }
        }
        getFriends();
    }
    catch(error)
    {
    }
    }
    getChannels();
    getProfiles();
    getMessages();
    getMyChannels();
    getMyFriends();
		return () => {
      setProfiles([]);
      setMessages([]);
      setMyChannels([]);
      setChannels([]);

		}
	}, [user]);
  return (
    <contextdata.Provider value={{
        socket:socket,
        notifSocket:notifSocket,
        dashboardRef:dashboardRef,
        mediaDashbord:mediaDashbord,
        user:user,
        profiles:profiles,
        messages:messages,
        myChannels:myChannels,
        channels:channels,
        setChannels:setChannels,
        setUser:setUser,
        setMyChannels:setMyChannels,
        setProfiles:setProfiles,
        setMessages:setMessages,
        setLoged:setLoged,
        loged:loged,
        setMediaDashbord:setMediaDashbord,
        myFriends:myFriends,
        setMyFriends:setMyFriends,
      
      }}>
        <div className='w-full h-full relative'>
          <MyNotif/>
          {children}
        </div>
    </contextdata.Provider>
  );
}

export default ContextProvider;
