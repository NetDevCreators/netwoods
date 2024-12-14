import { json, useLoaderData } from "react-router-dom";
import CarouselSection from "../components/UI/CarouselSection";
import Slider from "../components/Slider";
import BACKEND from "../utils/backend_url";

const HomePage = () => {
    const data = useLoaderData();
    const shows = data.trendingResponseData.results;
    const movies = data.movieResponseData.results;
    const series = data.seriesResponseData.results;
    const bollyMovies = data.bollyMovieResponseData.results;
    const bollySeries = data.bollySeriesResponseData.results;

    return (
        <>
        <CarouselSection shows = {shows}/>
        <Slider showType = "movie" name = "movies" shows = {movies}/>
        <Slider showType = "tv" name = "series" shows = {series}/>
        <Slider showType = "movie" id = "bollywood" name = "bollywood movies" shows = {bollyMovies}/>
        <Slider showType = "tv"  id = "bollywood" name = "bollywood series" shows = {bollySeries}/>
        </>
    )
}

export default HomePage;

export async function loader(request,params){
    try{
        const [trendingResponse,movieResponse,seriesResponse,bollyMovieResponse,bollySeriesResponse] = await Promise.all([
            fetch(BACKEND + "trending"),
            fetch(BACKEND + "trending/movies"),
            fetch(BACKEND + "trending/series"),
            fetch(BACKEND + "show?type=movie&genre_id=bollywood&page=1"),
            fetch(BACKEND + "show?type=tv&genre_id=bollywood&page=1"),
        ]);

        if(!trendingResponse.ok && !movieResponse.ok && !seriesResponse.ok){
            throw json({message : "Could not fetch the data from servers"},{status : 500});
        }

        const [trendingResponseData,movieResponseData,seriesResponseData,bollyMovieResponseData,bollySeriesResponseData] = await Promise.all([
            trendingResponse.json(),
            movieResponse.json(),
            seriesResponse.json(),
            bollyMovieResponse.json(),
            bollySeriesResponse.json(),
        ]);

        return json(
            {
                trendingResponseData:trendingResponseData,
                movieResponseData:movieResponseData,
                seriesResponseData:seriesResponseData,
                bollyMovieResponseData:bollyMovieResponseData,
                bollySeriesResponseData:bollySeriesResponseData,
        }, { status: 200 });

    } catch (errors) {
        console.log(errors);
        throw json({message : "Could not fetch at this moment please check your internet connection"},{status : 500});
    }
}
