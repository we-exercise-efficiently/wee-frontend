import { useNavigate } from "react-router-dom";

/**
 * navgation 을 쓸 때 스크롤을 초기화 하는 함수
 *
 * @returns 스크롤 리셋하는 함수
 */
export default function useScrollReset() {
  const nav = useNavigate();

  const resetScrollAndNavigate = (destination: string) => {
    window.scrollTo(0, 0); // 스크롤 리셋
    nav(destination); // 페이지 이동
  };

  return resetScrollAndNavigate;
}
