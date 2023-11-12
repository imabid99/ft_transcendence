
type RightSideProps = {
    children: React.ReactNode
}

export default function RightSide({children}:RightSideProps)
{
    return (
        <div className="leaderboard w-full 3xl:w-[371px] h-[396px] bg-[#fff]">
            {children}
        </div>
    )
}