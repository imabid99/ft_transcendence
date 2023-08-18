import "../globals.css";
import Head from "next/head";
import LeftSide from "@/components/Dashboard/Chat/LeftSide/LeftSide";
import Dashboard from '@/components/Dashboard/Dashboard/Dashboard'
import ContextProvider from './contextApi';

export default function ChatLayout({children}: {hildren: React.ReactNode;}) {

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
