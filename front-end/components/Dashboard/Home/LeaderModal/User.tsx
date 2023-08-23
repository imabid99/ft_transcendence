
type Props = {
    name: string,
    username: string,
    avatar: string
}

export default function User({ name, username, avatar }: Props) {

    return (
        <div className="flex gap-[10px] items-center w-[208px] ">
            <img src={avatar} alt="avatar" className="w-[40px] h-[40px] rounded-full object-cover shadow-4xl" />
            <span>
                <p className="text-[15px] font-[700] text-[#3675B0]">{name}</p>
                <p className="text-[9px] font-[500] text-[#3675B0]">{`@ ${username}`}</p>
            </span>
        </div>
    )
}