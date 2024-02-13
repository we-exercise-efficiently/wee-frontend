import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import Gallary from '../assets/Community/gallary.svg';
import Film from '../assets/Community/film.svg';

export default function Write() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 게시글 작성 후 데이터 저장
    savePost({ title, content });
    // 게시글 작성 후 홈페이지로 이동
    navigate('/community');
  };

  // 게시글을 로컬 스토리지에 저장하는 함수
  const savePost = (post: { title: string; content: string }) => {
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));
  };

  // 임시 저장 함수
  const handleTempSave = () => {
    // 여기에 임시 저장 로직 추가
  };

  // // 이전 페이지로 이동하는 함수
  // const goBack = () => {
  //   navigate(-1); // 이전 페이지로 이동
  // };

  return (
    <Container>
      <div className="w-[1194px] mx-auto py-[80px]">
        {/* <h2 className="text-xl font-semibold mb-4">게시글 작성</h2> */}
        {/* <button onClick={goBack} className="mb-4 text-indigo-600 hover:underline">이전 페이지로 돌아가기</button> */}
        {/* <div className="w-1194 h-704 mx-auto px-10 py-10 rounded-3xl bg-gray-100"> */}
        <div className="px-[63px] rounded-3xl bg-gray-100 w-[1194px] h-[710px] py-[22px]">

          <form onSubmit={handleSubmit}>
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

          </form>
        </div>

        <div className='mt-[18px] w-full h-[100px] flex items-center rounded-3xl border-[1px] border-black-500'>
          <div className="w-[120px] h-[50px] ml-[30px] mr-[710px] flex justify-between">
            <img className="w-[48px] h-[48px] items-center" src={Gallary} alt="gallary"/>
            <img className="w-[54px] h-[46px] items-center" src={Film} alt="film"/>
          </div>
          <div className="w-[294px] h-[64px] flex justify-between">
            <button type="button" onClick={handleTempSave} className="w-[142px] h-[64px] mr-[10px] inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-full shadow-sm text-[22px] font-medium text-white bg-black">임시저장</button>
            <button type="submit" className="w-[142px] h-[64px] inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-full shadow-sm text-[22px] font-medium text-black bg-themeLime">작성</button>
          </div>
        </div>

        
      </div>
    </Container>
  );
}
