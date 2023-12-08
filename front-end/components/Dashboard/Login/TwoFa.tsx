// import axiosInstance from "@/utils/axiosInstance";
"use client";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import {
  setLocalStorageItem,
  getLocalStorageItem,
  removeLocalStorageItem,
} from "@/utils/localStorage";
import axios from "axios";
import { contextdata } from "@/app/contextApi";

export default function TwoFa({ jwtToken }: any) {
  const [twofactoryInput, setTwofactoryInput] = useState<string>("");
  const router = useRouter();
  const { loged, setLoged }: any = useContext(contextdata);
  const handleEnableTwoFactory = async (e: any) => {
    e.preventDefault();
    try {
      const resp = await axios.post(
        `http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/auth/2fa_verify`,
        {
          code: twofactoryInput,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (resp.data === true) {
        setLoged(!loged);
        setLocalStorageItem("Token", jwtToken);
        router.push("/");
      }
    } catch (error) {
    }
  };
  return (
    <div
        className="absolute z-20 h-[100vh] w-[100%] flex justify-around items-center bgImg bg-no-repeat bg-cover bg-center "
        style={{ backgroundImage: 'url("backfilter.svg")' }}
    >
        <div className=" w-[100vw]  h-full bg-blue-200 bg-opacity-0 backdrop-blur-[7px] flex flex-row items-center justify-center md:w-11/12 md:max-h-[735px] md:rounded-[61px] xl:max-w-[1404px] xl:mx-auto">
        <div className="w-[100%] flex flex-col items-center justify-center xl:w-[30%] py-[50px] bg-b text-center">
        <div className="font-[600] text-[25px] text-white sm:text-[50px]">
        Two-Factor Authentication
        </div>
        <div className="font-[600] text-gray-300 text-[10px] sm:text-[15px]">
        Enter 6-digit code from your two factor authenticator APP.
        </div>
            <div className=" w-full">
            <form
                action=""
                className=" flex items-center w-full flex-col"
                noValidate
            >
            <div className="flex flex-col gap-[22px] sm:flex-row justify-center items-center pt-[16px]  w-[100%] ">
                <input
                    type="twofactory"
                    maxLength={6}
                    pattern="\d*"
                    onInput={(event) => {
                    event.currentTarget.value =
                        event.currentTarget.value.replace(/[^0-9]/g, "");
                    }}
                    onChange={(e) => setTwofactoryInput(e.target.value)}
                    className={`text-white h-[70px] rounded-[11px] border-[0.1px]   p-[27px] w-full   bg-white bg-opacity-10 backdrop-blur-lg text-center `}
                />
                </div>
                <div className="flex flex-col sm:flex-row justify-center items-center  pt-[24px] pb-[40px] gap-[8px] w-full  xl:pb-0">
                <input
                    type="submit"
                    className="w-[160px] h-[50px] rounded-[12px]  cursor-pointer text-[#fff] text-[13px] font-[600] b-authS"
                    value="Submit"
                    onClick={handleEnableTwoFactory}
                />
                </div>
            </form>
            </div>
        </div>
        <div className="xl:block hidden relative">
            <img
            src="Frame 101-PhotoRoom.png"
            alt=""
            className=" relative mt-[-112px] ml-[60px]"
            />
            <img
            src="heroball.png"
            alt=""
            className="mt-[-200px] ml-[60px]  top-[440px] left-[45px] animateball absolute"
            />
        </div>
        </div>
    </div>
    );
}
