import { useState } from "react";
import Container from "../components/Container";
import AiRecommand from "../components/Home/AiRecommand";
import AnnounceRoutine from "../components/Home/AnnounceRoutine/AnnounceRoutine";
import CommunityRecommand from "../components/Home/CommunityRecommand";
import TodayTips from "../components/Home/TodayTips";
import YoutubeLinks from "../components/Home/YoutubeLinks";
import MainSlider from "../components/Sliders/MainSlider";
import AnnounceRoutineDefault from "../components/Home/AnnounceRoutine/AnnounceRoutineDefault";

/**
 * LJM 2024.01.08
 * @returns 메인페이지
 */
export default function Home() {
  const [hasData, setHasData] = useState<boolean>(false);

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
      {hasData ? (
        <AnnounceRoutine setHasData={setHasData} />
      ) : (
        <AnnounceRoutineDefault setHasData={setHasData} />
      )}
    </Container>
  );
}
