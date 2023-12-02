'use client';

import React, { useRef, useState, useEffect, useMemo, useContext } from "react";
import { contextdata } from "../../contextApi";
import { io } from "socket.io-client";
import Loading from "@/app/loading";

const Invite = () => {
		
	return (
		<div className="w-full  h-full relative flex justify-center items-center">
			<div >
				Invite Loading Screen HERE!
			</div>
			<Loading/>
		</div>
	);
};

export default Invite;

