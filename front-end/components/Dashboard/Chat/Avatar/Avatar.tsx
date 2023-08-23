
type AvatarProps = {
    url : string,
    status : boolean
}

export default function Avatar({url, status} : AvatarProps) {
    return (
        <div className='min-w-[64px] max-w-[64px] min-h-[64px] max-h-[64px] rounded-full object-cover relative'>
            {status && <div className="absolute top-0 right-0 w-[16px] h-[16px] rounded-full bg-[#70CF98] border-[3px] border-[#fff] "></div>}
            <img src={url} alt="" className='w-[64px] h-[64px] rounded-full object-cover'/>
        </div>
    )
}