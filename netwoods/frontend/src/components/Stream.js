const StreamPage = ({showType,showId,season,episode,server}) => {
    let newUrl = server.url;

    if(server.name === "Server 1"){
        newUrl+=showType + "/" + showId;

        if(showType === "tv"){
            newUrl += "/" + season + "/" + episode;
        }
    }
    else if(server.name === "Server 2"){
        newUrl+=showType + "/" + showId;

        if(showType === "tv"){
            newUrl += "/" + season + "/" + episode;
        }
    }
    else if(server.name === "Server 3"){
        newUrl+="&video_id=" + showId;

        if(showType === "tv"){
            newUrl+="&s=" + season  + "&e=" + episode;
        }
    }

    return ( 
        <iframe id = "stream" src = {newUrl} allowFullScreen = {true} title = "streaming" className = "w-full h-[28rem] md:w-5/6 md:h-[32rem] mx-auto bg-black"/>
    )
}

export default StreamPage;