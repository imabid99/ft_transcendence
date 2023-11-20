type props  = {
    message: string
}

export default function ErrorMessage({message}: props) {
    // console.log("this is message", message);
    return (
        
        message ? (
            <div className="absolute flex gap-1 items-center pt-[5px]">
              <img src="erroricon.svg" alt="" className="w-[12px] h-[12px]"/>
              <p className="text-red-400 text-[15px] ">
                {message}
              </p>
            </div>
          ) : null
    )
}