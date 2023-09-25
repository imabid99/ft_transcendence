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
import jwt_decode from "jwt-decode";
import { contextdata } from '@/app/contextApi';

export default function Home() {

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isloading, setIsLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [logInAnimation, setLogInAnimation] = useState(false);
  const {loged, setLoged}:any = useContext(contextdata);

  useEffect(() => {
    const token = getLocalStorageItem("Token");
    if (token) {
      router.push('/');
      return;
    }
    setIsLoading(false);
  }, []);

  if (isloading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  const handleSubmit = async (e:any) =>
  {
    e.preventDefault();
    setLogInAnimation(true);
    if (!email || !password)
    {
      setLogInAnimation(false); 
      return;
    };
    try {
      const response = await axios.post(`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/auth/login`, {
        email: email,
        password: password,
       });
       setLocalStorageItem("Token", response.data);
    } catch (e:any) 
    {
      console.log("Error : ", e.response.data);
      setLogInAnimation(false);
      return;
    }
    setTimeout(() => {
      setLoged(!loged);
      router.push('/');
    }, 1000);
  }
  return (
    // <div className="flex justify-center items-center w-screen h-screen bg-gray-50 dark:bg-gray-900">
    //   <form className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-96 justify-center relative" onSubmit={handleSubmit}>
    //     <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
    //     <div className="relative mb-6">
    //       <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
    //         <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
    //             <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
    //             <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
    //         </svg>
    //       </div>
    //       <input
    //        onChange={(e) => setEmail(e.target.value)}
    //        type="text" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email"/>
    //     </div>
    //     <label htmlFor="website-admin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
    //     <div className="flex">
    //       <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
    //         <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    //             <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
    //         </svg>
    //       </span>
    //       <input
    //         onChange={(e) => setPassword(e.target.value)} 
    //         type="password" id="website-admin" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="password"/>
    //     </div>

    //     <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4' >
    //         Log In
    //     </button>
    //     <Link href="/signup" className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 flex justify-center items-center' >
    //         Sign Up
    //     </Link>
    //     {
    //       logInAnimation &&
    //         <div className='absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50' id='loader'>
    //           <div className='flex h-full w-full justify-center items-center'>
    //             <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white'></div>
    //           </div>  
    //         </div>
    //     }
    //   </form>
    // </div>
      <div className="h-[100vh] w-[100%] bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-around items-center">
  <div className="h-[100vh] w-[100vw] bg-white flex flex-row items-center justify-center md:w-11/12 md:h-[735px] md:rounded-[61px] xl:max-w-[1404px] xl:mx-auto">
    <div className="flex flex-col items-center justify-center">
      <p className="font-[600] text-[40px] text-[#064A85] sm:text-[66px]">
        Welcome !
      </p>
      <p className="font-[600] text-[#6A849E] text-[20px] sm:text-[35px]">
        Let The Fun Begin.
      </p>
      <div className="flex flex-col pt-[20px] gap-[16px] sm:flex-row">
        <button className="flex justify-evenly items-center w-[170px] h-[52px] border-[1px] rounded-[11px] border-[#DDDDDD]">
          <img src="goog.svg" alt="" className="w-[20.153px] h-[20.56px]" />
          <p className="text-[#000] text-[10px] font-[400]">Log in with google</p>
        </button>
        <button className="flex justify-evenly items-center w-[170px] h-[52px] border-[1px] rounded-[11px] border-[#DDDDDD]">
          <img src="423918.logowik 1.png" alt="" className="w-[25px] h-[21px]" />
          <p className="text-[#000] text-[10px] font-[400]">Log in with intra</p>
        </button>
      </div>
      <div className="flex w-[200px] pt-[24px] pl-[24px]  gap-[10px] items-center ">
        <div className="w-[61px] h-[1px] bg-[#C9C9C9]"></div>
        <p className="text-[#DBDBDB] text-[15px] font-[400]">OR</p>
        <div className="w-[61px] h-[1px] bg-[#C9C9C9]"></div>
      </div>
      <form action="" className="flex flex-col items-center gap-[24px] pt-[24px]" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-[16px]">
          <input onChange={(e) => setEmail(e.target.value)} type="email" className="text-[#064A85] w-[217px] h-[45px] rounded-[11px] border-[1px] border-[#DDDDDD]  p-[27px] sm:w-[376px] md:w-[376px] md:h-[62px]" placeholder="Email or Username" />
          <input onChange={(e) => setPassword(e.target.value)}  type="password" className="text-[#064A85] w-[217px] h-[45px] rounded-[11px] border-[1px] border-[#DDDDDD]  p-[27px] sm:w-[376px] md:w-[376px] md:h-[62px]" placeholder="Password" />
        </div>
        <button className="w-[217px] h-[53px] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-[11px] text-[#FFF] text-[20px] font-[500] md:h-[68.345px] l-inp">Login</button>
      </form>
      <div className="flex flex-row items-center gap-[2px] pt-[24px]">
        <p className="text-[#064A85] text-[14px] font-[300] sm:text-[18.963px]">
          Don’t have an account?
              <Link href="/signup" className='text-[#6A849E] text-[14px] font-[400] sm:text-[18.963px] pl-[2px]' >
            Sign Up
         </Link>
        </p>
      </div>
    </div>
    <div className="xl:block hidden">
      <img src="Frame 101.png" alt="" className="mt-[-112px] ml-[60px]" />
    </div>
    </div>
  </div>
  )
}




// {"email":"asabbar@asabbar1.com","password":"asabbar","firstName":"achraf","lastName":"sabbar","username":"asabbar"}