"use client";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation'
import {  useContext, useEffect } from "react";
import {
  setLocalStorageItem,
} from "@/utils/localStorage";
import Loading from "@/app/loading";
import { contextdata } from "@/app/contextApi";

export default function validateForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const router = useRouter();
  const {setLoged}:any = useContext(contextdata);
  console.log("this is token : ", token);
    useEffect(() => {
        if (!token) {
            return;
        }
        setLocalStorageItem("Token", token);
        setLoged(true);
        router.push("/");
    }, [token]);

  return (
    <>
    <Loading/>
    </>
  );
}
