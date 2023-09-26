'use client';
import {useRouter} from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import {
  useState,
  useEffect,
  useRef,
} from 'react';
import { setLocalStorageItem, getLocalStorageItem, removeLocalStorageItem } from '@/utils/localStorage';
import jwt_decode from "jwt-decode";
export default function Home() {

  const router = useRouter();
  const [isloading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [userName, setuserName] = useState('');

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
    if (!email || !password|| !firstName || !lastName || !userName) return;
    try {
      const response = await axios.post(`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/user/signup`, {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        username: userName,
       });
       if (response.status !== 200) 
        router.push('/login');
       
    } catch (e:any) 
    {
      console.log("Error : ", e.response.data);
      return;
    }
  }
  return (
    // <div className="flex justify-center items-center w-screen h-screen bg-gray-50 dark:bg-gray-900">
    //    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
    //       <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
    //           <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
    //               Create and account
    //           </h1>
    //           <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
    //               <div>
    //                   <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your first name</label>
    //                   <input 
    //                   onChange={(e:any) => setfirstName(e.target.value)}
    //                   type="firstName" name="firstName" id="firstName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="first name" />
    //               </div>
    //               <div>
    //                   <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your last name</label>
    //                   <input 
    //                   onChange={(e:any) => setlastName(e.target.value)}
    //                   type="lastName" name="lastName" id="lastName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="last name" />
    //               </div>
    //               <div>
    //                   <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    //                   <input 
    //                   onChange={(e:any) => setEmail(e.target.value)}
    //                   type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
    //               </div>
    //               <div>
    //                   <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
    //                   <input 
    //                   onChange={(e:any) => setuserName(e.target.value)}
    //                   type="username" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" />
    //               </div>
    //               <div>
    //                   <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
    //                   <input
    //                   onChange={(e:any) => setPassword(e.target.value)}
    //                   type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
    //               </div>
    //               <div>
    //                   <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
    //                   <input
    //                   onChange={(e:any) => setPassword2(e.target.value)}
    //                   type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
    //               </div>
    //               <button type="submit" className="bg-orange-300 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
    //               <p className="text-sm font-light text-gray-500 dark:text-gray-400">
    //                   Already have an account? <Link href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
    //               </p>

    //           </form>
    //       </div>
    //   </div>
    // </div>
    <>
  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-[100vh] bg-[46e4e1beddaa3825f3d815f7f7ef8134.jpeg] w-[100%] flex justify-around items-center">
    <div className=" w-[100vw] h-full bg-white flex flex-row items-center justify-center md:w-11/12 md:h-[735px] md:rounded-[61px] xl:max-w-[1404px] xl:mx-auto">
      <div className="w-[100%] flex flex-col items-center justify-center xl:w-[35%]">
        <div className="font-[600] text-[40px] text-[#064A85] sm:text-[66px]">
          Welcome !
        </div>
        <div className="font-[600] text-[#6A849E] text-[20px] sm:text-[35px]">
          Let The Fun Begin.
        </div>
        <div className="flex flex-col pt-[20px] gap-[16px] sm:flex-row w-full items-center justify-center">
          <button className="flex justify-evenly items-center w-[170px] h-[52px] border-[1px] rounded-[11px] border-[#DDDDDD] cursor-pointer">
            <img src="goog.svg" alt="" className="w-[20.153px] h-[20.56px]" />
            <p className="text-[#000] text-[10px] font-[400] cursor-pointer">
              Log in with google
            </p>
          </button>
          <button className="flex justify-evenly items-center w-[170px] h-[52px] border-[1px] rounded-[11px] border-[#DDDDDD] cursor-pointer">
            <img
              src="423918.logowik 1.png"
              alt=""
              className="w-[25px] h-[21px]"
            />
            <p className="text-[#000] text-[10px] font-[400] cursor-pointer">
              Log in with intra
            </p>
          </button>
        </div>
        <div className="flex w-full pt-[20px] justify-center  gap-[10px] items-center">
          <div className="w-[61px] h-[1px] bg-[#C9C9C9]" />
          <p className="text-[#DBDBDB] text-[15px] font-[400]">OR</p>
          <div className="w-[61px] h-[1px] bg-[#C9C9C9]" />
        </div>
        <div className=" w-full">
          <form
            onSubmit={handleSubmit}
            action=""
            className="flex flex-col items-center gap-[24px] pt-[24px]"
          >
            <div className="flex flex-col gap-[16px]  w-[70%] md:w-[50%] xl:w-full">
              <div className="flex flex-col gap-[16px] sm:flex-row">
                <input
                  onChange={(e:any) => setfirstName(e.target.value)}
                  type="firstName"
                  className="text-[#064A85] h-[50px] rounded-[11px] border-[1px] border-[#DDDDDD]  p-[27px] w-12/12 sm:w-6/12"
                  placeholder="First name"
                />
                <input
                  onChange={(e:any) => setlastName(e.target.value)}
                  type="lastName"
                  className=" text-[#064A85] h-[50px] rounded-[11px] border-[1px] border-[#DDDDDD]  p-[27px] w-12/12 sm:w-6/12"
                  placeholder="Last name"
                />
              </div>
              <input
                onChange={(e:any) => setuserName(e.target.value)}
                type="userName"
                className="text-[#064A85] h-[50px] rounded-[11px] border-[1px] border-[#DDDDDD]  p-[27px] w-12/12"
                placeholder="Username"
              />
              <input
                onChange={(e:any) => setEmail(e.target.value)}
                type="email"
                className="text-[#064A85] h-[50px] rounded-[11px] border-[1px] border-[#DDDDDD]  p-[27px] w-12/12"
                placeholder="Email or Username"
              />
              <input
                onChange={(e:any) => setPassword(e.target.value)}
                type="password"
                className="text-[#064A85] h-[50px] rounded-[11px] border-[1px] border-[#DDDDDD]  p-[27px] w-12/12"
                placeholder="Password"
              />
            </div>
            <button className="w-[217px] h-[53px] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-[11px] text-[#FFF] text-[20px] font-[500] md:h-[68.345px] l-inp">Sign Up</button>
          </form>
        </div>
        <div className="flex flex-row items-center gap-[2px] pt-[24px]">
        <p className="text-[#064A85] text-[14px] font-[300] sm:text-[18.963px]">
        Already have an account?
              <Link href="/login" className='text-[#6A849E] text-[14px] font-[400] sm:text-[18.963px] pl-[2px]' >
            Login
         </Link>
        </p>
      </div>
      </div>
      <div className="xl:block hidden">
        <img src="Frame 101.png" alt="" className="mt-[-112px] ml-[60px]" />
      </div>
    </div>
  </div>
</>

  )
}




// {"email":"asabbar@asabbar1.com","password":"asabbar","firstName":"achraf","lastName":"sabbar","username":"asabbar"}