const axios = require('axios');
require('dotenv').config();

exports.getSearch = async(req,res,next) => {
    try{
        const searchValue = req.query.value;
        const pageNumber = req.query.page;

        if(!searchValue){
            return res.status(400).json({message : "Please enter the valid search Text"});
        }

        const response = await axios.get(`https://api.themoviedb.org/3/search/multi?query=${searchValue}&page=${pageNumber}&api_key=${process.env.API_KEY}`);
        
        if(response.status !== 200){
            return res.status(500).json({message:"Could not fetch data at this moment"});
        }

        return res.status(200).send(response.data);

    } catch(error) {
        res.status(500).json({ message: "An error occurred while processing your request" });
    }
}