'use client';
import "../globals.css";
import Head from "next/head";
import LeftSide from "@/components/Dashboard/Chat/LeftSide/LeftSide";
import Dashboard from '@/components/Dashboard/Dashboard/Dashboard'
import { getLocalStorageItem } from "@/utils/localStorage";
import { useEffect , useState } from "react";
import {useRouter} from "next/navigation";
import { useContext } from "react";
import { contextdata } from "@/app/contextApi";
import Notif from "./Notif";
import Loading from "../loading";
import Reload from "../reload";


export default function ChatLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isloading, setIsLoading] = useState(true);
  const {socket} :any= useContext(contextdata);
  const [notifs, setNotifs] = useState<any[]>([]);

  useEffect(() => {
    const token = getLocalStorageItem("Token");
    if (!token) {
        router.push("/login");
        return;
    }
    setIsLoading(false);
  }, []);
  useEffect(() => {
    if (!socket) return;
    socket.on('errorNotif', (payload:any) => {
      setNotifs((notifs) => [...notifs, {message : payload.message, type : payload.type}]);
    })
    return () => {
      socket.off('errorNotif');
    }
  }, [socket]);
  notifs?.sort((a, b) => {
    return b.time - a.time;
  });

  if (isloading) {
    return <Loading />;
  }
  return (
    <div className="relative">
        <Head>
          <title>Chat</title>
          <meta name="description" content="Chat" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="absolute top-5 right-2 max-h-[230px] overflow-hidden z-[2000]">
          {notifs.map((notif, index) => (
            <Notif key={index} message={notif.message} type={notif.type}/>
          ))}
        </div>
        <div className="h-[100vh] w-[100vw] flex  pl-[150px] bg-[#FAFDFF] lsm:max-lg:overflow-x-hidden lsm:max-lg:pl-[100px] lsm:max-sm:pl-[0px]">
          <Dashboard path='Chat'/>
          <LeftSide />
          <Reload>
              {children}
          </Reload>
        </div>
    </div>
  );
}
