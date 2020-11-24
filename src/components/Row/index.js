import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";
import axios from "../../helpers/axiosHelper";
import "./Row.css";

const image_base_url = "https://image.tmdb.org/t/p/original/";

const options = {
    height: "390",
    width: "100%",
    playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
    },
};

function Row(props) {
    const { title, fetchUrl, isLargeRow } = props;
    const [movies, setMovies] = useState([]);
    const [trailerURL, setTrailerURL] = useState("");

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const handleClick = (movie) => {
        console.log(movie.name);
        if (trailerURL) {
            setTrailerURL("");
        } else {
            movieTrailer(movie?.name || "")
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerURL(urlParams.get("v"));
                })
                .catch((error) => console.log(error));
        }
    };

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row_posters">
                {movies.map((movie) => (
                    <img
                        key={movie.id}
                        className={`row_poster ${
                            isLargeRow && "row_posterLarge"
                        }`}
                        src={`${image_base_url}${
                            isLargeRow ? movie.poster_path : movie.backdrop_path
                        }`}
                        alt={movie.name}
                        onClick={() => handleClick(movie)}
                    />
                ))}
            </div>
            {trailerURL && <Youtube videoId={trailerURL} opts={options} />}
        </div>
    );
}

export default Row;

Row.propTypes = {
    title: PropTypes.string,
    fetchUrl: PropTypes.string,
    isLargeRow: PropTypes.bool,
};

Row.defaultProps = {
    title: undefined,
    fetchUrl: undefined,
    isLargeRow: undefined,
};
