import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";

/**
 *
 * @returns 메인 페이지 슬라이더
 */
export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 3500,

    customPaging: () => <div className="custom-dot" />,
  };

  return (
    <div className="flex flex-col bg-amber-600">
      <Slider {...settings} dotsClass="slick-dots custom-dots">
        <div className="w-screen bg-themeDark h-96 text-white font-bold text-6xl">
          <div className="w-full h-full flex flex-col justify-center items-center">
            <h3>1</h3>
          </div>
        </div>
        <div className="w-screen bg-themeLime h-96 text-white font-bold text-6xl">
          <div className="w-full h-full flex flex-col justify-center items-center">
            <h3>2</h3>
          </div>
        </div>
        <div className="w-screen bg-themeDark h-96 text-white font-bold text-6xl">
          <div className="w-full h-full flex flex-col justify-center items-center">
            <h3>3</h3>
          </div>
        </div>
        <div className="w-screen bg-themeLime h-96 text-white font-bold text-6xl">
          <div className="w-full h-full flex flex-col justify-center items-center">
            <h3>4</h3>
          </div>
        </div>
      </Slider>
    </div>
  );
}
