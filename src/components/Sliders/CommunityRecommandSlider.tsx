import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/**
 * LJM 2024.01.08
 * @returns 커뮤니티 추천 슬라이더
 */
export default function CommunityRecommandSlider() {
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 2.5,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
  };
  return (
    <div className="hidden sm:inline-block">
      <Slider {...settings}>
        <div className="p-4">
          <div className="bg-slate-300 h-52 w-auto rounded-xl ml-12">
            <h3>1</h3>
          </div>
        </div>

        <div className="p-4">
          <div className="bg-slate-300 h-52 w-auto rounded-xl">
            <h3>2</h3>
          </div>
        </div>

        <div className="p-4">
          <div className="bg-slate-300 h-52 w-auto rounded-xl">
            <h3>3</h3>
          </div>
        </div>

        <div className="p-4">
          <div className="bg-slate-300 h-52 w-auto rounded-xl">
            <h3>4</h3>
          </div>
        </div>

        <div className="p-4">
          <div className="bg-slate-300 h-52 w-auto rounded-xl">
            <h3>5</h3>
          </div>
        </div>

        <div className="p-4">
          <div className="bg-slate-300 h-52 w-auto rounded-xl mr-12">
            <h3>6</h3>
          </div>
        </div>
      </Slider>
    </div>
  );
}
