import "../globals.css";
import Head from "next/head";
import Dashboard from '@/components/Dashboard/Dashboard/Dashboard'
import Guard from "@/components/Dashboard/Login/Guard";
export const metadata = {
  title: "Game",
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
          <Guard>
              <div className="h-[100vh] w-[100vw] flex  pl-[150px] bg-[#FAFDFF] lsm:max-lg:overflow-x-hidden lsm:max-lg:pl-[100px] lsm:max-sm:pl-[0px] overflow-hidden">
                  <Dashboard path='Game'/>
                  {children}
              </div>
        </Guard>
    </>
  );
}
