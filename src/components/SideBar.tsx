import React from 'react';

interface Props {
  handleWritePost: () => void; // handleWritePost 함수를 props로 받음
}

const SideBar: React.FC<Props> = ({ handleWritePost }) => {
  return (
    <div className="w-[259px] h-[483px] border border-red-500">
        <div className="mt-[71px]">
            {/* 사용자 프로필 */}
            <div className="pt-[46px] mb-[30px] w-[259px] h-[166px] bg-gray-100 rounded-3xl">
                <div className="flex justify-center items-center text-lg font-bold mb-2">사용자 이름</div>
                <button onClick={handleWritePost} className="mx-auto w-[200px] h-[51px] rounded-3xl border border-black flex justify-center items-center text-black">글쓰기</button>
            </div>
        
            {/* 링크 목록 */}
            <div className="mt-[30px]">
                <div className="mt-[30px] w-[259px] h-[216px] bg-gray-100 rounded-3xl">
                    <div className="flex justify-center items-center">
                        <button className="w-full h-[71px] hover:bg-black hover:text-white hover:rounded-t-3xl">크루 모집방</button>
                    </div>
                    <div className="mx-[18px] border border-b-gray-500 w-[224px]"></div>
                    <div className="flex justify-center items-center">
                        <button className="w-full h-[71px] hover:bg-black hover:text-white">운동 루틴방</button>
                    </div>
                    <div className="mx-[18px] border border-b-gray-500 w-[224px]"></div>
                    <div className="flex justify-center items-center">
                        <button className="w-full h-[71px] hover:bg-black hover:text-white hover:rounded-b-3xl">운동 질문방</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default SideBar;




