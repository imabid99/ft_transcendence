'use client';
import Modes from "@/components/Dashboard/Game/Mode/Modes";
import { useState, useEffect } from "react";
import Maps from "@/components/Dashboard/Game/Map/Maps";
import { useRouter } from 'next/navigation';
import FriendSearch from "@/components/Dashboard/Game/Friend_Search/Friend_Search";
import PlayWithAI from "./ai/page";
import Random from "./random/page";
const Game = () => {
    const [Show, setShow] = useState<string | null>(null);
    const [selectedMap, setSelectedMap] = useState<string | null>(null);
    const [selectedMode, setSelectedMode] = useState<string | null>(null);
    const router = useRouter();

    const handleMapChange = (map: string) => {
        setSelectedMap(map);
    }

    const handleModeChange = (mode: string) => {
        setSelectedMode(mode);
    }
		
	return (
		<div className="w-full h-full flex justify-center items-center">
			<div className="absolute top-0 left-0 w-full h-full  overflow-hidden">
				<video
						src="Europa Official Game Reveal Trailer.mp4"
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
			Show == null ? <Maps setShow={setShow} onMapChange={handleMapChange} />
			:
			Show == 'map' ? <Modes  setShow={setShow} onModeChange={handleModeChange}/>
			:
			Show == 'FRIEND' ? (
			<FriendSearch setShow={setShow}/>
			) : Show == 'AI' ? (
			<PlayWithAI selectedMap={selectedMap} />
			) : (
			<Random selectedMap={selectedMap} />
			)
			}
		</div>
	);
};

export default Game;

