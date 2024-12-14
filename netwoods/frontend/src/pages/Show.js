import { useEffect, useState } from "react";
import EpisodeCard from "../components/UI/EpisodeCard"
import { PlayIcon } from "../components/Icons";
import DropDown from "../components/UI/DropDown";

import { json , useLoaderData, redirect} from "react-router-dom";
import SkeletonEpisodeCards from "../components/UI/SkeletonEpisodeCards";
import StreamPage from "../components/Stream";
import BACKEND from "../utils/backend_url";

const ShowPage = () => {
    const [currentSeason,setCurrentSeason] = useState({});
    const [loadingSeason,setLoadingSeason] = useState(true);
    
    const show = useLoaderData();
    const initialIndex = show.seasons && show.seasons.length > 0 && show.seasons[0].season_number === 1 ? 0 : 1;

    const [seasonIdx,setSeasonIdx] = useState(initialIndex);

    const [currentlyPlaying,setCurrentlyPlaying] = useState({});

    const showType = show.seasons ? "tv" : "movie";

    const servers = [
        {name : "Server 1",url : "https://vidsrc.xyz/embed/"},
        {name : "Server 2",url : "https://vidsrc.pro/embed/"},
        {name : "Server 3", url : "https://multiembed.mov/?tmdb=1"}, 
    ];

    const [serverIdx,setServerIdx] = useState(0);
  
    useEffect(() => {
        if(showType === "movie"){
            return ;
        }

        fetch(`${BACKEND}show/${show.id}/${show.seasons[seasonIdx].season_number}`)
        .then(response => {
            if(!response.ok){
                if(seasonIdx + 1 < show.seasons.length){
                    setSeasonIdx(seasonIdx + 1);
                }
                else{
                    redirect("/");
                }
            }

            return response.json();
        })
        .then(responseData => {
            setLoadingSeason(false);
            setCurrentSeason(responseData);
        });
    },[seasonIdx,show.id,show.seasons,showType]);

    show.imgSrc = show.backdrop_path ? "https://image.tmdb.org/t/p/original" + show.backdrop_path : "/images/default.png";

    const watchHandler = (episodeIdx) => {
        let season_number = -1, episode_number = -1;

        if(showType === "tv"){
            season_number = 1
            episode_number = 1
        }

        if(episodeIdx >= 0){
            season_number = currentSeason.season_number;
            episode_number = currentSeason.episodes[episodeIdx].episode_number;
        }

        window.scrollTo({top:0,behavior:"smooth"});

        setCurrentlyPlaying(prevState => (
            {
            season_number : season_number,
            episode_number : episode_number,
            })
        );
    }

    const serverHandler = (idx) => {
        setServerIdx(idx);
    }

    const seasonHandler = (idx) => {
        if(idx !== seasonIdx){
            setLoadingSeason(true);
            setSeasonIdx(idx);
        }
    }
 
    return (
        <div className = "w-full py-16 px-4 md:px-8">
            <div className="w-full flex justify-center">
            <DropDown selectedIndex = {serverIdx} selectables = {servers} onClick = {serverHandler}/>
            </div>
            
            {   
                currentlyPlaying.episode_number
                ?
                    <StreamPage showType = {showType} showId = {show.id} season = {currentlyPlaying.season_number} episode = {currentlyPlaying.episode_number} server = {servers[serverIdx]}/>
                :
                    <div className="w-full h-[28rem] md:w-5/6 md:h-[32rem] mx-auto text-sm md:text-base relative">
                    <img src = {show.imgSrc} alt = {show.title} className="w-full h-full object-cover brightness-50"/>
                        <button onClick = {() => watchHandler(-1)} className="w-16 h-16 rounded-full bg-coolRed flex justify-center items-center absolute top-0 bottom-0 left-0 right-0 m-auto">
                            <PlayIcon/>
                        </button>
                    </div>
               
            }
            
            <div className="w-full flex flex-col md:flex-row md:justify-between my-6">
                <div className = "w-full md:w-2/3 mb-8">
                    <h1 className="text-3xl md:text-5xl text-coolWhite font-bold my-4">{show.title || show.name}</h1>
                    <div className="w-full flex flex-wrap">
                    {show.genres.map(
                            genre => <span key = {genre.id} className="font-bold text-white text-base mr-4 rounded-md">{"#" + genre.name}</span>
                    )}
                    </div>
                    <p className = "text-coolWhite md:w-2/3 my-4">{show.overview}</p>

                    <div>
                        <span className="text-coolWhite text-3xl font-semibold mr-2">{show.release_date ? show.release_date.substr(0,4) : show.first_air_date ? show.first_air_date.substr(0,4) : ""}</span> 
                        <span className="text-coolWhite text-3xl mx-2 font-semibold">{show.origin_country}</span>
                        <span className="text-coolWhite text-3xl mx-2 font-semibold">{show.original_language}</span>
                    </div>

                    <div className="flex items-center my-4">
                        {show.runtime > 0 && <h1 className="text-coolWhite text-lg font-bold mr-4">{Math.floor(show.runtime/60)}h {show.runtime%60}m</h1>}
                        <div className="w-14 h-14 rounded-full border-4 border-green-500 flex justify-center items-center">
                            <span className="text-green-500">{show.vote_average.toFixed(2)}</span>
                        </div>
                    </div>

                </div>
                <div className="h-[30rem] md:h-[40vw]">
                    <img src = {show.poster_path ? "https://image.tmdb.org/t/p/w500/" + show.poster_path : "/images/default.png"} alt = {show.title} className="w-full h-full object-cover"/>
                </div>
            </div>
            {   
                showType === "tv" 
                &&
                <div className = "w-full md:w-5/6 mx-auto flex flex-col items-center">
                    
                    <DropDown selectedIndex = {seasonIdx} selectables={show.seasons} onClick={seasonHandler}/>

                    {loadingSeason && <SkeletonEpisodeCards/>}
                    {!loadingSeason && currentSeason.episodes && currentSeason.episodes.map((episode,idx) => <EpisodeCard key = {episode.id} onClick = {() => watchHandler(idx)} episode={episode} selected = {currentSeason.season_number === currentlyPlaying.season_number && episode.episode_number === currentlyPlaying.episode_number}/>)}

                </div>
            }
        </div>
    );
}

export default ShowPage;


export async function loader({request,params}){
    try{
        const searchParams = new URL(request.url).searchParams;
        const showType = searchParams.get('type');

        let url = BACKEND + "show/" + params.showId + "?type=" + showType;

        const response = await fetch(url);

        const responseData = await response.json();

        if(!response.ok){
            throw json({message : responseData.message},{status : response.status});
        }
        
        return json(responseData,{status:200});
    }catch (errors) {
        throw json({message : "Could not fetch at this moment please check your internet connection"},{status : 500});
    }
}
