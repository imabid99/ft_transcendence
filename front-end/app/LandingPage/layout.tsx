import "../globals.css";
import Head from "next/head";
export const metadata = {
  title: "landing page",
  description: "ft_transcendence",
};

export default function RootLayout({
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
        {children}
    </>
  );
}
