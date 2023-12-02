import Link from "next/link";

const exit_game = () => {

    return (
        <Link href={"/Game"} className="fixed bg-white transition ease-in-out duration-400 hover:bg-[#064A85] rounded-[16px] w-[55px] h-[55px] top-3 right-2 z-10">
            <img src={`/exit_game.svg`} alt="" className="mr-4"/>
            <span className="absolute w-full h-full top-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 text-white font-bold">exit?</span>
        </Link>
    );

};

export default exit_game;