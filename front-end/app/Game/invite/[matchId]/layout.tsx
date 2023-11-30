import "../../../globals.css";
import Head from "next/head";
import Dashboard from '@/components/Dashboard/Dashboard/Dashboard'
import Link from "next/link";


export const metadata = {
  title: "Inbox",
  description: "ft_transcendence",
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta httpEquiv="refresh" content="0;url=/new-page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div className="h-[100vh] w-[100vw] flex bg-[#FAFDFF]">
          <Dashboard path='Game'/>
          <Link href={"/Game"} className="fixed bg-white transition ease-in-out duration-400 hover:bg-[#064A85] rounded-[16px] w-[55px] h-[55px] top-3 right-2 z-10">
            <img src={`/exit_game.svg`} alt="" className="mr-4"/>
            <span className="absolute w-full h-full top-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 text-white font-bold">exit?</span>
          </Link>
          {children}
        </div>
    </>
  );
}
