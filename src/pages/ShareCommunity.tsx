import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import SideBar from '../components/SideBar'; // SideBar 컴포넌트 import
import PostList from '../components/PostList';
import { getShare } from '../apis/apis';

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
  const [postCount, setPostCount] = useState(5); 
  // 토글 상태
  const [toggle, setToggle] = useState(false);
  // useNavigate 훅을 사용하여 navigate 객체 가져오기
  const navigate = useNavigate();
  // 검색 결과 게시글 목록 상태
  const [searchResults, setSearchResults] = useState<Post[]>([]);
  // 외부 JSON 파일에서 가져온 게시글 목록 상태
  const [posts, setPosts] = useState<Post[]>([]);
  // 페이지 번호 상태
  const [pageNum, setPageNum] = useState(1); 
  // 페이지당 보여질 게시글 수 상태
  const [postCountPerPage, setPostPerPage] = useState(5); 
  // 현재 보여지는 게시글 상태
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);

  // 검색 결과가 있는지 확인
  const hasSearchResults = searchTerm !== '' && searchResults.length > 0;

  // 검색어 변경 핸들러
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);
  };

  // 검색 결과 필터링
  const filteredPosts = useMemo(() => {
    return posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [posts, searchTerm]);

  useEffect(() => {
    // 검색 결과 필터링
    const results = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [posts, searchTerm]);

  // 출력할 게시글 목록
  const displayPosts = hasSearchResults ? searchResults : filteredPosts;

  // 페이지네이션을 위한 게시글 목록
  const paginatedPosts = useMemo(() => {
    const startIndex = (pageNum - 1) * postCountPerPage;
    const endIndex = startIndex + postCountPerPage;
    return displayPosts.slice(startIndex, endIndex);
  }, [displayPosts, pageNum, postCountPerPage]);

  // 검색어나 검색 결과가 변경될 때 페이지 번호를 1로 초기화
  useEffect(() => {
    setPageNum(1);
  }, [searchTerm, searchResults]);

  useEffect(() => {
    setDisplayedPosts(paginatedPosts);
  }, [paginatedPosts]);
  
  useEffect(() => {
    const startIndex = (pageNum - 1) * postCountPerPage;
    const endIndex = startIndex + postCountPerPage;
    const displayedPosts = displayPosts.slice(startIndex, endIndex);
    setDisplayedPosts(displayedPosts);
  }, [pageNum, postCountPerPage, displayPosts]);

  // 게시글 목록을 외부 JSON 파일에서 가져옴
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getShare();
        setPosts(data); // 가져온 데이터를 상태로 설정
        setSearchResults(data); // 검색 결과 초기화
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }
    fetchData();
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  // 정렬 변경 핸들러
  const handleSortChange = (sortBy: string) => {
    setSortBy(sortBy);
    let sortedPosts = [...posts];
    if (sortBy === 'views') {
      sortedPosts.sort((a, b) => b.viewCnt - a.viewCnt); // 조회수순으로 정렬
    } else if (sortBy === 'likes') {
      sortedPosts.sort((a, b) => b.like - a.like); // 좋아요순으로 정렬
    } else if (sortBy === 'latest') {
      sortedPosts.sort((a, b) => new Date(b.createDate).getTime() - new Date(a.createDate).getTime()); // 최신순으로 정렬
    }
    setPosts(sortedPosts); // 정렬된 게시글을 상태로 업데이트
  };
  
  // 게시글 개수 변경 핸들러
  const handlePostCountChange = (count: number) => {
    setPostCount(count);
    setPostPerPage(count);
    setToggle(false); // 토글 닫기
  };

  // 글쓰기 버튼 클릭 핸들러
  const handleWritePost = () => {
    // 글쓰기 페이지로 이동
    navigate('/community/share/write');
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

  // 페이지네이션 UI
  const pageCount = Math.ceil(displayPosts.length / postCountPerPage); // 전체 페이지 수
  const pageNumbers = Array.from({ length: pageCount }, (_, index) => index + 1); // 페이지 번호 배열

  // 페이지 번호 클릭 핸들러
  const handlePageClick = (pageNumber: number) => {
    setPageNum(pageNumber);
  };

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
            displayPosts={displayPosts}
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
              {displayedPosts.map((post) => (
                <li key={post.shareId} className="w-[1035px] h-[225px] bg-gray-100 p-[33px] rounded-3xl cursor-pointer" onClick={() => handleViewPost(post.shareId)}>
                  <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-500">Likes: {post.like} | Views: {post.viewCnt}</p>
                </li>
              ))}
            </ul>
          </div>
          {/* 페이지네이션 UI */}
          <div className='mt-[20px] flex justify-center items-center'>
            <button className="mx-[10px]" disabled={pageNum === 1} onClick={() => handlePageClick(pageNum - 1)}>이전</button>
            {pageNumbers.map((pageNumber) => (
              <span
                key={pageNumber}
                className={`mx-[10px] cursor-pointer ${pageNum === pageNumber && 'font-bold'}`}
                onClick={() => handlePageClick(pageNumber)}
              >
                {pageNumber}
              </span>
            ))}
            <button className="mx-[10px]" disabled={pageNum === pageCount} onClick={() => handlePageClick(pageNum + 1)}>다음</button>
          </div>
        </div>
      </div>
    </Container>
  );
}