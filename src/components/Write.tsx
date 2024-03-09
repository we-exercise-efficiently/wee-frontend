import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import Gallary from '../assets/Community/gallary.svg';
import Film from '../assets/Community/film.svg';

interface WriteProps {
  navigateTo: string; // 작성 후 이동할 경로
  saveToExample: (data: any) => void;
}

const Write: React.FC<WriteProps> = ({ navigateTo, saveToExample }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 게시글 작성 후 데이터 저장
    saveToExample({ title, content });
    // 게시글 작성 후 지정된 경로로 이동
    navigate(navigateTo);
  };

  // 임시 저장 함수
  const handleTempSave = () => {
    // 임시 저장 로직 추가
    localStorage.setItem('tempPost', JSON.stringify({ title, content }));
  };

  // 컴포넌트가 마운트될 때 저장된 임시 데이터가 있는지 확인하고 있다면 상태에 설정
  useState(() => {
    const tempPost = JSON.parse(localStorage.getItem('tempPost') || '{}');
    setTitle(tempPost.title || '');
    setContent(tempPost.content || '');
  });

  return (
    <Container>
      <div className="w-[1194px] mx-auto py-[80px]">
        <div className="w-[1194px] h-[822px]">
          <form onSubmit={handleSubmit} className="h-full">
            <div className="px-[63px] py-[22px] w-[1194px] h-[705px] rounded-3xl bg-gray-100">
            <div>
              <label htmlFor="title" className="block text-gray-700" ></label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder='제목을 입력하세요'
                className="mb-[22px] block w-full p-[5px] h-[57px] focus:border-gray-500 bg-gray-100 text-[24px] placeholder-black"
              />
            </div>
            <div className='border border-black-500 bg-black h-[3px]'>
              {/* border */ }
            </div>
            <div>
              <label htmlFor="content" className="block text-[20px] text-gray-700"></label>
              <textarea
                id="content"
                name="content"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                placeholder='내용'
                className="mt-[22px] block w-full p-[5px] h-[560px] focus:border-gray-500 bg-gray-100 text-[20px] text-gray-700"
              ></textarea>
            </div>
            </div>
            <div className='mt-[18px] w-[1194px] h-[100px] flex items-center rounded-3xl border-[1px] border-black-500'>
              <div className="w-[120px] h-[50px] ml-[30px] mr-[710px] flex justify-between">
                <img className="w-[48px] h-[48px] items-center" src={Gallary} alt="gallary"/>
                <img className="w-[54px] h-[46px] items-center" src={Film} alt="film"/>
              </div>
              <div className="w-[294px] h-[64px] flex justify-between">
                <button type="button" onClick={handleTempSave} className="w-[142px] h-[64px] mr-[10px] inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-full shadow-sm text-[22px] font-medium text-white bg-black">임시저장</button>
                <button type="submit" className="w-[142px] h-[64px] inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-full shadow-sm text-[22px] font-medium text-black bg-themeLime">작성</button>
              </div>
            </div>
          </form>
        </div>
        
      </div>
    </Container>
  );
};

export default Write;
