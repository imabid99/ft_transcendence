'use client';
import Loading from "@/app/loading";
import { checkLoged } from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import { useEffect , useState } from "react";

function Guard ({ children }: { children: React.ReactNode; }) {

    const [isloading, setIsLoading] = useState(true);
    const router = useRouter();
	useEffect(() => {
		const token = checkLoged();
		if (!token) {
		router.push("/login");
		return;
		}
		setIsLoading(false);
	}, []);

    if (isloading) {
        return <Loading />;
    }
    console.log("Guard");
    return (
        <>
            {children}
        </>
    );
}

export default Guard;