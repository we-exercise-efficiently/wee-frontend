import { useEffect, useState } from "react";
import Container from "../components/Container";
import AiRecommand from "../components/Home/AiRecommand";
import CommunityRecommand from "../components/Home/CommunityRecommand";
import TodayTips from "../components/Home/TodayTips";
import YoutubeLinks from "../components/Home/YoutubeLinks";
import MainSlider from "../components/Sliders/MainSlider";
import AnnounceRoutineDefault from "../components/Home/AnnounceRoutine/AnnounceRoutineDefault";
import AnnounceRoutine from "../components/Home/AnnounceRoutine/AnnounceRoutine";

/**
 * LJM 2024.01.08
 * @returns 메인페이지
 */
export default function Home() {
  // 추후 zustand 연결 시 loggedIn 으로 global logic 화 할 예정
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  useEffect(() => {}, []);

  return (
    <Container>
      <MainSlider />

      {/* Youtube Links */}
      <YoutubeLinks />

      {/* AI Recommanded */}
      <AiRecommand />

      {/* Community Recommanded */}
      <CommunityRecommand />

      {/* Today Tip */}
      <TodayTips />

      {/* Announce Routine */}
      {isLoggedIn ? <AnnounceRoutine /> : <AnnounceRoutineDefault />}
    </Container>
  );
}
