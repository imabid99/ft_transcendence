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


export default function ChatLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isloading, setIsLoading] = useState(true);
  useEffect(() => {
    const token = getLocalStorageItem("Token");
    if (!token) {
        router.push("/login");
        return;
    }
    setIsLoading(false);
  }, []);
  if (isloading) {
    return <div>Loading...</div>;
  }
  return (
    <>
        <div className="h-[100vh] w-[100vw] flex  pl-[150px] bg-[#FAFDFF] lsm:max-lg:overflow-x-hidden lsm:max-lg:pl-[100px]">
          <Dashboard path='Chat'/>
          <LeftSide />
          {children}
        </div>
    </>
  );
}
