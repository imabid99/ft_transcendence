'use client';
import React, { ReactNode } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { contextdata } from '@/app/contextApi';

type HandlRightClickProps ={
    children: ReactNode,
    id ?: number,
    type ?: number,
    mytype ?: number,
    groupId ?: number,
}

export default function HandlRightClick({ children ,id, type , groupId, mytype }: HandlRightClickProps) {
    const [showMenu, setShowMenu] = useState(false);
    const [showMutemenu, setShowMutemenu] = useState(false);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault(); 
        setShowMenu(true);
        setPos({ x: e.clientX - window.innerWidth, y: e.clientY });
        console.log(e.clientX, e.clientY);
    };
    const {socket} :any= useContext(contextdata);
    const handleKick = () => {
        if (!socket) return;

        socket.emit("KickUser", {userId: id, groupId: groupId});
        setShowMenu(false);
    }

    return(
        <div onContextMenu={handleContextMenu}

        onMouseLeave={
            () => {
                setShowMenu(false);
            }
        }
        >
            {
                showMenu && (
                    <div  className={`absolute w-[120px] flex flex-col gap-[10px] z-[100] bg-[#034B8A] translate-[${pos.x}px,${pos.y}px] right-0
                    groupInfo text-white rounded-[10px]
                    `}>
                        {
                            mytype && type && mytype > type && (
                            <div className=' cursor-pointer relative'>
                                <p className='py-[10px] px-[20px]' onClick={() => {setShowMutemenu(!showMutemenu);}}>
                                    Mute
                                </p>
                                {
                                    showMutemenu && (
                                    <ul className='absolute top-[0px] -left-[110px] bg-[#034B8A] rounded-[10px] flex flex-col' onMouseLeave={
                                        () => {
                                            setShowMutemenu(false);
                                        }
                                    }>
                                        <li className='py-[10px] px-[20px] cursor-pointer'>
                                            5 sec
                                        </li>
                                        <li className='py-[10px] px-[20px] cursor-pointer'>
                                            5 min
                                        </li>
                                        <li className='py-[10px] px-[20px] cursor-pointer'>
                                            1 hour
                                        </li>
                                        <li className='py-[10px] px-[20px] cursor-pointer'>
                                            1 year
                                        </li>
                                    </ul>
                                    )
                                }
                            </div>)
                        }
                        {
                            mytype && type && mytype > type && (
                                <>
                                    <div className='py-[10px] px-[20px] cursor-pointer'>
                                        Ban
                                    </div>
                                    <div className='py-[10px] px-[20px] cursor-pointer' onClick={handleKick}>
                                        Kick
                                    </div>
                                </>
                            )
                        }
                        {
                            
                            mytype && mytype === 3 &&  type !== 3 && (
                                <>
                                    <div className='py-[10px] px-[20px] cursor-pointer'>
                                        Set Admin
                                    </div>
                                    <div className='py-[10px] px-[20px] cursor-pointer'>
                                            Set Owner
                                    </div>
                                </>
                            )
                        }
                    </div>
                )
            }
            <div onClick={() =>  setShowMenu(false)} className='flex  items-center justify-between'>
                {children}
            </div>
            </div>
        )
        ;
}

