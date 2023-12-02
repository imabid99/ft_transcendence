"use client";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation'
import axios from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { contextdata } from "@/app/contextApi";

import { useState, useEffect, useRef, use } from "react";
import axiosInstance from "@/utils/axiosInstance";
import ErrorMessage from "@/components/Dashboard/signUp/Error_Message";
import Loading from "@/app/loading";

export default function CompleteProfile() {
  // console.log("this is info : ", info);
  const router = useRouter();
  const [avatarUrl, setAvatarUrl] = useState("/nouser.avif");
  const [avatar, setUserData] = useState<File>();
  let user_data = new FormData();
  const [isloading, setIsLoading] = useState(true);
  const [info, setInfo] = useState<any>();
  type FormValues = {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
  };
  const searchParams = useSearchParams()
  
  const token = searchParams.get('token')
  console.log("this is token : ", token);
    useEffect(() => {
        if (!token) {
            return;
        }
        const fetchMyProfile = async () => {
            try {
            const response = await axios.get(`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/auth/oauth2/tempUser/${token}`);
            console.log("this is response : ", response.data);
            setInfo({
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                userName: response.data.username,
                email: response.data.email,
                password: response.data.password,
            });
            setAvatarUrl(`${response.data.avatar}`);
            setIsLoading(false);
            } catch (e: any) {
            console.log("Error : ", e);
            return;
            }
        };
        fetchMyProfile();
    }, [token]);
console.log("myInfo  ", info);

  const form = useForm<FormValues>({
    mode: "all",
    defaultValues: {
      firstName: info?.firstName,
      lastName: info?.lastName,
      userName: info?.userName,
      email: info?.email,
    },
  });
  // console.log("this is form", myProfile?.firstName);
  const { register, handleSubmit, formState } = form;
  const { errors, isDirty } = formState;
  const onSubmit = async (data: FormValues) => {
    // user_data.append('firstName', data.firstName);
    // user_data.append('lastName', data.lastName);
    // user_data.append('username', data.userName);
    // user_data.append('email', data.email);
    // user_data.append('password', info.password);
    for (let pair of user_data.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    console.log("this is user_data ahahah : ", avatar);
    try {
      const response = await axios.post(
        `http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/auth/signup`,
        {
          firstName: data.firstName,
          lastName: data.lastName,
          username: data.userName,
          email: data.email,
          file: avatar,
        }
      );
      // if (response.status !== 200) router.push("/login");
    } catch (e: any) {
      console.log("Error : ", e.response.data);
      return;
    }
  };
  const onError = (errors: any) => console.log(errors);
  const registerOptions = {
    firstName: {
      required: "First name is required",
      maxLength: {
        value: 20,
        message: "should not exceed 20 characters",
      },
      minLength: {
        value: 3,
        message: "at least 3 characters",
      },
      validate: (val: any) =>
        val?.match(/\p{L}/gu)?.join("") === val ||
        "must contain only characters",
    },
    lastName: {
      required: "Last name is required",
      maxLength: {
        value: 20,
        message: "should not exceed 20 characters",
      },
      minLength: {
        value: 3,
        message: "at least 3 characters",
      },
      validate: (val: any) =>
        val?.match(/\p{L}/gu)?.join("") === val ||
        "must contain only characters",
    },
    userName: {
      required: "Name is required",
      validate: async (value: string) => {
        if (value === info.username) {
          return true;
        }
        const response = await axios.post(
          `http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/user/check-username`,
          {
            username: value,
          }
        );
        if (response.data !== false) return "Username already exists";
      },
    },
    email: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "invalid email address",
      },
      validate: async (value: string) => {
        if (value === info.email) {
          return true;
        }
        const response = await axios.post(
          `http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/user/check-email`,
          {
            email: value,
          }
        );
        if (response.data !== false) return "Email already exists";
      },
    },
  };
  //   function handleFileInputChange(e: any) {
  //     const file = e.target.files?.[0];
  //     if (!file) {
  //         return;
  //     }
  //     const formData = new FormData();
  //     formData.append('file', file);
  //     const maxFileSize = 1024 * 1024 * 5;
  //     const uploadEndpoint =  `http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/upload/avatar`;
  //     axiosInstance
  //         .post(uploadEndpoint, formData)
  //         .then((res) => {
  //         socket.emit('refresh', { userId: user.id });
  //     })
  //     .catch((err) => {
  //         console.log(err);
  //     });
  // }

  // console.log("this is my profile : ", myProfile);
  const handleUploadImage = (e: any) => {
    const file = e.target.files?.[0];
    const maxFileSize = 1024 * 1024 * 5;
    console.log("this is file : ", file);
    // formData.append('file', file);

    if (!file) return;
    if (file?.size > maxFileSize) {
      alert("File is too large. Please upload a file smaller than 5 MB.");
      return;
    }
    // user_data.delete('file');
    // user_data.append('file', file);
    // setUserData(formData);
    setUserData(file);
    console.log("------> file : ", file);
    console.log("------> setUserData : ", avatar);

    setAvatarUrl(URL.createObjectURL(file));
  };
  // const avatarUrl = `http://${process.env.NEXT_PUBLIC_APP_URL}:3000/${myProfile?.avatar}`;
  if (isloading) {
    return <Loading/>;
  }

  return (
    <>
      <div
        className="h-[100vh] w-[100%] flex justify-around items-center bgImg bg-no-repeat bg-cover bg-center "
        style={{ backgroundImage: 'url("/backfilter.svg")' }}
      >
        <div className=" w-[100vw]  h-full bg-blue-200 bg-opacity-0 backdrop-blur-[7px] flex flex-row items-center justify-center md:w-11/12 md:max-h-[735px] md:rounded-[61px] xl:max-w-[1404px] xl:mx-auto">
          <div className="w-[100%] flex flex-col items-center justify-center xl:w-[30%] py-[50px]">
            <div className="relative pb-[30px]">
              <div className="  w-[150px]  h-[150px] rounded-full left-[43px] -top-[52px] border-[5px] border-white">
                <picture>
                  <img
                    className="rounded-full w-full h-full object-cover"
                    src={avatarUrl}
                    alt=""
                  />
                </picture>
              </div>
              <label
                htmlFor="upload"
                className="absolute top-[20px] cursor-pointer "
              >
                <img
                  id="imageUpload"
                  src="/group-70.svg"
                  className="transform hover:scale-125 transition-transform duration-300"
                />
              </label>
              <input
                name="avatar"
                type="file"
                id="upload"
                className="absolute hidden cursor-pointer"
                onChange={handleUploadImage}
              />
            </div>
            <div className=" w-full">
              <form
                noValidate
                onSubmit={handleSubmit(onSubmit, onError)}
                action=""
                className="flex flex-col items-center gap-[24px] pt-[16px] "
              >
                <div className="flex flex-col gap-[16px]  w-[70%] md:w-[50%] xl:w-full ">
                  <div className="flex flex-col gap-[10px] justify-between sm:flex-row  w-full ">
                    <div className="pb-[20px]">
                      <input
                        {...register("firstName", registerOptions.firstName)}
                        type="firstName"
                        className={`text-white h-[65px] rounded-[11px] border-[0.1px]   p-[27px] w-full  bg-white bg-opacity-10 backdrop-blur-lg  ${
                          errors.firstName
                            ? "border-[2px] border-red-400 placeholder:text-red-400"
                            : "placeholder:text-white"
                        }`}
                        placeholder="First name"
                        value={info?.firstName}
                      />
                      <ErrorMessage message={errors.firstName?.message || ""} />
                    </div>
                    <div className="pb-[20px]">
                      <input
                        {...register("lastName", registerOptions.lastName)}
                        type="lastName"
                        className={`text-white h-[65px] rounded-[11px] border-[0.1px]   p-[27px] w-full   bg-white bg-opacity-10 backdrop-blur-lg  ${
                          errors.lastName
                            ? "border-[2px] border-red-400 placeholder:text-red-400"
                            : "placeholder:text-white"
                        }`}
                        placeholder="Last name"
                        value={info?.lastName}
                      />
                      <ErrorMessage message={errors.lastName?.message || ""} />
                    </div>
                  </div>
                  <div className="pb-[20px]">
                    <input
                      {...register("userName", registerOptions.userName)}
                      type="userName"
                      className={`text-white h-[65px] rounded-[11px] border-[0.1px]   p-[27px] w-full  bg-white bg-opacity-10 backdrop-blur-lg  ${
                        errors.userName
                          ? "border-[2px] border-red-400 placeholder:text-red-400"
                          : "placeholder:text-white"
                      }`}
                      placeholder="Username"
                      value={info?.userName}
                    />
                    <ErrorMessage message={errors.userName?.message || ""} />
                  </div>
                  <div className="pb-[20px]">
                    <input
                      {...register("email", registerOptions.email)}
                      type="email"
                      className={`text-white h-[65px] rounded-[11px] border-[0.1px]   p-[27px] w-full  bg-white bg-opacity-10 backdrop-blur-lg  ${
                        errors.email
                          ? "border-[2px] border-red-400 placeholder:text-red-400"
                          : "placeholder:text-white"
                      }`}
                      placeholder="Email"
                      value={info?.email}
                    />
                    <ErrorMessage message={errors.email?.message || ""} />
                  </div>
                </div>

                <button className="w-[217px] h-[53px] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-[11px] text-[#FFF] text-[20px] font-[500] md:h-[68.345px] l-inp">
                  Sign up
                </button>
              </form>
            </div>
          </div>
          <div className="xl:block hidden relative">
            <img
              src="/Frame 101-PhotoRoom.png"
              alt=""
              className=" relative mt-[-112px] ml-[60px]"
            />
            <img
              src="/heroball.png"
              alt=""
              className="mt-[-200px] ml-[60px]  top-[440px] left-[45px] animateball absolute"
            />
          </div>
        </div>
      </div>
    </>
  );
}
