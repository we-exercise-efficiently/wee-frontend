import Container from "../components/Container";
import AiRecommand from "../components/Home/AiRecommand";
import AnnounceRoutine from "../components/Home/AnnounceRoutine";
import CommunityRecommand from "../components/Home/CommunityRecommand";
import TodayTips from "../components/Home/TodayTips";
import YoutubeLinks from "../components/Home/YoutubeLinks";
import MainSlider from "../components/Sliders/MainSlider";

/**
 * LJM 2024.01.08
 * @returns 메인페이지
 */
export default function Home() {
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
      <AnnounceRoutine />
    </Container>
  );
}
