import Theater from "../Theater";
import Carousel from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarouselSection = ({ shows }) => {  

  return (
    <Carousel 
      autoplay = {true}
      arrows = {false}
      infinite = {true}
      pauseOnHover = {false}
      autoplaySpeed={4000}
      speed = {800}
    >
      {shows.map((show) => 
        <Theater key={show.id} show={show} />
      )}
    </Carousel>
  );
};

export default CarouselSection;
