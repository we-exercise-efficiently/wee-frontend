import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import SideBar from '../components/SideBar'; // SideBar 컴포넌트 import
import PostList from '../components/PostList';
// import Search from '../assets/Community/search.svg';

interface Post {
  id: number;
  title: string;
  writer: string;
  like: number;
  cnt: number;
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
  // 외부 JSON 파일에서 가져온 게시글 목록 상태
  const [posts, setPosts] = useState<Post[]>([]);

  // 게시글 목록을 외부 JSON 파일에서 가져옴
  useEffect(() => {
    fetch('../examples/PostExample') 
      .then(response => response.json())
      .then(data => {
        if (data.code === '200') {
          setPosts(data.data); // 가져온 데이터를 상태로 설정
        } else {
          console.error('Failed to fetch posts:', data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행


  // const posts: Post[] = [
  //   { id: 1, title: '게시물 1', likes: 10, views: 100, date: '2024-01-30' },
  //   { id: 2, title: '게시물 2', likes: 15, views: 120, date: '2024-01-29' },
  //   // 다른 게시물들...
  // ];

  // 검색어 변경 핸들러
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // 정렬 변경 핸들러
  const handleSortChange = (sortBy: string) => {
    setSortBy(sortBy);
  };
  
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
    <Container>
      <div className="flex my-[77px] ml-[96px] mr-[443px]">
        {/* 왼쪽 영역 */}
        <SideBar handleWritePost={handleWritePost} />

        {/* 오른쪽 영역 */}
        <div className="ml-[87px]">
          {/* 검색 창 */}
          {/* <div className="mb-[57px] w-[1034px] h-[51px] border-b border-black flex justify-between items-center">
            <input
              type="text"
              placeholder="검색하기"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-[981px] h-[38px] px-[8px] py-[12px] placeholder-gray-700"
            />
            <img className="w-[24px] h-[24px] mr-[21px] cursor-pointer" src={Search} alt="search" onClick={handleSearchIconClick}/>
          </div> */}

          <PostList
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearchIconClick={handleSearchIconClick}
            handleSearchChange={handleSearchChange}
            posts={posts}
            displayPosts={displayPosts}
            handleViewPost={handleViewPost}
            handleSortChange={handleSortChange}
            handlePostCountChange={handlePostCountChange}
            postCount={postCount}
            sortBy={sortBy}
            toggle={toggle}
            setToggle={setToggle}
          />

          {/* 버튼 그룹
          <div className="mb-[26px] flex items-center justify-between">
            <div className="flex space-x-[13px]">
              <button onClick={() => handleSortChange('latest')} className={`w-[131px] h-[48px] px-4 py-2 rounded-3xl transition duration-300 ${sortBy === 'latest' ? 'bg-themeLime text-black' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900'}`}>최신순</button>
              <button onClick={() => handleSortChange('views')} className={`w-[131px] h-[48px] px-4 py-2 rounded-3xl transition duration-300 ${sortBy === 'views' ? 'bg-themeLime text-black' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900'}`} >조회수순</button>
              <button onClick={() => handleSortChange('likes')} className={`w-[131px] h-[48px] px-4 py-2 rounded-3xl transition duration-300 ${sortBy === 'likes' ? 'bg-themeLime text-black' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900'}`} >좋아요순</button>
            </div>
            
            {/* 게시글 개수 토글 
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

          {/* 게시글 목록 
          <div>
            <ul className="space-y-[19px]">
              {/* 게시글 아이템을 출력 
              {displayPosts.map((post) => (
                <li key={post.id} className="w-[1035px] h-[225px] bg-gray-100 p-[33px] rounded-3xl cursor-pointer" onClick={() => handleViewPost(post.id)}>
                  <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-500">Likes: {post.like} | Views: {post.cnt}</p>
                </li>
              ))}
            </ul>
          </div> */}
        </div>
      </div>
    </Container>
  );
}