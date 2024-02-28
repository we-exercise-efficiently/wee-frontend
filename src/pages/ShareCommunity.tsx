import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import SideBar from '../components/SideBar'; // SideBar 컴포넌트 import
import PostList from '../components/PostList';

interface Post {
  crewId: number;
  shareId: number;
  questionId: number;
  userId: number;
  title: string;
  contents: string;
  like: number;
  createDate: string;
  viewCnt: number;
  commentCnt: number;
  startDate: Date;
  endDate: Date;
  location: string;
  type: string;
  headcount: number;
  status: string;
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
    fetch('../src/examples/ShareExample.json') 
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
  const handleViewPost = (shareId: number) => {
    // 게시글 페이지 URL에 해당하는 경로 생성
    const postPath = `/community/share/${shareId}`;
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
          <PostList
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearchIconClick={handleSearchIconClick}
            handleSearchChange={handleSearchChange}
            // posts={posts}
            // displayPosts={displayPosts}
            // handleViewPost={handleViewPost}
            handleSortChange={handleSortChange}
            handlePostCountChange={handlePostCountChange}
            postCount={postCount}
            sortBy={sortBy}
            toggle={toggle}
            setToggle={setToggle}
          />

          {/* 게시글 목록 */}
          <div>
            <ul className="space-y-[19px]">
              {/* 게시글 아이템을 출력 */}
              {displayPosts.map((post) => (
                <li key={post.shareId} className="w-[1035px] h-[225px] bg-gray-100 p-[33px] rounded-3xl cursor-pointer" onClick={() => handleViewPost(post.shareId)}>
                  <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-500">Likes: {post.like} | Views: {post.viewCnt}</p>
                </li>
              ))}
            </ul>
          </div> 
        </div>
      </div>
    </Container>
  );
}