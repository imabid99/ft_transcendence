'use client';
import Modes from "@/components/Dashboard/Game/Mode/Modes";
import { useState, useEffect, useContext } from "react";
import Maps from "@/components/Dashboard/Game/Map/Maps";
import { useRouter } from 'next/navigation';
import FriendSearch from "@/components/Dashboard/Game/Friend_Search/Friend_Search";
import PlayWithAI from "./ai/page";
import Random from "./random/page";
import {setLocalStorageItem } from "@/utils/localStorage";
import { Rule } from "postcss";
import Rules from "@/components/Dashboard/Game/Rules/Rules";
import { contextdata } from "../contextApi";

const Game = () => {
    const [Show, setShow] = useState<string | null>(null);
    const [selectedMap, setSelectedMap] = useState<string>("forest");
    const [selectedMode, setSelectedMode] = useState<string | null>(null);
	const{setMediaDashbord,dashboardRef}:any = useContext(contextdata);
    const router = useRouter();

    const handleMapChange = (map: string) => {
        setSelectedMap(map);
    }

    const handleModeChange = (mode: string) => {
        setSelectedMode(mode);
    }
	useEffect(() => {
		setLocalStorageItem('Maps', selectedMap);
	}, [selectedMap]);
		
	return (
		<div className="w-full h-full flex justify-center items-center">
			<div className="absolute top-0 left-0 z-20 hidden lsm:max-sm:block cursor-pointer" onClick={() => {
				setMediaDashbord(true)
				dashboardRef.current?.classList.add("!left-0")
			}}>
				<svg width="30" height="28" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M17.5 14C17.8852 14.0002 18.2556 14.1486 18.5344 14.4144C18.8132 14.6802 18.979 15.0431 18.9975 15.4279C19.016 15.8127 18.8858 16.1898 18.6338 16.4812C18.3818 16.7726 18.0274 16.9558 17.644 16.993L17.5 17H1.5C1.11478 16.9998 0.744405 16.8514 0.465613 16.5856C0.186821 16.3198 0.020988 15.9569 0.00247574 15.5721C-0.0160365 15.1873 0.114192 14.8102 0.366175 14.5188C0.618159 14.2274 0.972581 14.0442 1.356 14.007L1.5 14H17.5ZM17.5 7C17.8978 7 18.2794 7.15804 18.5607 7.43934C18.842 7.72064 19 8.10218 19 8.5C19 8.89782 18.842 9.27936 18.5607 9.56066C18.2794 9.84196 17.8978 10 17.5 10H1.5C1.10218 10 0.720644 9.84196 0.43934 9.56066C0.158035 9.27936 0 8.89782 0 8.5C0 8.10218 0.158035 7.72064 0.43934 7.43934C0.720644 7.15804 1.10218 7 1.5 7H17.5ZM17.5 0C17.8978 0 18.2794 0.158035 18.5607 0.43934C18.842 0.720644 19 1.10218 19 1.5C19 1.89782 18.842 2.27936 18.5607 2.56066C18.2794 2.84196 17.8978 3 17.5 3H1.5C1.10218 3 0.720644 2.84196 0.43934 2.56066C0.158035 2.27936 0 1.89782 0 1.5C0 1.10218 0.158035 0.720644 0.43934 0.43934C0.720644 0.158035 1.10218 0 1.5 0H17.5Z" fill="#034B8A"/>
				</svg> 
            </div>
			<div className="absolute top-0 left-0 w-full h-full  overflow-hidden">
				<video
						src="/Europa Official Game Reveal Trailer.mp4"
						autoPlay={true}
						muted={true}
						loop={true}  
						className="h-full object-cover w-full"
						controls={false}
						disablePictureInPicture={false}
						data-wf-ignore={true}
					/>
			</div>
			{
			Show == null ? <Rules setShow={setShow}/>
			:
			Show == 'map1' ? <Maps setShow={setShow} onMapChange={handleMapChange} />
			:
			Show == 'map' ? <Modes  setShow={setShow} onModeChange={handleModeChange}/>
			:
			Show == 'FRIEND' && (
				<FriendSearch setShow={setShow}/>
			) 
			}
		</div>
	);
};

export default Game;

