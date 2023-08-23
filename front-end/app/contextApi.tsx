'use client';
import { createContext , useState , useEffect, use } from 'react';
import { getLocalStorageItem , removeLocalStorageItem } from '@/utils/localStorage';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/utils/axiosInstance';
import jwt_decode from "jwt-decode";
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
  
  useEffect(() => {
    const getUser = async () => {
      try
      {
        const resp = await axiosInstance.get('http://localhost:3000/api/user/userinfo');
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
  }, []);

  useEffect(() => {
    if (!user || user === undefined) {
      return;
    }
    newSocket = io('http://localhost:3000', {
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
				const resp = await axiosInstance.get('http://localhost:3000/api/user/all');
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
        const resp = await axiosInstance.get('http://localhost:3000/api/user/profiles');
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
      console.log("getMessages user : ", user);
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
        console.log("error : profiles ", error);
        return;
      }
    }
		getUsers();
    getProfiles();
    getMessages();
		return () => {
			setUsers([]);
      setProfiles([]);
      setMessages([]);
		}
	}, [user]);

  return (
    <contextdata.Provider value={{socket:socket, user:user, users:users, profiles:profiles , messages:messages, setUser:setUser, setUsers:setUsers, setProfiles:setProfiles , setMessages:setMessages}}>
      {children}
    </contextdata.Provider>
  );
}

export default ContextProvider;
