import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Container from '../components/Container';
import SideBar from '../components/SideBar'; // SideBar 컴포넌트 import

interface Props {
    handleWritePost: () => void;
  }

export default function Post() {
    const navigate = useNavigate();
    const { postId } = useParams();
    // 글쓰기 버튼 클릭 핸들러
    const handleWritePost = () => {
        // 글쓰기 페이지로 이동
        navigate('/write');
    };

    const post = {
        title: '게시글 제목',
        id: '닉네임',
        date: '2024.02.21',
        crew: '크루 모집방',
        content: '게시글 내용 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        likes: 10,
        views: 100,
        comments: [
            { id: 1, date: '2024.02.19', author: '사용자1', content: '댓글 내용 1' },
            { id: 2, date: '2024.02.21', author: '사용자2', content: '댓글 내용 2' },
        ]
    };

    return(
        <Container>
        <div className="flex ml-[96px] my-[77px]">
            {/* 왼쪽 영역 */}
            <SideBar handleWritePost={handleWritePost} />
                <div className="flex flex-col justify-start mr-[294px] ml-[80px]">
                    <div className="px-[41px] py-[39px] w-[1191px] h-[655px] bg-gray-100 rounded-3xl">
                        <div>
                            <h1>{post.title}</h1>
                            <p className="my-[13px]">{post.id} | {post.date} | {post.crew}</p>
                            <p>{post.content}</p>
                        </div>
                    </div>
                    <div className="mt-[42px] px-[41px] py-[23px] w-[1191px] h-[220px] border border-gray-700 rounded-3xl">
                        <div className="mt-[18px]">
                            <p className='mb-[15px]'>{post.id}</p>
                            <textarea 
                                placeholder='댓글을 작성해주세요'
                                className="resize-none w-full h-[57px] placeholder-black"
                        />
                        </div>
                        <div className="flex justify-end">
                            <button className="flex justify-center items-center bg-gray-100 hover:bg-gray-300 text-gray-700 w-[131px] h-[48px] rounded-full">
                                등록
                            </button>
                        </div>
                    </div>
                    <div className='mt-[28px] mb-[60px]'>
                        <ul>
                           {post.comments.map(comment => (
                                <li key={comment.id}>
                                    <div className="my-[30px] px-[120px]">
                                        <strong>{comment.author}</strong>
                                        <p>{comment.date}</p> 
                                        <p className="my-[21px]">{comment.content}</p>
                                    </div>
                                    <div className="border border-gray-300 h-[1px]"></div>
                                </li>
                                
                            ))}
                        </ul>
                    </div>
                </div>
                
            </div>
        </Container>
    );
}