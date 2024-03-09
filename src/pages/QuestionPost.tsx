import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Container from '../components/Container';
import SideBar from '../components/SideBar'; 
import { getQuestion } from '../apis/apis';
import handclapIcon from '../assets/Community/handclap.svg';

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

interface Comment {
    id: number;
    date: string;
    author: string;
    content: string;
  }
  

export default function Post() {
    const navigate = useNavigate();
    const { questionId } = useParams();
    // 글쓰기 버튼 클릭 핸들러
    const handleWritePost = () => {
        // 글쓰기 페이지로 이동
        navigate('/write');
    };

    const [post, setPosts] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [liked, setLiked] = useState(false); // 좋아요 상태를 관리하는 상태 변수
    
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 두 자리로 만듭니다.
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');

    const handleCommentSubmit = () => {
        if (newComment.trim() === '') {
          return;
        }
        const newCommentObj: Comment = {
          id: comments.length + 1,
          date: `${year}-${month}-${day} ${hours}:${minutes}`,
          author: '사용자', // 작성자 정보는 적절하게 가져와야 합니다.
          content: newComment,
        };
        setComments([...comments, newCommentObj]);
        setNewComment('');
      };

    useEffect(() => {
        async function fetchData() {
          try {
            const questionData = await getQuestion();
            const foundPost = questionData.find((item: Post) => item.questionId === Number(questionId));
            if (foundPost) {
              setPosts(foundPost);
            } else {
              console.error('Post not found');
            }
          } catch (error) {
            console.error('Error fetching posts:', error);
          }
        }
        fetchData();
      }, [questionId]);

      const handleLike = () => {
        if (post) {
          if (liked) {
            // 좋아요가 이미 눌려있는 경우, 좋아요를 취소합니다.
            setPosts({ ...post, like: post.like - 1 });
            setLiked(false); // 좋아요 상태를 변경합니다.
          } else {
            // 좋아요를 누른 경우, 좋아요를 추가합니다.
            setPosts({ ...post, like: post.like + 1 });
            setLiked(true); // 좋아요 상태를 변경합니다.
          }
        }
      };

    return(
        <Container>
        <div className="flex ml-[96px] my-[77px]">
            {/* 왼쪽 영역 */}
            <SideBar handleWritePost={handleWritePost} />
                <div className="flex flex-col justify-start mr-[294px] ml-[80px]">
                {post && (
                    <div className="px-[41px] py-[39px] w-[1191px] h-[655px] bg-gray-100 rounded-3xl">
                        <div>
                          <div className="flex justify-between">
                              <h1 className="text-[24px]">{post.title}</h1>
                              <div className="flex items-center justify-center">
                                <span className="text-[10px]">{post.like}</span>
                                <button onClick={handleLike} className="ml-[10px]">
                                  <img src={handclapIcon} alt="handclap" className="w-[44px] h-[44px]" />
                                </button> 
                              </div>
                            </div>                              
                            <p className="my-[20px]">{post.userId} | {post.createDate} | 운동 질문방</p>
                            <p className="text-[18px]">{post.contents}</p>
                        </div>
                    </div>
                )}
                {post && (
                    <div className="mt-[42px] px-[41px] py-[23px] w-[1191px] h-[220px] border border-gray-700 rounded-3xl">
                        <div className="mt-[18px]">
                            <p className='mb-[15px]'>{post.userId}</p>
                            <textarea 
                                placeholder='댓글을 작성해주세요'
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="resize-none w-full h-[57px] placeholder-black"
                        />
                        </div>
                        <div className="flex justify-end">
                            <button onClick={handleCommentSubmit} className="flex justify-center items-center bg-gray-100 hover:bg-gray-300 text-gray-700 w-[131px] h-[48px] rounded-full">
                                등록
                            </button>
                        </div>
                    </div>
                    )}
                    {comments && (
                    <div className='mt-[28px] mb-[60px]'>
                        <ul>
                           {comments.map(comment => (
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
                    )}
                </div>
                
            </div>
        </Container>
    );
}