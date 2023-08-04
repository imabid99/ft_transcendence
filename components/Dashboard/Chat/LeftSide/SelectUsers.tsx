import Avatar from "../Avatar/Avatar"

type SelectUsersProps = {
    user : {
        name: string,
        username: string,
        url: string,
    },
    setGroupUsers: any,
    groupUsers: any
}

export default function SelectUsers({user,setGroupUsers,groupUsers}: SelectUsersProps) {

    const handleClick = (e:any) =>
    {
        setTimeout(() => {
            if(e.target.checked)
                setGroupUsers([...groupUsers,user.username])
            else
                setGroupUsers(groupUsers.filter((username:string) => username !== user.username))
        }, 100);
    }
    return (
        <>
        <label htmlFor={user.username}  className='cursor-pointer flex items-center gap-[42px] py-[15px] hover:bg-[#D9D9D9] rounded-[10px] w-full pl-[10px]'
        onClick={handleClick}>
            <input type='checkbox' value={user.username} id={user.username} className='form-checkbox cursor-pointer h-[31px] w-[31px] text-gray-400 border-none rounded-[10px]' />
            <span className='flex items-center gap-[10px]'>
                <Avatar url={user.url} status={false}  />
                <span>
                    <p className="text-[20px] font-[500] font-[Poppins] text-[#474A4B]">
                        {user.name}</p>
                    <p className="text-[15px] font-[500] font-[Poppins] text-[#A0A5A9]">
                        {user.username}</p>
                </span>
            </span>
        </label>
        </>
    )
}