const axios = require("axios");
require("dotenv").config();

exports.getTrending = async (req, res, next) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${process.env.API_KEY}`
    );

    if (response.status !== 200) {
      return res.status(500).json({
        message: "Response taking too long, check internet connection.",
      });
    }

    return res.status(200).send(response.data);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Could not reach server, check internet connection." });
  }
};

exports.getTrendingMovies = async (req, res, next) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?page=1&api_key=${process.env.API_KEY}`
    );

    if (response.status !== 200) {
      return res.status(500).json({
        message:
          "Response of trending movies taking too long. Check your connection.",
      });
    }

    return res.status(200).send(response.data);
  } catch (error) {
    return res
      .status(500)
      .json({
        message:
          "Response of trending movies taking too long. Check your connection.",
      });
  }
};

exports.getTrendingSeries = async (req, res, next) => {
  try {
    const response = await axios.get(
     `https://api.themoviedb.org/3/tv/top_rated?page=1&api_key=${process.env.API_KEY}`
    );

    if (response.status !== 200) {
      return res.status(500).json({
        message:
          "Response of trending series taking too long. Check your connection.",
      });
    }

    return res.status(200).send(response.data);
  } catch (error) {
    return res
      .status(500)
      .json({
        message:
          "Response of trending series taking too long. Check your connection.",
      });
  }
};
