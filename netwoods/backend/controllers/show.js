const axios = require('axios');
require('dotenv').config();

exports.getShow = async(req,res,next) => {
    try{
        const showId = req.params.showId;
        const showType = req.query.type;
    
        const response = await axios.get(`https://api.themoviedb.org/3/${showType}/${showId}?api_key=${process.env.API_KEY}`);
    
        if(response.status !== 200){
            return res.status(500).json({message : "Response taking too long, check internet connection."})
        }

        return res.status(200).send(response.data);

    } catch(errors) {
        return res.status(500).send({message : "Could not connect to servers at this moment"});
    }
}

exports.getSeason = async(req,res,next) => {
    try{
        const showId = req.params.showId;
        const seasonIdx = req.params.seasonIdx;
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${showId}/season/${seasonIdx}?api_key=${process.env.API_KEY}`);

        if(response.status !== 200){
            return res.status(500).json({message : "Response taking too long, check internet connection."})
        }

        return res.status(200).send(response.data);

    } catch (errors) {
        return res.status(500).send({message : "Could not connect to servers at this moment"});
    } 
}

exports.getGenreShow = async(req,res,next) => {
    try{
        const showType = req.query.type;
        const genreId = req.query.genre_id;
        const pageNumber = req.query.page || 1;

        let url = `https://api.themoviedb.org/3/discover/${showType}?with_genres=${genreId}&page=${pageNumber}&api_key=${process.env.API_KEY}`;

        if(genreId === "bollywood"){
            url = `https://api.themoviedb.org/3/discover/${showType}?with_origin_country=IN&page=${pageNumber}&api_key=${process.env.API_KEY}`;
        }

        const response = await axios.get(url);

        if(response.status !== 200){
            return res.status(500).json({message : "Response taking too long, check internet connection."})
        }

        return res.status(200).send(response.data);

    } catch (errors) {
        return res.status(500).send({message : "Could not connect to servers at this moment"});
    } 
}