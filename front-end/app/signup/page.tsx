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


  const imageUrls = [
    'first4.png',
    'jus.png',
    'first1.png',
    'first2.png',
    'first3.png',
    'lala.png',
    'first5.png',
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const changeImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  useEffect(() => {
    const intervalId = setInterval(changeImage, 10000);

    return () => clearInterval(intervalId);
  }, []);
  const styling = {
    backgroundImage: `url(${imageUrls[currentImageIndex]})`,
  }
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
      const response = await axios.post(`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/auth/signup`, {
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
    <>
    {/* /*style={{ backgroundImage: 'url("first4.png")' }}    style={styling}*/}
  <div className="min-h-[100vh] w-[100%] flex justify-around items-center bgImg bg-no-repeat bg-cover bg-center" style={{backgroundImage: 'url("backfilter.svg")'}}> 
    <div className=" w-[100vw]   bg-blue-200 bg-opacity-0 backdrop-blur-lg flex flex-row items-center justify-center md:w-11/12 md:h-[735px] md:rounded-[61px] xl:max-w-[1404px] xl:mx-auto">
      <div className="w-[100%] flex flex-col items-center justify-center xl:w-[35%]">
        <div className="font-[600] text-[40px] text-white sm:text-[66px]">
          Welcome !
        </div>
        <div className="font-[600] text-white text-[20px] sm:text-[35px]">
          Let The Fun Begin.
        </div>
        <div className="flex flex-col pt-[20px] gap-[16px] sm:flex-row w-full items-center justify-center">
          <button className="flex justify-evenly items-center w-[170px] h-[52px] border-[0.1px] rounded-[11px] border-white cursor-pointer">
            <img src="goog.svg" alt="" className="w-[20.153px] h-[20.56px]" />
            <p className="text-white text-[10px] font-[400] cursor-pointer">
              Log in with google 
            </p>
          </button>
          <button className="flex justify-evenly items-center w-[170px] h-[52px] border-[0.1px] rounded-[11px] border-white cursor-pointer">
            <img
              src="423918.logowik 1.png"
              alt=""
              className="w-[25px] h-[21px]"
            />
            <p className="text-white text-[10px] font-[400] cursor-pointer">
              Log in with intra
            </p>
          </button>
        </div>
        <div className="flex w-full pt-[20px] justify-center  gap-[10px] items-center">
          <div className="w-[61px] h-[1px] bg-white" />
          <p className="text-white text-[15px] font-[400]">OR</p>
          <div className="w-[61px] h-[1px] bg-white" />
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
                  className="text-white h-[50px] rounded-[11px] border-[0.1px] border-white  p-[27px] w-12/12 sm:w-6/12  bg-white bg-opacity-10 backdrop-blur-lg placeholder:text-white"
                  placeholder="First name"
                />
                <input
                  onChange={(e:any) => setlastName(e.target.value)}
                  type="lastName"
                  className=" text-white h-[50px] rounded-[11px] border-[0.1px] border-white  p-[27px] w-12/12 sm:w-6/12  bg-white bg-opacity-10 backdrop-blur-lg placeholder:text-white"
                  placeholder="Last name"
                />
              </div>
              <input
                onChange={(e:any) => setuserName(e.target.value)}
                type="userName"
                className="text-white h-[50px] rounded-[11px] border-[0.1px] border-white  p-[27px] w-12/12  bg-white bg-opacity-10 backdrop-blur-lg placeholder:text-white"
                placeholder="Username"
              />
              <input
                onChange={(e:any) => setEmail(e.target.value)}
                type="email"
                className="text-white h-[50px] rounded-[11px] border-[0.1px] border-white  p-[27px] w-12/12  bg-white bg-opacity-10 backdrop-blur-lg placeholder:text-white"
                placeholder="Email"
              />
              <input
                onChange={(e:any) => setPassword(e.target.value)}
                type="password"
                className="text-white h-[50px] rounded-[11px] border-[0.1px] border-white  p-[27px] w-12/12  bg-white bg-opacity-10 backdrop-blur-lg placeholder:text-white"
                placeholder="Password"
              />
            </div>
            <button className="w-[180px] h-[53px] bg-cyan-500 bg-opacity-40 backdrop-blur-lg rounded-[11px] text-[#FFF] text-[20px] font-[500] md:h-[68.345px] l-inp">Sign Up</button>
          </form>
        </div>
        <div className="flex flex-row items-center gap-[2px] pt-[24px]">
        <p className="text-white text-[14px] font-[300] sm:text-[18.963px]">
        Already have an account?
              <Link href="/login" className='text-[#eee] text-[14px] font-[400] sm:text-[18.963px] pl-[2px]' >
            Login
         </Link>
        </p>
      </div>
      </div>
      <div className="xl:block hidden relative">
        <img src="Frame 101-PhotoRoom.png" alt="" className=" relative mt-[-112px] ml-[60px]" />
        <img src="heroball.png" alt="" className="mt-[-200px] ml-[60px]  top-[440px] left-[45px] animateball absolute" />
      </div>
    </div>
  </div>
</>

  )
}




// {"email":"asabbar@asabbar1.com","password":"asabbar","firstName":"achraf","lastName":"sabbar","username":"asabbar"}