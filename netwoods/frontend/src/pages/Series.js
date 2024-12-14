import { json, useLoaderData } from "react-router-dom";
import { GenreMap } from "../utils/genre_map";
import Slider from "../components/Slider";
import BACKEND from "../utils/backend_url";

const SeriesPage = () => {
  const data = useLoaderData();
  
  return (
    <div>
      <h1 className="mt-20 mb-12 font-bold text-4xl text-coolWhite p-4">Series</h1>
      {
        data.map(genreShow => {
          const name = GenreMap.get(genreShow.genre_id);
          return <Slider key = {genreShow.genre_id} showType = "tv" id = {genreShow.genre_id} name = {name} shows = {genreShow.results}/>
        })
      }
    </div>
  );
};

export default SeriesPage;

export async function loader(){
  try{
    const genreIds = [10759,10749,35,10765,18,16];

    const appendedResponse = await Promise.all(
      genreIds.map(genre_id => fetch(`${BACKEND}show?type=tv&genre_id=${genre_id}&page=1`))
    );

    if(appendedResponse.forEach(res => !res.ok)){
      throw json({message: "Could not fetch the Series at this moment"},{status : 500});
    }

    const appendedResponseData = await Promise.all(
      appendedResponse.map(res => res.json())
    );

    for(let i=0;i<genreIds.length;i++){
      appendedResponseData[i].genre_id = genreIds[i];
    }

    return json(appendedResponseData,{status:200});

  }catch (errors) {
    throw json({message : "Could not fetch at this moment please check your internet connection"},{status : 500});
}
}
