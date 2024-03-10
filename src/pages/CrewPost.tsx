import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Container from '../components/Container';
import SideBar from '../components/SideBar'; // SideBar 컴포넌트 import
import { getCrew } from '../apis/apis';
import handclapIcon from '../assets/Community/handclap.svg';

interface IPost {
  crewId: number;
  shareId: number;
  questionId: number;
  userId: number;
  title: string;
  content: string;
  likes: number;
  createDate: string;
  hit: number;
  image: string;
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
  
// interface Props {
//     handleWritePost: () => void;
//   }


export default function Post() {
    const navigate = useNavigate();
    const { crewId } = useParams();
    // 글쓰기 버튼 클릭 핸들러
    const handleWritePost = () => {
        // 글쓰기 페이지로 이동
        navigate('/community/crew/write');
    };

    const [post, setPosts] = useState<IPost | null>(null);
    const [comments, setComments] = useState<IComment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [liked, setLiked] = useState(false); // 좋아요 상태를 관리하는 상태 변수

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');

    const postDate = post?.createDate? new Date(post.createDate) : null;
    let formattedDate: string | null = null;
    if (postDate) {
      const y = postDate.getFullYear();
      const m = String(postDate.getMonth() + 1).padStart(2,'0');
      const d = String(postDate.getDate()).padStart(2,'0');
      const h = String(postDate.getHours()).padStart(2,'0');
      const min = String(postDate.getMinutes()).padStart(2,'0');
      formattedDate = `${y}-${m}-${d} ${h}:${min}`;
    }

    const handleCommentSubmit = () => {
        if (newComment.trim() === '') {
          return;
        }
        const newCommentObj: IComment = {
          id: comments.length + 1,
        //   date: `${String(currentDate.getFullYear())}-${String(currentDate.getMonth()+1).padStart(2,'0')}-${String(currentDate.getDate()).padStart(2,'0')} ${String(currentDate.getHours()).padStart(2,'0')}:${String(currentDate.getMinutes()).padStart(2,'0')}`,
          date: `${year}-${month}-${day} ${hours}:${minutes}`,
          author: '사용자', 
          content: newComment,
        };
        setComments([...comments, newCommentObj]);
        setNewComment('');
      };

    useEffect(() => {
        async function fetchData() {
          try {
            const crewData = await getCrew();
            console.log(crewData);
            const posts: IPost[] = crewData.content || [];
            const foundPost = posts.find((item: IPost) => item.crewId === Number(crewId));
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
      }, [crewId]);

    // // 게시글 목록을 외부 JSON 파일에서 가져옴
    // useEffect(() => {
    //     fetch('/src/examples/CrewExample.json') 
    //     .then(response => response.json())
    //     .then(data => {
    //         const foundPost = data.data.find((item: Post) => item.crewId === Number(crewId))
    //         if (foundPost) {
    //             setPosts(foundPost); // 가져온 데이터를 상태로 설정
    //         } else {
    //         console.error('Post not found:');
    //         }
    //     })
    //     .catch(error => {
    //         console.error('Error fetching posts:', error);
    //     });
    // }, [crewId]); // 컴포넌트가 마운트될 때 한 번만 실행

    // const post = {
    //     title: '게시글 제목',
    //     id: '닉네임',
    //     date: '2024.02.21',
    //     crewId: 123,
    //     content: '게시글 내용 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    //     likes: 10,
    //     views: 100,
    //     comments: [
    //         { id: 1, date: '2024.02.19', author: '사용자1', content: '댓글 내용 1' },
    //         { id: 2, date: '2024.02.21', author: '사용자2', content: '댓글 내용 2' },
    //     ]
    // };
    const handleLike = () => {
      if (post) {
        if (liked) {
          // 좋아요가 이미 눌려있는 경우, 좋아요를 취소합니다.
          setPosts({ ...post, likes: post.likes - 1 });
          setLiked(false); // 좋아요 상태를 변경합니다.
        } else {
          // 좋아요를 누른 경우, 좋아요를 추가합니다.
          setPosts({ ...post, likes: post.likes + 1 });
          setLiked(true); // 좋아요 상태를 변경합니다.
        }
      }
    };

    return(
        <Container>
        <div className="mx-auto flex ml-[96px] my-[77px]">
            {/* 왼쪽 영역 */}
            <SideBar handleWritePost={handleWritePost} />
              <div className="flex flex-col justify-start mr-[294px] ml-[80px] sm:w-[500px] md:w-[700px] lg:w-[1035px] xl:w-full">
                {post && (
                    <div className="px-[41px] py-[39px] w-full h-[655px] bg-gray-100 rounded-3xl">
                        <div>
                          <div className="flex justify-between">
                              <h1 className="text-[24px]">{post.title}</h1>
                              <div className="flex items-center justify-center">
                                <span className="text-[10px]">{post.likes}</span>
                                <button onClick={handleLike} className="ml-[10px]">
                                  <img src={handclapIcon} alt="handclap" className="w-[44px] h-[44px]" />
                                </button> 
                              </div>
                            </div>                              
                            <p className="my-[20px]">{post.userId} | {formattedDate} | 크루모집방</p>
                            <p className="text-[18px]">{post.content}</p>
                            <p className="my-[20px]">{post.period} | {post.location} | {post.type}</p>
                        </div>
                    </div>
                )}
                {post && (
                    <div className="mt-[42px] px-[41px] py-[23px] w-full h-[220px] border border-gray-700 rounded-3xl">
                        <div className="mt-[18px]">
                            <p className='mb-[15px] text-[16px]'>{post.userId}</p>
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