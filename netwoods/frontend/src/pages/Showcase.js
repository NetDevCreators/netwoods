import { useLoaderData, useSearchParams, json, useNavigate,useParams} from "react-router-dom";
import ShowCard from "../components/UI/ShowCard";
import { LeftIcon, RightIcon } from "../components/Icons";
import { GenreMap } from "../utils/genre_map";
import BACKEND from "../utils/backend_url";

const ShowCasePage = ({ pageName }) => {
    const [searchParams] = useSearchParams();
    const params = useParams();

    const navigate = useNavigate();
    const data = useLoaderData();

    const searchValue = searchParams.get('value');
    const genreId = params.genreId;

    const currentPage = parseInt(data.page);
    const totalPages = parseInt(data.total_pages)

    let pageUrl = `/search/?value=${searchValue}&page=`;

    if(genreId){
        pageUrl = `/${pageName}/${genreId}?page=`; 
    }

    let headingText = "Movies";

    if(pageName === "search"){
        headingText = "Showing results for " + searchValue.charAt(0).toUpperCase() + searchValue.slice(1);
    }
    else if(pageName === "movie" || pageName === "tv"){
        if(genreId === "bollywood"){
            headingText = "Bollywood " + (pageName === "movie" ? "Movies" : "Series");
        }
        else{
            headingText = GenreMap.get(parseInt(genreId));
        }
    }

    const prevPageHandler = () => {
        if(currentPage - 1 > 0){
            navigate(pageUrl + (currentPage - 1));
        }
    }

    const nextPageHandler = () => {
        if(currentPage + 1 <= totalPages){
            navigate(pageUrl + (currentPage + 1));
        }
    }

    return (
        <div className="w-full p-4">
            <h1 className="text-3xl md:text-4xl text-coolWhite mt-24 mb-16">{headingText}</h1>
            <div className="grid grid-cols-2 gap-y-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-y-12 place-items-center my-16">
                {
                    data.results.map(show => {
                        show.imgSrc = show.poster_path ? "https://image.tmdb.org/t/p/w500" + show.poster_path : "/images/default.png";
                        return (
                        show.media_type!=="person" && <ShowCard
                            key={show.id}
                            title={show.title || show.name}
                            thumbnail={show.imgSrc}
                            id = {show.id}
                            media_type={show.media_type || pageName}
                          />
                        )
                    })
                }
            </div>

            <div className="w-2/3 md:w-1/3 flex items-center justify-between text-coolWhite mx-auto text-xl my-16">
                <span onClick = {prevPageHandler} className="w-12 h-12 flex justify-center items-center bg-coolWhite rounded-full text-coolBlack cursor-pointer"> <LeftIcon/> </span>
                <div className="w-[4rem] flex justify-around items-center">
                    <span className="font-bold text-xl">{currentPage}</span>
                    <span> / </span>
                    <span className="text-sm">{totalPages}</span>
                </div>
                <span onClick = {nextPageHandler} className="w-12 h-12 flex justify-center items-center bg-coolWhite rounded-full text-coolBlack cursor-pointer"> <RightIcon/> </span>
            </div>
        </div>

    );
}

export default ShowCasePage;

export async function loader({request,params}){
    try{
        const searchParams = new URL(request.url).searchParams;
        const searchValue = searchParams.get('value');
        const pageNumber = searchParams.get('page');
        const genreId = params.genreId;
        const pageName = request.url.split('/')[3];

        let url = `${BACKEND}search?value=${searchValue}&page=${pageNumber}`;

        if(genreId){
            url = `${BACKEND}show?type=${pageName}&genre_id=${genreId}&page=${pageNumber}`;
        }

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