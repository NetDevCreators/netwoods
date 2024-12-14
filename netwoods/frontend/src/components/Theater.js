import PlayButton from "./UI/PlayButton";
import { GenreMap } from "../utils/genre_map";
import { useNavigate } from "react-router-dom";

const Theater = ({show}) => {
    const navigate = useNavigate();
    show.imgSrc = show.backdrop_path ? "https://image.tmdb.org/t/p/original" + show.backdrop_path : "/images/default.png";

    const clickHandler = () => {
        navigate("show/" + show.id + "?type=" + show.media_type);
    }

    return (
        <div className="w-full h-[90vh] text-sm md:text-base bg-black relative">
            <img src = {show.imgSrc} alt = {show.title} className="w-full h-full object-cover brightness-50"/>
            <div className="text-coolWhite absolute left-[2rem] bottom-[6rem] w-[16rem] md:w-[40rem]">
                <h1 className="text-3xl md:text-5xl mb-4 text-coolWhite font-bold">{show.title || show.name}</h1>

                {show.genre_ids.map(
                    (genre_id) => <span key = {genre_id} className="font-bold text-dimWhite text-base mr-4 rounded-md">{"#" + GenreMap.get(genre_id)}</span>
                )}

                <p className = "my-4">{show.overview.substring(0,180) + "..."}</p>
                
                <PlayButton onClick={clickHandler}><span className="text-white">Play</span></PlayButton>
            </div>
        </div>
    )
}

export default Theater;