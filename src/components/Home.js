import React, { useEffect, useState } from "react";
import Card from "./Card";
import { server } from "../App";

export default function Home() {
  const searchmovietoken = window.localStorage.getItem("recentsearch");
  const [searchedmovie, searchForMovie] = useState(["bleach"]);
  const [movies, setMovies] = useState([]);
  const performMovieSearch = () => {
    // fetch(`${server}/movie/${searchedmovie}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.status === "error") {
    //       window.localStorage.setItem("recentsearch", "movienotfound");
    //     } else {
    //       setMovies(data);
    //       window.localStorage.setItem("recentsearch", "moviesearched");
    //     }
    //   });
  };

  useEffect(() => {
    fetch(`${server}/movies`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        window.localStorage.setItem("recentsearch", "displayallmovies");
      });
  }, []);
  return (
    <>
      <div className="input-group my-4 w-50 container">
        <input
          type="text"
          className="form-control"
          placeholder="Search For Movie"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onChange={(e) => searchForMovie(e.target.value)}
        />
        <div className="input-group-append">
          <button
            className="btn btn-submit btn-lg"
            onClick={performMovieSearch}
            type="button"
          >
            Search
          </button>
        </div>
      </div>
      <div>
        {(() => {
          if (searchmovietoken === "displayallmovies") {
            return (
              <>
                <div className="row top-rated">
                  <div className="block">
                    <h1 className="text-white">Top Rated</h1>
                    <p className="text-muted">
                      You never wanna miss one of these, right!?
                    </p>
                  </div>
                  <div className="slider">
                    {movies &&
                      movies.length > 0 &&
                      movies.map((movie) => {
                        let rating = (
                          parseFloat(movie.avg_rating)
                        )
                        return (
                          <Card
                            key={movie.id}
                            id={movie.id}
                            movieName={movie.movie_name}
                            rating={rating === "NaN" ? 0 : rating}
                            img={movie.poster_image}
                          />
                        );
                      })}
                  </div>
                </div>
                <div className="row new-releases">
                  <div className="block mt4">
                    <h1 className="text-white">New Releases</h1>
                    <p className="text-muted">
                      Really, You haven't watch these yet? Don't fall behind,
                      Let's binge tonight!
                    </p>
                  </div>
                  <div className="slider">
                    {movies &&
                      movies.length > 0 &&
                      movies.reverse().map((movie) => {
                        let rating = (
                          parseInt(movie.avg_rating) /
                          parseInt(movie.rating_counts)
                        )
                          .toString()
                          .substring(0, 3);
                        return (
                          <Card
                            key={movie.id}
                            id={movie.id}
                            movieName={movie.movie_name}
                            rating={rating === "NaN" ? 0 : rating}
                            img={movie.poster_image}
                          />
                        );
                      })}
                  </div>
                </div>
              </>
            );
          } else if (searchmovietoken === "moviesearched") {
            return (
              <div className="row top-rated">
                <div className="block mt4">
                  <h1 className="text-white">Search Result</h1>
                  <p className="text-muted">Result for Your Searched Movie</p>
                </div>
                <div className="slider">
                  {movies && movies.length > 0 && Array.isArray(movies) ? (
                    movies.map((movie) => {
                      let rating = (
                        parseInt(movie.avg_rating) /
                        parseInt(movie.rating_counts)
                      )
                        .toString()
                        .substring(0, 3);
                      return (
                        <Card
                          key={movie.id}
                          id={movie.id}
                          movieName={movie.movie_name}
                          rating={rating === "NaN" ? 0 : rating}
                          img={movie.poster_image}
                        />
                      );
                    })
                  ) : (
                    <p className="text-muted">No Movie Found..</p>
                  )}
                </div>
              </div>
            );
          }
        })()}
      </div>
    </>
  );
}
