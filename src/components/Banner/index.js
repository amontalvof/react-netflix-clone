import React, { useEffect, useState } from "react";
import axios from "../../helpers/axiosHelper";
import requests from "../..//helpers/requests";
import "./Banner.css";

const image_base_url = "https://image.tmdb.org/t/p/original/";

const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
};

function Banner() {
    const [movie, setMovie] = useState();

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            const randomMovie =
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                ];
            setMovie(randomMovie);
            return request;
        }
        fetchData();
    }, []);

    return (
        <header
            className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url(${image_base_url}${movie?.backdrop_path})`,
                backgroundPosition: "center center",
            }}
        >
            <div className="banner_contents">
                <h1 className="banner_title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="banner_buttons">
                    <button className="banner_button">Play</button>
                    <button className="banner_button">My List</button>
                </div>
                <h1 className="banner_description">
                    {truncate(movie?.overview, 150)}
                </h1>
            </div>
            <div className="banner_fadeBottom" />
        </header>
    );
}

export default Banner;
