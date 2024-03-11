import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CommunityRecommandBox from "../Home/CommunityRecommandBox";
import { Suspense } from "react";

/**
 * LJM 2024.01.08
 * @returns 커뮤니티 추천 슬라이더
 */
export default function CommunityRecommandSlider() {
  const settings = {
    dots: false,
    slidesToShow: 2.5,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    infinite: true,
  };
  return (
    <div className="hidden sm:inline-block">
      <Slider {...settings}>
        <div className="p-4">
          <div className="bg-white h-52 w-96 rounded-xl mx-10 cursor-pointer">
            <Suspense>
              <CommunityRecommandBox
                level={"lv9. 운동마스터"}
                id={"EZURNO"}
                post={`지난 달부터 정해둔 운동 계획을 따르고 있어요. 매일 아침 일찍 일어나
              스트레칭과 유산소 운동을 하고, 건강한 식습관을 유지하고 있어요ㅋㅋ
              맛굿 응애응애응애`}
              />
            </Suspense>
          </div>
        </div>
        <div className="p-4">
          <div className="bg-white h-52 w-96 rounded-xl mx-10 cursor-pointer">
            <Suspense>
              <CommunityRecommandBox
                level={"lv9. 운동마스터"}
                id={"EZURNO"}
                post={`지난 달부터 정해둔 운동 계획을 따르고 있어요. 매일 아침 일찍 일어나
              스트레칭과 유산소 운동을 하고, 건강한 식습관을 유지하고 있어요ㅋㅋ
              맛굿 응애응애응애`}
              />
            </Suspense>
          </div>
        </div>
        <div className="p-4">
          <div className="bg-white h-52 w-96 rounded-xl mx-10 cursor-pointer">
            <Suspense>
              <CommunityRecommandBox
                level={"lv9. 운동마스터"}
                id={"EZURNO"}
                post={`지난 달부터 정해둔 운동 계획을 따르고 있어요. 매일 아침 일찍 일어나
              스트레칭과 유산소 운동을 하고, 건강한 식습관을 유지하고 있어요ㅋㅋ
              맛굿 응애응애응애`}
              />
            </Suspense>
          </div>
        </div>
      </Slider>
    </div>
  );
}
