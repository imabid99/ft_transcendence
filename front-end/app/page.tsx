'use client'
import Dashboard from "@/components/Dashboard/Dashboard/Dashboard"
import HomeDash from "@/components/Dashboard/Home/Home"
import { checkLoged } from "@/utils/localStorage"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Loading from "./loading"


export default function Page() {

  const router = useRouter();
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = checkLoged();
    if (!token) {
        router.push("/login");
        return;
    }
    setIsLoading(false);
  }, []);

  if (isloading) {
    return <Loading />;
  }
  


  return (
    <>
      <Dashboard path='Home'/>
      <div className='h-[100vh] w-[100vw] flex pl-[150px] bg-[#FAFDFF] lsm:max-lg:overflow-x-hidden lsm:max-lg:pl-[100px] lsm:max-sm:pl-[0px]'>
        <HomeDash />
      </div>
    </>
  )
}
