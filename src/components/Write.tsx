import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  // 이전 페이지로 이동하는 함수
  const goBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-xl font-semibold mb-4">게시글 작성</h2>
      <button onClick={goBack} className="mb-4 text-indigo-600 hover:underline">이전 페이지로 돌아가기</button>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">제목</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">내용</label>
          <textarea
            id="content"
            name="content"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>
        <button type="submit" className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">작성</button>
      </form>
    </div>
  );
}
