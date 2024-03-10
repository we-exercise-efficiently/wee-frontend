import React from 'react';
import Search from '../assets/Community/search.svg';

// interface Post {
//   id: number;
//   title: string;
//   writer: string;
//   like: number;
//   cnt: number;
//   date: string;
// }
interface IPost {
  crewId: number;
  shareId: number;
  questionId : number;
  userId: number;
  title: string;
  content: string;
  likes: number;
  createDate: string;
  hit: number;
  commentCnt: number;
  period: string;
  location: string;
  type: string;
  headCount: number;
  crewStatus: string;
  answerStatus: string;
  shareStatus: string;
  comments: Array<IComment>;
}

interface IComment {
  id: number;
  date: string;
  author: string;
  content: string;
}

interface Props {
  setSearchTerm: (term: string) => void;
  // posts: Post[];
  displayPosts: IPost[];
  // handleViewPost: (postId: number) => void;
  handleSortChange: (sortBy: string) => void;
  handlePostCountChange: (count: number) => void;
  postCount: number;
  sortBy: string;
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  searchTerm: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchIconClick: () => void;
}

const PostList: React.FC<Props> = ({ 
  searchTerm,
  handleSearchChange, 
  //setSearchTerm,
  // posts,
  handleSearchIconClick,
  // displayPosts, 
  // handleViewPost, 
  handleSortChange, 
  handlePostCountChange, 
  postCount, 
  sortBy, 
  toggle, 
  setToggle 
}) => {
  return (
    <div className="mx-auto">
        {/* 검색 창 */}
        <div className="sm:w-[500px] md:w-[700px] lg:w-[1034px] xl:w-full mb-[57px] h-[51px] border-b border-black flex justify-between items-center">
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
    </div>
  );
};

export default PostList;
