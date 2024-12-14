import ShowCard from "./UI/ShowCard";
import Carousel from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useNavigate } from "react-router-dom";

const Slider = ({showType, id, name, shows}) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    if(id){
      navigate(`/${showType}/${id}?page=1`);
    }
    else{
      navigate(`/${showType}`);
    }
  }

  const responsive = [
    {
      breakpoint:2048,
      settings: {
        slidesToShow:5,
        slidesToScroll:5,
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      }
    },
    {
      breakpoint: 930,
      settings: {
        arrows:false,
        slidesToShow: 3,
        slidesToScroll:3,
      }
    },
    {
      breakpoint: 768,
      settings: {
        arrows:false,
        slidesToShow: 2.4,
        slidesToScroll:2,
      }
    },
  ]
  
  return (
    <div className="mt-4 mb-12">
      <div className="w-full flex justify-between items-center my-2 px-2 md:px-4">
        <h1 className="text-coolWhite font-medium text-2xl">{name.toUpperCase()}</h1>
        <h4 onClick = {clickHandler} className ="text-yellow-500 font-medium text-sm md:text-lg cursor-pointer">View More</h4>
      </div>
      <Carousel responsive = {responsive} >
        {shows.map((show) => {
          show.imgSrc = show.poster_path ? "https://image.tmdb.org/t/p/w500" + show.poster_path : "/images/default.png";
          return (
            <ShowCard
              key={show.id}
              title={show.title || show.name}
              thumbnail={show.imgSrc}
              id = {show.id}
              media_type={showType}
            />
          );
        })}
      </Carousel>
    </div>
  );
};

export default Slider;
