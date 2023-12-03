'use client';
import {useRouter} from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import {set, useForm} from 'react-hook-form';
import ErrorMessage from '@/components/Dashboard/signUp/Error_Message';
import { Toaster, toast } from 'sonner'
import {
  useState,
  useEffect,
  useContext,
  use
} from 'react';
import { setLocalStorageItem, getLocalStorageItem, removeLocalStorageItem } from '@/utils/localStorage';
import { contextdata } from '@/app/contextApi';
import { signIn } from 'next-auth/react';
import TwoFa from '@/components/Dashboard/Login/TwoFa';

export default function Home() {

  const router = useRouter();
  const [logInAnimation, setLogInAnimation] = useState(false);
  const {loged, setLoged}:any = useContext(contextdata);
  const [showTwoFa, setShowTwoFa] = useState(false);

  type FormValues = {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
  }
  
  const form = useForm<FormValues>({mode: 'all'});
  const {register, handleSubmit, formState } = form;
  const {errors, isDirty} = formState;
  const [jwtToken, setJwtToken] = useState<string>("");
  const onSubmit = async (data: FormValues) => {
    console.log(data);
    try {
      const response = await axios.post(`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/auth/login`, {
        email: data.email,
        password: data.password,
      });
      <Toaster position="top-right" richColors />

        // toast.error(response?.data?.message);
        if (response?.data?.message) {
          toast.error(response.data.message);
        }
      console.log("hello world : ", response.data.message);
      setJwtToken(response.data);
      } catch (e:any) 
      {
        console.log("Login : ", e.response.data);
        return;
      }
  }
  useEffect(() => {
    if (!jwtToken) {
      return;
    }
    const getUser = async () => {
      console.log("jwtToken : ", jwtToken);
      try
      {
        const resp = await axios.get(`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/user/userinfo`,{headers: {Authorization: `Bearer ${jwtToken}`}});
        if (resp.data.twoFAActive) {
          setShowTwoFa(true);
        }
        else {
            setLocalStorageItem("Token", jwtToken);
            setLoged(!loged);
            router.push('/');
        }
      }
      catch (error)
      {
        console.log("getUser : ",error);
        removeLocalStorageItem("Token");
        router.push("/login");
        return;
      }
    }
    getUser();
  }, [jwtToken]);
  const onError = (errors:any) => console.log(errors);
  // const registerOptions = {
  //   firstName: { required: "First name is required",
  //   maxLength: {
  //     value: 20,
  //     message: "should not exceed 20 characters",
  //   },
  //   pattern: {
  //     value: /^[a-zA-Z\u00C0-\u017F]+(?:\s[a-zA-Z\u00C0-\u017F]+)*$/,
  //     message: 'Please enter valid name',
  //   },
  //   minLength: {
  //     value: 2,
  //     message: "at least 3 characters",
  //   },
  //  },
  //   lastName: { required: "Last name is required",
  //   maxLength: {
  //     value: 20,
  //     message: "should not exceed 20 characters",
  //   },
  //   minLength: {
  //     value: 2,
  //     message: "at least 3 characters",
  //   },
  //  },
  //   userName: { required: "Name is required",
  //   usernameAvailable: async (value:string) => {
  //     console.log("usernameAvailable", value);
  //     const response = await axios.post(`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/auth/usernameAvailable`, {
  //       username: value,
  //     });
  //     if (response.status !== 200) 
  //       return "Username already exists";
  //   }
  //   },
  //   email: { required: "Email is required",
  //   pattern: {
  //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  //     message: "invalid email address"
  //   },
  //   emailAvailable: async (value:string) => {
  //     console.log("emailAvailable", value);
  //     const response = await axios.post(`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/auth/emailAvailable`, {
  //       email: value,
  //     });
  //     if (response.status !== 200) 
  //       return "Email already exists";
  //   },
  // },
  //   password: {
  //     required: "Password is required",
  //     minLength: {
  //       value: 8,
  //       message: "Password must have at least 8 characters"
  //     },
  //     validate: (value:string) => {
  //       return (
  //         [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every((pattern) =>
  //           pattern.test(value)
  //         ) || "must include lower, upper, number, and special chars"
  //       );
  //     },

  //   }
  // };
  return (
    
    <>
    {showTwoFa && <TwoFa jwtToken={jwtToken}/>}
    {<div className="h-[100vh] w-[100%] flex justify-around items-center bgImg bg-no-repeat bg-cover bg-center " style={{backgroundImage: 'url("/backfilter.svg")'}}> 
    <div className=" w-[100vw]  h-full bg-blue-200 bg-opacity-0 backdrop-blur-[7px] flex flex-row items-center justify-center md:w-11/12 md:max-h-[735px] md:rounded-[61px] xl:max-w-[1404px] xl:mx-auto">
      <div className="w-[100%] flex flex-col items-center justify-center xl:w-[30%] py-[50px]">
      <div className="font-[600] text-[40px] text-white sm:text-[66px]">
          Welcome !
        </div>
        <div className="font-[600] text-gray-300 text-[20px] sm:text-[35px]">
          Let The Fun Begin.
        </div>
        <div className="flex flex-col pt-[20px] gap-[16px] sm:flex-row w-full items-center justify-center">
          <button className="flex justify-evenly items-center w-[170px] h-[52px] border-[0.1px] rounded-[11px] border-white cursor-pointer hover:bg-white hover:bg-opacity-10">
            <img src="goog.svg" alt="" className="w-[20.153px] h-[20.56px]" />
            <p className="text-white text-[10px] font-[400] cursor-pointer">
              Log in with google 
            </p>
          </button>
          <button className="flex justify-evenly items-center w-[170px] h-[52px] border-[0.1px] rounded-[11px] border-white cursor-pointer hover:bg-white hover:bg-opacity-10"
          onClick={() => {
            // setLogInAnimation(true);
            // signIn('42');
              router.push('http://localhost:3000/api/auth/oauth2/42');
          }
          }
          >
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
            noValidate
            onSubmit={handleSubmit(onSubmit, onError)}
            action=""
            className="flex flex-col items-center gap-[24px] pt-[16px] "
          >
            <div className="flex flex-col gap-[16px]  w-[70%] md:w-[50%] xl:w-full ">
              <div className="flex flex-col gap-[10px] justify-between  w-full ">
                <div className=''>
                <input
                  {...register("email")}
                  type="email"
                  className={`text-white h-[70px] rounded-[11px] border-[0.1px]   p-[27px] w-full  bg-white bg-opacity-10 backdrop-blur-lg  ${errors.email ? 'border-[2px] border-red-400 placeholder:text-red-400' : 'placeholder:text-white'}` }                  
                  placeholder="Your email"
                />
                </div>
                <div className=''>
                <input
                  {...register("password")}
                  type="password"
                  className={`text-white h-[70px] rounded-[11px] border-[0.1px]   p-[27px] w-full   bg-white bg-opacity-10 backdrop-blur-lg  ${errors.password ? 'border-[2px] border-red-400 placeholder:text-red-400' : 'placeholder:text-white'}` }
                  placeholder="Password"
                  />
                </div>
              </div>
            </div>
        {errors.email || errors.password ? (
        <p className="text-red-500">There's an error in the email or password.</p>
        ) : null}
            <button  className="w-[217px] h-[53px] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-[11px] text-[#FFF] text-[20px] font-[500] md:h-[68.345px] l-inp">Login</button>
          </form>
        </div>
        <div className="flex flex-row items-center gap-[2px] pt-[24px]">
        <p className="text-white text-[14px] font-[300] sm:text-[18.963px]">
        Don’t have an account?
          <Link href="/signup" className='text-[#eee] text-[14px] font-[400] sm:text-[18.963px] pl-[2px]' >
            Sign Up
          </Link>
        </p>
      </div>
      </div>
      <div className="xl:block hidden relative">
        <img src="Frame 101-PhotoRoom.png" alt="" className=" relative mt-[-112px] ml-[60px]" />
        <img src="heroball.png" alt="" className="mt-[-200px] ml-[60px]  top-[440px] left-[45px] animateball absolute" />
      </div>
    </div>
  </div>}
</> 

  )
}
