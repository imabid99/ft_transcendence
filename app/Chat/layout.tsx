'use client';
import "../globals.css";
import Head from "next/head";
import LeftSide from "@/components/Dashboard/Chat/LeftSide/LeftSide";
import Dashboard from '@/components/Dashboard/Dashboard/Dashboard'
import ContextProvider from './contextApi';
import { getLocalStorageItem } from "@/utils/localStorage";
import { useEffect , useState } from "react";
import {useRouter} from "next/navigation";

export default function ChatLayout({children}: {hildren: React.ReactNode;}) {
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
      <Head>
        <title>Inbox</title>
        <meta name="description" content="ft_transcendence" />
        <meta httpEquiv="refresh" content="0;url=/new-page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContextProvider>
        <div className="h-[100vh] w-[100vw] flex  pl-[150px] bg-[#FAFDFF] lsm:max-lg:overflow-x-hidden lsm:max-lg:pl-[100px]">
          <Dashboard path='Chat'/>
          <LeftSide />
          {children}
        </div>
      </ContextProvider>
    </>
  );
}
