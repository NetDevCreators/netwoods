import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { PlayIcon } from "../Icons";

const ShowCard = ({thumbnail,title,id,media_type}) => {
  const [hovering, setHovering] = useState(false);

  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/show/" + id + "?type=" + media_type);
  }

  let customClass =
    "absolute bottom-0 py-2 font-bold px-1 w-full text-coolWhite my-auto text-sm md:text-lg text-center transition-all duration-500 ease-in-out";
  let customImgClass = "w-full h-full object-cover transition-all duration-500 ease-in-out";
  let customIconClass="w-12 h-12 md:h-16 md:w-16 bg-coolRed text-center flex justify-center items-center rounded-full absolute top-0 bottom-0 left-0 right-0 m-auto transition-all duration-500 ease-in-out"

  if (hovering) {
    customClass += " opacity-100";
    customImgClass += " brightness-50";
    customIconClass+=" opacity-100"
  } else {
    customClass += " opacity-0";
    customImgClass += " brightness-100";
    customIconClass+= " opacity-0";
  }

  return (
    <div
      onClick = {clickHandler}
      onMouseEnter={()=>setHovering(true)}
      onMouseLeave={()=> setHovering(false)}
      className="flex flex-col justify-between items-center relative border-2 border-dimWhite h-[26vh] w-[18vh] md:h-[352px] md:w-[232px] cursor-pointer"
    >
      <img src={thumbnail} alt="" className = {customImgClass} />
      <h2 className={customClass}>{title}</h2>
      <span className={customIconClass}><PlayIcon/></span>
    </div>
  );
};

export default ShowCard;
