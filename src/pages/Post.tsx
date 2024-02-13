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
        content: '게시글 내용 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        likes: 10,
        views: 100,
        comments: [
            { id: 1, author: '사용자1', content: '댓글 내용 1' },
            { id: 2, author: '사용자2', content: '댓글 내용 2' },
            // 필요한 만큼 댓글 추가
        ]
    };

    return(
        <Container>
        <div className="flex ml-[96px] mt-[77px]">
            {/* 왼쪽 영역 */}
            <SideBar handleWritePost={handleWritePost} />
                <div className="mr-[294px] ml-[80px]">
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <p>Likes: {post.likes}</p>
                    <p>Views: {post.views}</p>
                </div>
                <div>
                    <h3>댓글</h3>
                    <ul>
                        {post.comments.map(comment => (
                            <li key={comment.id}>
                                <strong>{comment.author}</strong>: {comment.content}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Container>
    );
}