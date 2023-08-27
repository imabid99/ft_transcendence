'use client';
import { createContext , useState , useEffect, use } from 'react';
import { getLocalStorageItem , removeLocalStorageItem } from '@/utils/localStorage';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/utils/axiosInstance';
import io from 'socket.io-client';
let newSocket: any = null;
export const contextdata = createContext({});

const ContextProvider = ({ children }: { children: React.ReactNode; }) => {
  
  const router = useRouter();
  const [user, setUser] = useState<any | null>(null);
  const [users, setUsers] = useState<any>(null);
  const [profiles, setProfiles] = useState<any>(null);
  const [messages, setMessages] = useState<any>([]);
  const [socket, setSocket] = useState<any>(null);
  const [myChannels, setMyChannels] = useState<any>([]);
  const [loged, setLoged] = useState<boolean>(false);
  useEffect(() => {
    const getUser = async () => {
      try
      {
        const resp = await axiosInstance.get('http://10.13.1.7:3000/api/user/userinfo');
        if (resp.data === null) {
          console.log("get : user ");
          removeLocalStorageItem("Token");
          router.push("/login");
          return;
        }
        console.log("resp.data ",resp.data);
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
    newSocket = io('http://10.13.1.7:3000', {
      extraHeaders: {
        Authorization: `Bearer ${getLocalStorageItem("Token")}`,
      }
    });
    if (newSocket) {
      setSocket(newSocket);
    }
    return () => newSocket.disconnect();
  }, [user]);

  useEffect(() => {
    if (!user || user === undefined) {
      return;
    }
    console.log("useEffect user : ", user);
		async function getUsers() {
			try
			{
				const resp = await axiosInstance.get('http://10.13.1.7:3000/api/user/all');
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
        const resp = await axiosInstance.get('http://10.13.1.7:3000/api/user/profiles');
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
        const resp = await axiosInstance.get(`http://10.13.1.7:3000/api/chat/messages/${user?.id}`);
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
      console.log("getChannels user : ", user);
      try
      {
        const resp = await axiosInstance.get(`http://10.13.1.7:3000/api/user/myChannels/${user?.id}`);
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
		getUsers();
    getProfiles();
    getMessages();
    getMyChannels();
		return () => {
			setUsers([]);
      setProfiles([]);
      setMessages([]);
		}
	}, [user]);

  return (
    <contextdata.Provider value={{socket:socket, user:user, users:users, profiles:profiles , messages:messages,myChannels:myChannels, setUser:setUser,setMyChannels:setMyChannels, setUsers:setUsers, setProfiles:setProfiles , setMessages:setMessages, setLoged:setLoged , loged:loged}}>
      {children}
    </contextdata.Provider>
  );
}

export default ContextProvider;
