import Link from 'next/link'

export default function NotMemmber() {
    return (
        <div className=' items-center justify-center w-[calc(100%-450px)] min-h-full flex flex-col min-w-[490px] lg:max-xl:w-[calc(100%-350px)] lsm:max-lg:min-w-full '>
            <h1 className='text-3xl font-bold text-center'>
                You are not a member of this group
            </h1>
            <Link href="/Chat" className='text-[#AF1C1C] font-bold underline'>
                Go Back
            </Link>

        </div>
    )
}