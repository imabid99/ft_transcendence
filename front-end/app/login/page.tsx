'use client';
import {useRouter} from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import {useForm} from 'react-hook-form';
import {
  useState,
  useEffect,
  useContext
} from 'react';
import { setLocalStorageItem, getLocalStorageItem, removeLocalStorageItem } from '@/utils/localStorage';
import { contextdata } from '@/app/contextApi';
import { signIn } from 'next-auth/react';

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
      console.log("Login : ", e.response.data);
      setLogInAnimation(false);
      return;
    }
    setTimeout(() => {
      setLoged(!loged);
      router.push('/');
    }, 1000);
  }

  return (
    <div className="min-h-[100vh] w-[100%] bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-around items-center bg-no-repeat bg-cover bg-center" style={{ backgroundImage: 'url("first4.png")' }}>
      <div className="h-[100vh] w-[100vw] bg-white flex flex-row items-center justify-center md:w-11/12 md:h-[735px] md:rounded-[61px] xl:max-w-[1404px] xl:mx-auto">
        <div className="flex flex-col items-center justify-center">
          <p className="font-[600] text-[40px] text-[#064A85] sm:text-[66px]">
            Welcome !
          </p>
          <p className="font-[600] text-[#6A849E] text-[20px] sm:text-[35px]">
            Let The Fun Begin.
          </p>
          <div className="flex flex-col pt-[20px] gap-[16px] sm:flex-row">
            <button className="flex justify-evenly items-center w-[170px] h-[52px] border-[1px] rounded-[11px] border-[#DDDDDD]"
            onClick={() => router.push('http://localhost:3000/api/auth/oauth2/google/callback')}
            >
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
              <input onChange={(e) => setEmail(e.target.value)} type="email" className="text-[#064A85] w-[217px] h-[45px] rounded-[11px] border-[1px] border-[#DDDDDD]  p-[27px] sm:w-[376px] md:w-[376px] md:h-[62px]" placeholder="User name" />
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