import CommunityRecommandSlider from "../Sliders/CommunityRecommandSlider";

/**
 * LJM 2024.01.08
 * @returns 커뮤니티 추천 글 목록
 */
export default function CommunityRecommand() {
  return (
    <div className="mt-36 flex flex-col justify-start items-stretch bg-slate-100 py-14">
      <h2 className="mx-16 text-2xl font-bold">
        커뮤니티의 최신 인기글을 확인 해보세요
      </h2>
      <CommunityRecommandSlider />
    </div>
  );
}
