interface Props {
    children: React.ReactNode,
    leaderRef: any,
}

export default function RightModal({ children, leaderRef }:Props) {
    return (
    <div className="LeaderModal flex flex-col gap-[35px] justify-start h-[95vh]   min-w-[676px] min-h-[900px] bg-[#fff] z-[59] top-[50%] right-[-6000px] absolute translate-y-[-50%] rounded-[42px] shadooow ease-in duration-300 delay-100"
        ref={leaderRef}>
        {children}
      </div>
    )
  }