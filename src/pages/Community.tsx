// import Container from '../components/Container';

// export default function Community() {
//   return (
//     <Container>
//       <h2 className="font-bold text-red-700 text-3xl">COMMUNITY</h2>
//     </Container>
//   );
// }

import React, { useState } from 'react';
import Container from '../components/Container';

interface Post {
  id: number;
  title: string;
  likes: number;
  views: number;
  date: string;
}

export default function Community() {
  // 검색어 상태
  const [searchTerm, setSearchTerm] = useState('');
  // 최신순 정렬
  const [sortBy, setSortBy] = useState('latest');
  // 게시글 개수 상태
  const [postCount, setPostCount] = useState(10); // 초기값: 10개
  // 토글 상태
  const [toggle, setToggle] = useState(false);

  const posts: Post[] = [
    { id: 1, title: '게시물 1', likes: 10, views: 100, date: '2024-01-30' },
    { id: 2, title: '게시물 2', likes: 15, views: 120, date: '2024-01-29' },
    // 다른 게시물들...
  ];

  // 검색어 변경 핸들러
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // 정렬 변경 핸들러
  const handleSortChange = (sortBy: string) => {
    setSortBy(sortBy);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortPosts = (sortBy: string) => (a: Post, b: Post): number => {
    if (sortBy === 'latest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === 'likes') {
      return b.likes - a.likes;
    } else if (sortBy === 'views') {
      return b.views - a.views;
    }
    return 0;
  };

  // 게시글 개수 변경 핸들러
  const handlePostCountChange = (count: number) => {
    setPostCount(count);
    setToggle(false); // 토글 닫기
  };

  return (
    // <Container>
    //   <div className="mx-auto p-8">
    //     <div className="flex mb-4">
    //       <h2 className="font-bold text-red-700 text-3xl">COMMUNITY</h2>
    //       <div className="flex mt-2 space-x-2 ml-auto">
    //         <button
    //           onClick={() => handleSortChange('latest')}
    //           className={`px-4 py-2 border rounded ${sortBy === 'latest' ? 'font-bold' : ''}`}
    //         >
    //           최신순
    //         </button>
    //         <button
    //           onClick={() => handleSortChange('likes')}
    //           className={`px-4 py-2 border rounded ${sortBy === 'likes' ? 'font-bold' : ''}`}
    //         >
    //           좋아요순
    //         </button>
    //         <button
    //           onClick={() => handleSortChange('views')}
    //           className={`px-4 py-2 border rounded ${sortBy === 'views' ? 'font-bold' : ''}`}
    //         >
    //           조회수순
    //         </button>
    //       </div>
    //       <input
    //         type="text"
    //         placeholder="검색"
    //         value={searchTerm}
    //         onChange={handleSearchChange}
    //         className="px-2 py-1 border border-gray-300 rounded ml-2"
    //       />
    //     </div>
    //   </div>

    //     {/* 글 목록 출력 */}
    //   <div className="mx-auto max-w-screen-lg mt-8">
    //     <div className="mt-10 border rounded p-4">
    //       <ul>
    //         {filteredPosts.sort(sortPosts(sortBy)).map((post) => (
    //           <li key={post.id} className="bg-white p-4 rounded-md shadow-md mb-4 flex justify-between items-center">
    //             <div>
    //               <h3 className="text-lg font-semibold">{post.title}</h3>
    //             </div>
    //             <div className="flex items-center">
    //               <p className="text-gray-500 mr-2">Likes: {post.likes}</p>
    //               <p className="text-gray-500">Views: {post.views}</p>
    //             </div>
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   </div>
    // </Container>
    <Container>
      <div className="flex flex-col lg:flex-row mx-auto max-w-screen-lg mt-8 p-8">
        {/* 왼쪽 영역 */}
        <div className="lg:w-1/4">
          {/* 사용자 프로필 */}
          <div className="mb-8">
            {/* 여기에 사용자 프로필 컴포넌트 추가 */}
            {/* 사용자 프로필 컴포넌트는 예시입니다. */}
            <div className="text-lg font-bold mb-2">사용자 이름</div>
            {/* 기타 사용자 정보 표시 */}
          </div>
          
          {/* 링크 목록 */}
          <div className="mb-8">
            <ul className="space-y-2">
              <li>
                {/* 각 링크는 필요에 따라 수정하세요 */}
                <a href="#" className="text-blue-500 hover:underline">글쓰기</a>
              </li>
              <li>
                <a href="#" className="text-blue-500 hover:underline">크루모집방</a>
              </li>
              <li>
                <a href="#" className="text-blue-500 hover:underline">운동 루틴방</a>
              </li>
              <li>
                <a href="#" className="text-blue-500 hover:underline">운동 질문방</a>
              </li>
            </ul>
          </div>
        </div>

        {/* 오른쪽 영역 */}
        <div className="lg:w-3/4 lg:pl-8">
          {/* 검색 창 */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="검색"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* 버튼 그룹 */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex space-x-4">
              {/* 버튼은 필요에 따라 수정하세요 */}
              <button onClick={() => handleSortChange('latest')} className={`px-4 py-2 rounded-md transition duration-300 ${sortBy === 'latest' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900'}`}>최신순</button>
              <button onClick={() => handleSortChange('views')} className={`px-4 py-2 rounded-md transition duration-300 ${sortBy === 'views' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900'}`}>조회수순</button>
              <button onClick={() => handleSortChange('likes')} className={`px-4 py-2 rounded-md transition duration-300 ${sortBy === 'likes' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900'}`}>좋아요순</button>
            </div>
            
            {/* 게시글 개수 토글 */}
            <div className="relative">
              <button onClick={() => setToggle(!toggle)} className="px-8 py-2 bg-gray-200 text-gary-500 rounded-md border border-gray-500 hover:bg-gray-200 hover:text-black-500 transition duration-300 flex items-center justify-center border-gray-500">
                {postCount}개 보기
                <svg className={`w-5 h-5 ml-2 transform ${toggle && 'rotate-180'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {toggle && (
                <div className="absolute top-full left-0 w-full bg-gray-200 border border-gray-400 rounded-md mt-1">
                  <button onClick={() => handlePostCountChange(5)} className="block w-full py-2 px-4 text-left hover:bg-gray-300">5개 보기</button>
                  <button onClick={() => handlePostCountChange(10)} className="block w-full py-2 px-4 text-left hover:bg-gray-300">10개 보기</button>
                  <button onClick={() => handlePostCountChange(15)} className="block w-full py-2 px-4 text-left hover:bg-gray-300">15개 보기</button>
                  <button onClick={() => handlePostCountChange(20)} className="block w-full py-2 px-4 text-left hover:bg-gray-300">20개 보기</button>
                </div>
              )}
            </div>
          </div>

          {/* 게시글 목록 */}
          <div>
            <ul className="space-y-4">
              {/* 게시글 아이템을 출력하는 로직 */}
              {posts.map((post) => (
                <li key={post.id} className="bg-white p-4 rounded-md shadow-md">
                  <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-500">Likes: {post.likes} | Views: {post.views}</p>
                  {/* 추가적인 정보 표시 가능 */}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Container>

  );
}