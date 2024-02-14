export default function Diary() {

    return (
      <>

        <div className='text-center bg-[#F5F5F5] w-full h-[344px] inline-flex'>
    
            <div className='border-[0.5px] border-[#D7D7D7] text-center w-1/2 h-full flex items-center justify-center'>
                +
            </div>
            <div className='border-[0.5px] border-[#D7D7D7] text-center w-1/2 h-full flex items-center justify-center'>
                +
            </div>
        </div>
        
        <div>
            <textarea name="" id=""  
            className='border border-[#D9D9D9] resize-none text-left-500 w-full h-[344px] px-[10px] py-[5px]'>
            </textarea>
        </div>
        
        <div className="mt-[-90px] mr-[37px] flex justify-end">
            <button className='w-[142px] h-[64px] bg-[#D1FD0A] rounded-full'>작성 완료</button>
        </div>

      </>
    );
}