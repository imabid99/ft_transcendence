import "../globals.css";
import Head from "next/head";
import Dashboard from '@/components/Dashboard/Dashboard/Dashboard'
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
        <div className="h-[100vh] w-[100vw] flex  pl-[150px] bg-[#FAFDFF]">
          <Dashboard path='setting'/>
          {children}
        </div>
    </>
  );
}
