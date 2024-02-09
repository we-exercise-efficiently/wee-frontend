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
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');

  const posts: Post[] = [
    { id: 1, title: '게시물 1', likes: 10, views: 100, date: '2024-01-30' },
    // 다른 게시물들...
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

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

  return (
    <Container>
      <div className="mx-auto p-8">
        <div className="flex mb-4">
          <h2 className="font-bold text-red-700 text-3xl">COMMUNITY</h2>
          <div className="flex mt-2 space-x-2 ml-auto">
            <button
              onClick={() => handleSortChange('latest')}
              className={`px-4 py-2 border rounded ${sortBy === 'latest' ? 'font-bold' : ''}`}
            >
              최신순
            </button>
            <button
              onClick={() => handleSortChange('likes')}
              className={`px-4 py-2 border rounded ${sortBy === 'likes' ? 'font-bold' : ''}`}
            >
              좋아요순
            </button>
            <button
              onClick={() => handleSortChange('views')}
              className={`px-4 py-2 border rounded ${sortBy === 'views' ? 'font-bold' : ''}`}
            >
              조회수순
            </button>
          </div>
          <input
            type="text"
            placeholder="검색"
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-2 py-1 border border-gray-300 rounded ml-2"
          />
        </div>
      </div>

        {/* 글 목록 출력 */}
      <div className="mx-auto max-w-screen-lg mt-8">
        <div className="mt-10 border rounded p-4">
          <ul>
            {filteredPosts.sort(sortPosts(sortBy)).map((post) => (
              <li key={post.id} className="bg-white p-4 rounded-md shadow-md mb-4 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                </div>
                <div className="flex items-center">
                  <p className="text-gray-500 mr-2">Likes: {post.likes}</p>
                  <p className="text-gray-500">Views: {post.views}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
}
