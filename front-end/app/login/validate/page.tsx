"use client";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation'
import {  useEffect } from "react";
import {
  setLocalStorageItem,
} from "@/utils/localStorage";
import Loading from "@/app/loading";

export default function validateForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const router = useRouter();
  console.log("this is token : ", token);
    useEffect(() => {
        if (!token) {
            return;
        }
        setLocalStorageItem("Token", token);
        router.push("/");
    }, [token]);

  return (
    <>
    <Loading/>
    </>
  );
}
