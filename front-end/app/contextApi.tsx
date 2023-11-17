'use client';
import React, { use } from 'react';
import { createContext , useState , useEffect, useRef } from 'react';
import { getLocalStorageItem , removeLocalStorageItem } from '@/utils/localStorage';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/utils/axiosInstance';
import io, { Socket } from 'socket.io-client';
let newSocket: Socket | null = null;
let notificationsocket: Socket | null = null;
export const contextdata = createContext({});
import { Toaster, toast } from 'sonner'
const ContextProvider = ({ children }: { children: React.ReactNode; }) => {
  
  const router = useRouter();
  const [user, setUser] = useState<any | null>(null);
  const [users, setUsers] = useState<any>(null);
  const [profiles, setProfiles] = useState<any>(null);
  const [messages, setMessages] = useState<any>([]);
  const [socket, setSocket] = useState<any>(null);
  const [notifSocket, setNotifSocket] = useState<any>(null);
  const [myChannels, setMyChannels] = useState<any>([]);
  const [channels, setChannels] = useState<any>([]);
  const [loged, setLoged] = useState<boolean>(false);
  const [mediaDashbord, setMediaDashbord]  = useState<boolean>(false);
  const dashboardRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const getUser = async () => {
      if (!getLocalStorageItem("Token")) {
        router.push("/login");
        return;
      }
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
        console.log("error : ",error);
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
    if (!user || user === undefined) {
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
    console.log("newSocket : ", newSocket);
    console.log("notificationsocket : ", notificationsocket);
    if (newSocket) {
      setSocket(newSocket);
    }
    if (notificationsocket) {
      setNotifSocket(notificationsocket);
    }
    return () => {
      if(newSocket){ newSocket.disconnect()}
      if(notificationsocket){ notificationsocket.disconnect()}
    }
  }, [user]);

  useEffect(() => {
    if (!user || user === undefined) {
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
				console.log("error : users ",error);
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
        console.log("error : profiles ", error);
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
        console.log("error : profiles ", error);
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
        console.log("error : profiles ", error);
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
        console.log("error : profiles ", error);
        return;
      }
    }
    getChannels();
		getUsers();
    getProfiles();
    getMessages();
    getMyChannels();
		return () => {
			setUsers([]);
      setProfiles([]);
      setMessages([]);
      setMyChannels([]);
      setChannels([]);

		}
	}, [user]);

  const [myNotif, setMyNotif] = useState<any>([]);

  useEffect(() => {
    if (!notifSocket) return;
    console.log("notifSocket : ", notifSocket);
    notifSocket.on('notification', (payload:any) => {
      console.log("payload : ", payload);
      setMyNotif((prev:any) => [...prev, payload]);
    })
    return () => {
      notifSocket.off('errorNotif');
    }
  }
  , [notifSocket]);
  // console.log("myNotif : ", myNotif);
  // <Toaster position="top-right" richColors />
  // useEffect(() => {
  //   myNotif.forEach((notif:any) => {
  //     console.log("notif loop ");
  //     if (notif.type === 'success') {
  //       toast.success(notif.message);
  //     }
  //     if (notif.type === 'FRIEND_REQUEST') {
  //       console.log("notif : ", notif);
  //       toast.info(notif.message);
  //     }
  //   });
  // },[myNotif]);
  // <Toaster />
  return (
    <contextdata.Provider value={{socket:socket, notifSocket:notifSocket ,dashboardRef:dashboardRef, mediaDashbord:mediaDashbord,user:user, users:users, profiles:profiles , messages:messages,myChannels:myChannels, channels:channels,setChannels:setChannels, setUser:setUser,setMyChannels:setMyChannels, setUsers:setUsers, setProfiles:setProfiles , setMessages:setMessages, setLoged:setLoged , loged:loged, setMediaDashbord:setMediaDashbord}}>
      <div className='w-full h-full relative'>
        {
          // myNotif.map((notif:any, index:number) => 
          //   <Toaster position="top-right" richColors />
          //   console.log("notif loop ");
            // if (notif.type === 'success') {
            //   toast.success(notif.message);
            // }
            // if (notif.type === 'FRIEND_REQUEST') {
            //   console.log("notif : ", notif);
            //   toast.info(notif.message);
            // }
          //         <div key={index} >
          //           {notif.type === 'success' && toast.success(notif.message)}
          //           {notif.type === 'info' && toast.info(notif.message)}
          //           <Toaster />
          //         </div>
          // })
                // console.log("myNotif : ", myNotif)
            <div className='w-full absolute'>
                <Toaster position="top-right"  richColors/>
                {myNotif.map((notif:any, index:number) => (
                  <div key={index}>
                    {notif.type === 'success' && toast.success(notif.message)}
                    {notif.type === 'FRIEND_REQUEST' && toast.info(notif.message)}
                  </div>
                ))}
            </div>
            }
              {/* // <div className='absolute w-[500px] bg-red-500 top-0 right-0 z-[200]'> */}
                 {/* {
              //     myNotif.map((notif:any, index:number) => (
              //       <div key={index}>
              //         {notif.message}
              //         {notif.type}
              //       </div>
              //     ))
              //   } */}
                                   {/* {
              //       myNotif.map((notif:any, index:number) => (
              //         <div key={index} >
              //           {notif.type === 'success' && toast.success(notif.message)}
              //           {notif.type === 'info' && toast.info(notif.message)}
              //           <Toaster />
              //         </div>
              //       ))
              //     } */}
               {/* </div> */}
        
        {children}
      </div>
    </contextdata.Provider>
  );
}

export default ContextProvider;
