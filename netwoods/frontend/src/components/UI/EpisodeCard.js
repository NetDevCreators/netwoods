const EpisodeCard = ({onClick,episode,selected}) => {
  let imgSrc = episode.still_path ? "https://image.tmdb.org/t/p/w500/" + episode.still_path : "/images/default.png";

  return (
    <div onClick = {onClick} className={`flex flex-col md:flex-row w-full p-4 my-4 cursor-pointer ${!selected && "hover:bg-black"} ${selected && "bg-red-800"}`}>
      <div className="flex flex-col md:flex-row items-start md:items-center md:w-full">
        <img src={imgSrc} alt="episode" className="w-full md:w-64 object-cover rounded-lg"/>
        <div className="my-2 md:mx-6">
          {(episode.title || episode.name) && <h2 className="text-coolWhite font-medium mb-2"> {episode.episode_number + ". " + (episode.title || episode.name)}</h2>}
          {episode.overview && <p className="text-dimWhite text-sm hidden md:block">{episode.overview}</p>}
        </div>
      </div>
      {episode.overview && <p className={`text-sm md:hidden ${selected ? "text-coolWhite" : "text-dimWhite"}`}>{episode.overview}</p>}
    </div>
  );
};

export default EpisodeCard;
