'use client';
import {useRouter} from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import {
  useState,
  useEffect,
  useContext
} from 'react';
import { setLocalStorageItem, getLocalStorageItem, removeLocalStorageItem } from '@/utils/localStorage';
import { contextdata } from '@/app/contextApi';
import axiosInstance from '@/utils/axiosInstance';
import Image from "next/image"



export default function Page() {
  const router = useRouter();
  const [qrCodeSrc, setQrCodeSrc] = useState("2fa-qr-code 1.svg");
  const {profiles, user, socket}:any = useContext(contextdata);
  const myProfile = profiles?.find((profile:any) => profile.userId === user.id);
  const name = `${myProfile?.firstName} ${myProfile?.lastName}`;
  
  function handleFileInputChange(e:any) 
  {
    const file = e.target.files?.[0];
    const formData = new FormData();
    formData.append('file', file);
    const maxFileSize = 1024 * 1024 * 5;
    axiosInstance.post(`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/upload/avatar`, formData).then((res) => {
        console.log(res);
        socket.emit('refresh', {userId: user.id});
    }).catch((err) => {
      console.log(err);
    });
  }
  const avatarUrl = `http://${process.env.NEXT_PUBLIC_APP_URL}:3000/${myProfile?.avatar}`;
  function deleteAvatar() {
    axiosInstance.delete(`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/delete/avatar/${user.id}`).then((res) => {
        console.log("Avatar deleted successfully");
      })
      .catch((err) => {
        console.error("Error deleting avatar:", err);
      });
  }

  const qrcode = async (e : any) => {
    e.preventDefault();
    
    try {
      const response = await axiosInstance.get(`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/auth/2fa_qr`, {
        responseType: 'blob' // specify that we expect a Blob
      });
      const blob = new Blob([response.data], { type: 'image/png' }); 
      const objectURL = URL.createObjectURL(blob);
      setQrCodeSrc(objectURL); // set the Data URL as the image source
    } catch (e : any) {
      console.log("Error : ", e.response?.data || e.message); 
      return;
    }
  }

  const deleteUser = async (e : any) => {
    e.preventDefault();
    
    try {
      const response = await axiosInstance.delete(`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/user/delete`);
      removeLocalStorageItem("Token");
      socket?.disconnect();
      router.push('/login');
    } catch (e : any) {
      console.log("Error : ", e.response?.data || e.message);
      return;
    }
  }


  useEffect(() => {
    qrcode({ preventDefault: () => {} });
  }, []);
  return (
    <div className="flex flex-col 3xl:flex-row items-center w-[100%] gap-[50px] h-screen">
      <div className="flex flex-col w-[100%] items-center 3xl:items-end gap-[50px]">
        <div className="3xl:max-w-[922px] max-w-[1200px] w-11/12  xl:h-[448px] rounded-[42px] p-inf bg-white">
          <div className="text-[20px] text-center sm:text-left sm:text-[25px] font-[600] text-[#043B6A] pt-[20px] sm:pl-[40px] ">
            Personal Information
          </div>
          <div className="flex items-center flex-col sm:flex-row pb-4 sm:pl-[40px] pt-[4px] gap-[6px]">
            <div className=" w-[130px]  h-[130px] rounded-full  border-[3px] border-[#3887D0]">
              <picture>
                <img
                className="rounded-full w-full h-full object-cover"
                src={avatarUrl}
                alt=""
                />
              </picture>
            </div>
            <div className="flex flex-col sm:pl-[24px] gap-[5px] ">
              <label
                htmlFor="imageUpload"
                className="bg-[#3887D0] text-white  w-[132px] h-[41px] text-center leading-10  text-[10px] cursor-pointer rounded-[12px] hover:bg-[#2f71af] b-save"
              >
                Upload New Picture
              </label>
              <input
                type="file"
                id="imageUpload"
                className="hidden cursor-pointer"
                onChange={handleFileInputChange}
              />
              <button  className="bg-[#F9F9F9] text-[#02539D] text-[10px] font-[600] w-[132px] h-[41px] rounded-[12px] hover:bg-[#f0f0f0] b-reset">
                Delete
              </button>
            </div>
          </div>
          <form className="items-center flex flex-col gap-[16px]">
            <div className="flex  gap-[16px] w-11/12 flex-col sm:flex-row">
              <input
                className="w-full h-[66px] border-[1px] border-[#D8D8D8] rounded-[15px] placeholder:indent-[24px] indent-[24px]"
                type="text"
                name=""
                id=""
                placeholder="First name"
              />
              <input
                className="w-full h-[66px] border-[1px] border-[#D8D8D8] rounded-[15px] placeholder:indent-[24px] indent-[24px]"
                type="text"
                name=""
                id=""
                placeholder="Last name"
              />
            </div>
            <div className="w-11/12">
              <input
                className="w-full sm:w-[49%] h-[66px] border-[1px] border-[#D8D8D8] rounded-[15px] placeholder:indent-[24px] indent-[24px]"
                type="text"
                name=""
                id=""
                placeholder="Email"
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center sm:justify-end gap-[8px] w-11/12 pb-[35px] xl:pb-0">
                <input
                  type="submit"
                  className="w-[160px] h-[50px] rounded-[12px]  cursor-pointer text-[#fff] text-[13px] font-[600] b-save"
                  value="Save Changes"
                />
                <input
                  type="reset"
                  className="w-[160px] h-[50px] rounded-[12px] cursor-pointer text-[#02539D] text-[13px] font-[600] bg-[#F9F9F9] b-reset"
                  value="Discard"
                />
            </div>
          </form>
        </div>
        <div className="3xl:max-w-[922px] max-w-[1200px] w-11/12 xl:h-[339px] rounded-[42px] p-inf bg-white">
          <div className="text-[20px] text-center sm:text-left sm:text-[25px] font-[600] text-[#043B6A] pt-[20px] sm:pl-[40px] pb-[28px]">
            Password
          </div>
          <form className="items-center flex flex-col gap-[16px]">
            <div className="w-11/12">
              <input
                className="w-full sm:w-[49%] h-[66px] border-[1px] border-[#D8D8D8] rounded-[15px] placeholder:indent-[24px] indent-[24px]"
                type="text"
                name=""
                id=""
                placeholder="Old password"
              />
            </div>
            <div className="flex  gap-[16px] w-11/12 flex-col sm:flex-row">
              <input
                className="w-full h-[66px] border-[1px] border-[#D8D8D8] rounded-[15px] placeholder:indent-[24px] indent-[24px]"
                type="text"
                name=""
                id=""
                placeholder="New password"
              />
              <input
                className="w-full h-[66px] border-[1px] border-[#D8D8D8] rounded-[15px] placeholder:indent-[24px] indent-[24px]"
                type="text"
                name=""
                id=""
                placeholder="Confirm password"
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center sm:justify-end gap-[8px] w-11/12 pt-[10px] pb-[40px] xl:pb-0">
                <input
                  type="submit"
                  className="w-[160px] h-[50px] rounded-[12px]  cursor-pointer text-[#fff] text-[13px] font-[600] b-save"
                  value="Save Changes"
                />
                <input
                  type="reset"
                  className="w-[160px] h-[50px] rounded-[12px] cursor-pointer text-[#02539D] text-[13px] font-[600] bg-[#F9F9F9] b-reset"
                  value="Discard"
                />
              </div>
          </form>
        </div>
      </div>
      <div className="flex flex-col w-[100%] items-center 3xl:items-start gap-[50px] ">
        <div className="bg-white rounded-[20px] p-inf  flex items-center flex-col 3xl:max-w-[922px] max-w-[1200px] w-11/12 xl:h-[618px] sm:items-start ">
          <div className="text-[20px] text-center sm:text-left sm:text-[25px] font-[600] text-[#043B6A] pt-[20px] sm:pl-[40px] pb-[28px]">
            Two-factor authentication
          </div>
          <div className="w-[100%] flex justify-center">
            <div className="w-[212px] h-[212px] rounded-[15px] border-[1px] border-[#3887D0] bg-[#F2F2F2] flex items-center justify-center lg:w-[330px] lg:h-[330px]">
              <img
                src={qrCodeSrc}
                alt=""
                className="lg:w-[296px] lg:h-[296px]"
              />
            </div>
          </div>
          <div className="w-[100%] b">
            <p className="text-[8px] text-[#898E94] lg:text-[12px] text-center pt-[16px]">
              Enter 6-digit code from your two factor authenticator APP.
            </p>
          </div>
          <div className="flex flex-col gap-[22px] sm:flex-row justify-center items-center pt-[16px]  w-[100%]">
            <div className="flex gap-[5px]">
              <input
                type="text"
                className="border-[#7D8493] bg-[#F8F8F8] w-[48px] h-[48px] rounded-[15px] indent-[16px]"
              />
              <input
                type="text"
                className="border-[#7D8493] bg-[#F8F8F8] w-[48px] h-[48px] rounded-[15px] indent-[16px]"
              />
              <input
                type="text"
                className="border-[#7D8493] bg-[#F8F8F8] w-[48px] h-[48px] rounded-[15px] indent-[16px]"
              />
            </div>
            <div className="flex gap-[5px]">
              <input
                type="text"
                className="border-[#7D8493] bg-[#F8F8F8] w-[48px] h-[48px] rounded-[15px] indent-[16px]"
              />
              <input
                type="text"
                className="border-[#7D8493] bg-[#F8F8F8] w-[48px] h-[48px] rounded-[15px] indent-[16px]"
              />
              <input
                type="text"
                className="border-[#7D8493] bg-[#F8F8F8] w-[48px] h-[48px] rounded-[15px] indent-[16px]"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center  pt-[24px] pb-[40px] gap-[8px] w-full  xl:pb-0">
                <input
                  type="submit"
                  className="w-[160px] h-[50px] rounded-[12px]  cursor-pointer text-[#fff] text-[13px] font-[600] b-authS"
                  value="Enable"
                />
                <input
                  type="reset"
                  className="w-[160px] h-[50px] rounded-[12px] cursor-pointer text-[#fff] text-[13px] font-[600] bg-[#F9F9F9] b-authR"
                  value="Disable"
                />
            </div>
        </div>
        <div className=" bg-white rounded-[20px] p-inf flex  flex-col  3xl:max-w-[922px] max-w-[1200px] w-11/12 xl:h-[169px] items-center sm:items-start">
          <div className="text-[20px] text-center sm:text-left sm:text-[25px] font-[600] text-[#043B6A] pt-[20px] sm:pl-[40px] pb-[28px]">
            Close Account
          </div>
          <div className="flex flex-col items-center w-full sm:flex-row pb-[40px] gap-[16px] justify-between">
            <div className="text-[#7D8493] text-[20px] font-[400] text-center sm:text-left w-[50%] sm:pl-[50px]">
              You can permanently delete or temprarily freeze your account.
            </div>
            <div className="flex justify-center items-center sm:pr-[40px]">
              <input
                type="submit"
                className="w-[160px] h-[50px] rounded-[12px]  cursor-pointer text-[#fff] text-[13px] font-[600] b-save"
                value="Close Account"
                onClick={deleteUser}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
