export default function ListItem() {

    return (
      <>

        {/* 리스트 */}
        <div className="mb-[30px] flex justify-between items-center">
            
            {/* 리스트 아이콘 */}
            <div className="w-[34px] h-[34px] border-[2.5px] border-[#FF008A] rounded-full"></div>
            {/* 리스트 내용 */}
            <p className="w-[573px] text-[18px] overflow-hidden whitespace-nowrap">
                오늘자 달성해야 하는 루틴 오늘자 달성해야 하는 루틴 와자자!
            </p>
        </div>        

      </>
    );
}