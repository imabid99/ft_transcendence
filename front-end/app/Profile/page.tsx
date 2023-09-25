
export default function Page() {
  return (
<div className="flex items-center h-[100%] flex-col 4xl:flex-row gap-[40px] w-[100%] 4xl:justify-center">
  <div className=" flex max-w-[922px] w-[100%] xl:h-[823px] rounded-[42px] sh-d ">
    <div className="mx-auto w-11/12 mt-[34px]">
      <div className="relative w-12/12 h-[185px] rounded-[25px] overflow-hidden">
        <img
          src="Rectangle 93.svg"
          alt=""
          className="object-cover object-top w-full h-full"
        />
        <label
          htmlFor="imageUpload"
          className="t-ba absolute top-[15px] right-[15px] text-white text-center leading-5 w-[92px] h-[21px] text-[7px] rounded-[5px] cursor-pointer"
        >
          Upload Cover
        </label>
        <input
          type="file"
          id="imageUpload"
          className="absolute top-[15px] right-[15px] hidden cursor-pointer"
        />
      </div>
      <div className=" w-12/12 h-[200px] sm:h-[120px]">
        <div className="relative ">
          <img
            className="absolute left-[40px] -top-[52px]"
            src="Ellipse 187.svg"
            alt=""
          />
          <label
            htmlFor="imageUpload"
            className="absolute left-[150px] -top-[44px] cursor-pointer "
          >
            <img id="imageUpload" src="group-70.svg" />
          </label>
          <input
            type="file"
            id="imageUpload"
            className="absolute hidden cursor-pointer"
          />
        </div>
        <div className="pt-[100px] gap-[15px] sm:pt-0 flex flex-col sm:flex-row pl-[40px] sm:items-center sm:pl-[200px] sm:justify-between">
          <div className=" pt-[10px]">
            <p className="text-[25px] font-[600] text-[#020025]">Ahmed kamal</p>
            <p className="text-[15px] text-[#6E869B] font-[600]">akamal</p>
          </div>
          <div className=" flex items-center gap-[5px]">
            <button className="w-[91px] h-[29px] rounded-[9px] bg-[#5085AB] flex items-center justify-center gap-[5px]">
              <img src="Vector.svg" alt="" />
              <p className="text-[#fff] text-[8px] font-[500]">Message</p>
            </button>
            <button className="w-[30px] h-[29px] rounded-[9px] bg-[#5085AB] flex items-center justify-center gap-[5px]">
              <img src="Vector(1).svg" alt="" />
            </button>
            <button
              id="settingsButton"
              className="w-[30px] h-[29px] rounded-[9px] bg-[#5085AB] flex items-center justify-center gap-[5px]"
            >
              <img src="Vector(2).svg" alt="" />
            </button>
            <div
              id="settingsMenu"
              className="hidden absolute mt-[80px] bg-white border border-gray-300 shadow-lg rounded-lg  w-40"
            >
              <ul>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Option 1
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-[40px] xl:pt-[10px]">
        <div className="sh-l w-12/12 h-[220px] sm:h-[117px] rounded-[34px] bg-[#EFF8FF] flex items-center gap-[20px] sm:gap-[50px] flex-col sm:flex-row">
          <div className="pt-[20px] sm:pt-[0px] sm:pl-[40px] ">
            <div className=" text-[#0E559D] text-[24px] font-[400]">
              My Level
            </div>
            <div className="text-[#95A6B9] font-[300] text-[18px] flex flex-row">
              1000/2000{" "}
              <div className="text-[#7899BB] font-[400] text-[18px]">XP</div>{" "}
            </div>
          </div>
          <div className="w-10/12 sm:w-7/12 b">
            <div className="flex-grow  h-[16px] rounded-[8px] bg-[#C0D4E9] w-12/12">
              <div className="h-full sh-level rounded-[8px] w-[50%]" />
            </div>
          </div>
          <div className=" sm:pr-[40px]">
            <div className="w-[55px] h-[55px] border-[6px] border-[#356B9A] rounded-full flex justify-center items-center">
              <div className="text-[#356B9A] font-[600] text-[18px]">50</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row items-center xl:pb-[390px]">
        <div className="flex gap-[64px] sm:gap-[30px] pt-[30px] flex-col sm:flex-row">
          <div className="flex gap-[64px] flex-col">
            <div className="w-[180px] h-[100px] bg-[#BBE3FF] rounded-[24px] flex items-center pl-[20px] gap-[17px] g-sh">
              <img src="pgroup-78.svg" alt="" className="w-[36px] h-[36px]" />
              <div>
                <div className="text-[#0367A6] text-[17px] font-[500]">
                  Games
                </div>
                <div className="text-[20px] font-[600] text-[#007BC8]">0</div>
              </div>
            </div>
            <div className="w-[180px] h-[100px] bg-[#C1FFFB] rounded-[24px] flex items-center pl-[20px] gap-[17px] s-sh">
              <img src="group-83.svg" alt="" className="w-[36px] h-[36px]" />
              <div>
                <div className="text-[#12A099] text-[17px] font-[500]">
                  Score
                </div>
                <div className="text-[20px] font-[600] text-[#098982]">0</div>
              </div>
            </div>
          </div>
          <div className="flex gap-[64px] flex-col">
            <div className="w-[180px] h-[100px] bg-[#C2FFDE] rounded-[24px] flex items-center pl-[20px] gap-[17px] w-sh">
              <img src="group-82.svg" alt="" className="w-[36px] h-[36px]" />
              <div>
                <div className="text-[#27B270] text-[17px] font-[500]">
                  Wins
                </div>
                <div className="text-[20px] font-[600] text-[#10884F]">0</div>
              </div>
            </div>
            <div className="w-[180px] h-[100px] bg-[#FFCCCC] rounded-[24px] flex items-center pl-[20px] gap-[17px] l-sh">
              <img src="group-84.svg" alt="" className="w-[36px] h-[36px]" />
              <div>
                <div className="text-[#CA4E4E] text-[17px] font-[500]">
                  Loses
                </div>
                <div className="text-[20px] font-[600] text-[#B02323]">0</div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#EFF8FF] mb-[70px] xl:mb-[0px] w-11/12 sm:w-[400px] sm:h-[264px] rounded-[34px] daily-sh mt-[30px] xl:ml-[63px] flex flex-col items-center sm:items-start">
          <div className="sm:pl-[34px] pt-[25px] text-[#0E559D] text-[16px] font-[400]">
            Daily Play Time
          </div>
          <div className="flex flex-col sm:flex-row pt-[24px] gap-[24px] sm:gap-[34px]  items-center mx-auto">
            <div className="flex gap-[20px] sm:gap-[34px]">
              <div className="flex flex-col items-center">
                <div className="h-[145px] rounded-[8px] bg-[#C0D4E9] w-[16px] flex flex-col-reverse">
                  <div className="w-[16px] week-sh rounded-[8px] h-[19%]" />
                </div>
                <div className="text-[#3F88D3] text-[14px] font-[600] pt-[8px]">
                  M
                </div>
              </div>
              <div className="flex flex-col  items-center">
                <div className="h-[145px] rounded-[8px] bg-[#C0D4E9] w-[16px] flex flex-col-reverse">
                  <div className="w-[16px] week-sh rounded-[8px] h-[50%]" />
                </div>
                <div className="text-[#3F88D3] text-[14px] font-[600] pt-[8px]">
                  T
                </div>
              </div>
              <div className="flex flex-col  items-center">
                <div className="h-[145px] rounded-[8px] bg-[#C0D4E9] w-[16px] flex flex-col-reverse">
                  <div className="w-[16px] week-sh rounded-[8px] h-[80%]" />
                </div>
                <div className="text-[#3F88D3] text-[14px] font-[600] pt-[8px]">
                  W
                </div>
              </div>
              <div className="flex flex-col  items-center">
                <div className="h-[145px] rounded-[8px] bg-[#C0D4E9] w-[16px] flex flex-col-reverse">
                  <div className="w-[16px] week-sh rounded-[8px] h-[80%]" />
                </div>
                <div className="text-[#3F88D3] text-[14px] font-[600] pt-[8px]">
                  T
                </div>
              </div>
            </div>
            <div className="flex gap-[34px]">
              <div className="flex flex-col  items-center">
                <div className="h-[145px] rounded-[8px] bg-[#C0D4E9] w-[16px] flex flex-col-reverse">
                  <div className="w-[16px] week-sh rounded-[8px] h-[20%]" />
                </div>
                <div className="text-[#3F88D3] text-[14px] font-[600] pt-[8px]">
                  F
                </div>
              </div>
              <div className="flex flex-col  items-center">
                <div className="h-[145px] rounded-[8px] bg-[#C0D4E9] w-[16px] flex flex-col-reverse">
                  <div className="w-[16px] week-sh rounded-[8px] h-[30%]" />
                </div>
                <div className="text-[#3F88D3] text-[14px] font-[600] pt-[8px]">
                  S
                </div>
              </div>
              <div className="flex flex-col  items-center">
                <div className="h-[145px] rounded-[8px] bg-[#C0D4E9] w-[16px] flex flex-col-reverse">
                  <div className="w-[16px] week-sh rounded-[8px] h-[70%]" />
                </div>
                <div className="text-[#3F88D3] text-[14px] font-[600] pt-[8px]">
                  S
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="bg-white flex max-w-[922px] w-[100%]  xl:h-[823px] rounded-[42px]  sh-d flex-col ">
    <div className="mx-auto w-12/12 flex items-center pt-[30px] flex-col">
      <div className="pb-10">
        <div className="flex ">
          <img src="group.svg" alt="" />
          <span className="pl-[10px] text-[#064A85] text-[15px] sm:text-[20px] font-[400]">
            Achievements - <span>0</span> / 7
          </span>
        </div>
      </div>
      <div className="flex items-center  flex-col w-12/12 gap-[30px] lg:gap-0 pb-[30px]">
        <div className="flex items-center justify-center  gap-[30px] flex-col sm:flex-row">
          <div className="">
            <img src="Air.svg" alt="" className="" />
          </div>
          <div className="">
            <img src="Horor.svg" alt="" className="" />
          </div>
        </div>
        <div className="flex items-center justify-center gap-[30px] flex-col sm:flex-row">
          <div className="">
            <img src="Grand copy.svg" alt="" className="" />
          </div>
          <div className="">
            <img src="Grand.svg" alt="" className="" />
          </div>
          <div className="lg:block hidden">
            <img src="Luck.svg" alt="" className="" />
          </div>
        </div>
        <div className="flex items-center justify-center gap-[30px] flex-col sm:flex-row">
          <div className="">
            <img src="Unb.svg" alt="" className="" />
          </div>
          <div className="">
            <img src="iron.svg" alt="" className="" />
          </div>
        </div>
        <div>
          <div className="pb-[30px] block lg:hidden">
            <img src="Luck.svg" alt="" className="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


    
  )
}
