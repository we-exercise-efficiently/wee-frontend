import PlusImg from '../../assets/Todo/Plus.svg'
import ListItem from './ListItem';

export default function List() {

    return (
      <>
        <div className='h-full grid content-between'>
            {/* 투두 리스트 전체 영역 */}
            <div className="w-[783px] h-[586px] px-[68px] py-[33px] bg-[#FAFAFA] rounded-[24px]">

            <div className='mb-[33px]'>

                {/* AI 추천 루틴 태그 */}
                <div className='w-[174px] h-[42px] rounded-[50px] bg-[#D1FD0A] flex items-center justify-center'>
                    <p>
                        AI 추천 루틴
                    </p>
                </div>

                {/* AI 추천 리스트 내용 */}
                <div className='mt-[33px] mb-[28px]'>
                    <ListItem />
                </div>

                {/* border */}
                <div className='border-[1px] border-black '></div>
                
            </div>    

            
            <ListItem />

            
            </div>

            {/* 추가하기 버튼 */}
            <div className="w-[70px] h-[70px] mx-auto">
                <img src={PlusImg} alt="할 일 추가하기" />
            </div>

        </div>
        

      </>
    );
}