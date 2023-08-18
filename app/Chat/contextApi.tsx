'use client';
import { createContext , useState , useEffect } from 'react';
import { getLocalStorageItem } from '@/utils/localStorage';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/utils/axiosInstance';
import jwt_decode from "jwt-decode";


export const contextdata = createContext({});

const ContextProvider = ({ children }: { children: React.ReactNode; }) => {

    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [users, setUsers] = useState<any>(null);
    const [isloading, setIsLoading] = useState(true);
	  useEffect(() => {
		async function getMessages() {
			try
			{
				const resp = await axiosInstance.get('http://localhost:3000/api/user/all');
                setUsers(resp.data);
			}
			catch (error)
			{
				console.log(error);
				return;
			}
		}
		getMessages();
		return () => {
			setUsers([]);
		}
	}, []);
  useEffect(() => {
    const token = getLocalStorageItem("Token");
    if (!token) {
        router.push("/login");
        return;
    }
    const decoded: any = jwt_decode(token);
    if (!decoded.username) {
        router.push("/login");
        return;
    }
    setUser(decoded);
  }, []); 
  return (
    <contextdata.Provider value={{user : user, users:users}}>
      {children}
    </contextdata.Provider>
  );
}

export default ContextProvider;
