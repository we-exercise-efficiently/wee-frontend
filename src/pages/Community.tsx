// import Container from '../components/Container';

// export default function Community() {
//   return (
//     <Container>
//       <h2 className="font-bold text-red-700 text-3xl">COMMUNITY</h2>
//     </Container>
//   );
// }

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import SideBar from '../components/SideBar'; // SideBar 컴포넌트 import
import Search from '../assets/Community/search.svg';

interface Post {
  id: number;
  title: string;
  likes: number;
  views: number;
  date: string;
}

interface Props {
  handleWritePost: () => void;
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
  // useNavigate 훅을 사용하여 navigate 객체 가져오기
  const navigate = useNavigate();
  // 검색 결과 게시글 목록 상태
  const [searchResults, setSearchResults] = useState<Post[]>([]);

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
  

  // const filteredPosts = posts.filter((post) =>
  //   post.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // const sortPosts = (sortBy: string) => (a: Post, b: Post): number => {
  //   if (sortBy === 'latest') {
  //     return new Date(b.date).getTime() - new Date(a.date).getTime();
  //   } else if (sortBy === 'likes') {
  //     return b.likes - a.likes;
  //   } else if (sortBy === 'views') {
  //     return b.views - a.views;
  //   }
  //   return 0;
  // };

  // 게시글 개수 변경 핸들러
  const handlePostCountChange = (count: number) => {
    setPostCount(count);
    setToggle(false); // 토글 닫기
  };

  // 글쓰기 버튼 클릭 핸들러
  const handleWritePost = () => {
    // 글쓰기 페이지로 이동
    navigate('/write');
  };

  // 게시글 보기 핸들러
  const handleViewPost = (postId: number) => {
    // 게시글 페이지 URL에 해당하는 경로 생성
    const postPath = `/post/${postId}`;
    // 해당 경로로 이동
    navigate(postPath);
  };

  // 검색 아이콘 클릭 핸들러
  const handleSearchIconClick = () => {
    // 검색어로 게시글을 필터링하여 검색 결과 상태에 저장
    const results = posts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
    setSearchResults(results);
  };

  // 검색 결과가 있는지 확인
  const hasSearchResults = searchTerm !== '' && searchResults.length > 0;

  // 출력할 게시글 목록
  const displayPosts = hasSearchResults ? searchResults : posts;

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
      <div className="flex mt-[77px] ml-[96px] mr-[443px]">
        {/* 왼쪽 영역 */}
        <SideBar handleWritePost={handleWritePost} />

        {/* 오른쪽 영역 */}
        <div className="ml-[87px]">
          {/* 검색 창 */}
          <div className="mb-[57px] w-[1034px] h-[51px] border-b border-black flex justify-between items-center">
            <input
              type="text"
              placeholder="검색하기"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-[981px] h-[38px] px-[8px] py-[12px] placeholder-gray-700"
            />
            <img className="w-[24px] h-[24px] mr-[21px] cursor-pointer" src={Search} alt="search" onClick={handleSearchIconClick}/>
          </div>

          {/* 버튼 그룹 */}
          <div className="mb-[26px] flex items-center justify-between">
            <div className="flex space-x-[13px]">
              {/* 버튼은 필요에 따라 수정하세요 */}
              <button onClick={() => handleSortChange('latest')} className={`w-[131px] h-[48px] px-4 py-2 rounded-3xl transition duration-300 ${sortBy === 'latest' ? 'bg-themeLime text-black' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900'}`}>최신순</button>
              <button onClick={() => handleSortChange('views')} className={`w-[131px] h-[48px] px-4 py-2 rounded-3xl transition duration-300 ${sortBy === 'views' ? 'bg-themeLime text-black' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900'}`} >조회수순</button>
              <button onClick={() => handleSortChange('likes')} className={`w-[131px] h-[48px] px-4 py-2 rounded-3xl transition duration-300 ${sortBy === 'likes' ? 'bg-themeLime text-black' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900'}`} >좋아요순</button>
            </div>
            
            {/* 게시글 개수 토글 */}
            <div className="relative">
              <button onClick={() => setToggle(!toggle)} className="w-[128px] h-[48px] px-[25px] py-[15px] bg-gray-200 text-gary-500 text-[18px] rounded-md hover:bg-gray-200 hover:text-black-500 transition duration-300 flex items-center justify-center border-gray-500">
                {postCount}개씩
                <svg className={`w-5 h-5 transform ${toggle && 'rotate-180'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {toggle && (
                <div className="absolute top-full left-0 w-full bg-gray-200 rounded-md mt-1">
                  <button onClick={() => handlePostCountChange(5)} className="block w-full py-[15px] px-[32px] text-[18px] text-left hover:bg-gray-300 hover:rounded-t-md">5개씩</button>
                  <button onClick={() => handlePostCountChange(10)} className="block w-full py-[15px] px-[32px] text-[18px] text-left hover:bg-gray-300">10개씩</button>
                  <button onClick={() => handlePostCountChange(15)} className="block w-full py-[15px] px-[32px] text-[18px] text-left hover:bg-gray-300">15개씩</button>
                  <button onClick={() => handlePostCountChange(20)} className="block w-full py-[15px] px-[32px] text-[18px] text-left hover:bg-gray-300 hover:rounded-b-md">20개씩</button>
                </div>
              )}
            </div>
          </div>

          {/* 게시글 목록 */}
          <div>
            <ul className="space-y-[19px]">
              {/* 게시글 아이템을 출력하는 로직 */}
              {displayPosts.map((post) => (
                <li key={post.id} className="w-[1035px] h-[225px] bg-gray-100 p-[33px] rounded-3xl cursor-pointer" onClick={() => handleViewPost(post.id)}>
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