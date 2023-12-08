'use client';
import Avatar from "../Avatar/Avatar"
import React, { useState } from 'react'
import { useRef } from "react"

type SelectUsersProps = {
    user : {
        userId: any;
        name: string,
        username: string,
        url: string,
    },
    setGroupUsers: any,
    groupUsers: any
    
}

export default function SelectUsers({user,setGroupUsers,groupUsers}: SelectUsersProps) {

    const checkRef = useRef<HTMLLabelElement>(null);
    const [isActivated, setIsActivated] = useState<Boolean>(false);
    const handleClick = (e:any) =>
    {
        if(!isActivated)
        {
            checkRef.current?.classList?.add('bg-[#d9d9d9a1]');
            if(groupUsers.length === 0)
                setGroupUsers([user.userId]);
            else
                setGroupUsers([...groupUsers,user.userId]);
        }
        else
        {
            checkRef.current?.classList?.remove('bg-[#d9d9d9a1]');
            setGroupUsers(groupUsers.filter((id:any) => id !== user.userId));
        }
        setIsActivated(!isActivated);
    }
    return (
        <>
        <label ref={
            checkRef
        } className='cursor-pointer flex items-center gap-[42px] py-[15px] hover:bg-[#d9d9d9] rounded-[10px] w-full pl-[10px]'
            onClick={handleClick}
        >
            <span className='flex items-center gap-[10px]'>
                <Avatar url={user.url} status={false}  />
                <span>
                    <p className="text-[20px] font-[500] font-[Poppins] text-[#474A4B]">
                        {user.name}</p>
                    <p className="text-[15px] font-[500] font-[Poppins] text-[#A0A5A9]">
                        {user.username}</p>
                </span>
            </span>
        </label>
        </>
    )
}

