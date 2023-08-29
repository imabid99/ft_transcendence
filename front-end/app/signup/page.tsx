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
  const [password2, setPassword2] = useState('');
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
    if (!email || !password || !password2 || !firstName || !lastName || !userName) return;
    if (password !== password2) return;
    try {
      const response = await axios.post('http://localhost:3000/api/user/signup', {
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
    <div className="flex justify-center items-center w-screen h-screen bg-gray-50 dark:bg-gray-900">
       <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create and account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  <div>
                      <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your first name</label>
                      <input 
                      onChange={(e:any) => setfirstName(e.target.value)}
                      type="firstName" name="firstName" id="firstName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="first name" />
                  </div>
                  <div>
                      <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your last name</label>
                      <input 
                      onChange={(e:any) => setlastName(e.target.value)}
                      type="lastName" name="lastName" id="lastName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="last name" />
                  </div>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input 
                      onChange={(e:any) => setEmail(e.target.value)}
                      type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                  </div>
                  <div>
                      <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                      <input 
                      onChange={(e:any) => setuserName(e.target.value)}
                      type="username" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" />
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input
                      onChange={(e:any) => setPassword(e.target.value)}
                      type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>
                  <div>
                      <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                      <input
                      onChange={(e:any) => setPassword2(e.target.value)}
                      type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>
                  <button type="submit" className="bg-orange-300 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <Link href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                  </p>

              </form>
          </div>
      </div>
    </div>
  )
}




// {"email":"asabbar@asabbar1.com","password":"asabbar","firstName":"achraf","lastName":"sabbar","username":"asabbar"}