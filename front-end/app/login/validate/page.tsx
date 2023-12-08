"use client";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation'
import {  useContext, useEffect, useState } from "react";
import {
  removeLocalStorageItem,
  setLocalStorageItem,
} from "@/utils/localStorage";
import Loading from "@/app/loading";
import { contextdata } from "@/app/contextApi";
import axios from "axios";
import TwoFa from "@/components/Dashboard/Login/TwoFa";

export default function validateForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [showTwoFa, setShowTwoFa] = useState(false);
  const router = useRouter();
  const {setLoged}:any = useContext(contextdata);
  useEffect(() => {
        if (!token) {
          return;
        }
        const getUser = async () => {
          try
          {
            const resp = await axios.get(`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/user/userinfo`,{headers: {Authorization: `Bearer ${token}`}});
            if (resp.data.twoFAActive) {
              setShowTwoFa(true);
            }
            else {
                setLocalStorageItem("Token", token);
                setLoged();
                router.push('/');
            }
          }
          catch (error)
          {
            removeLocalStorageItem("Token");
            router.push("/login");
            return;
          }
        }
      getUser();
    }, [token]);

  return (
    <>
      {showTwoFa ? <TwoFa jwtToken={token}/> :  <Loading/>}
    </>
  );
}
