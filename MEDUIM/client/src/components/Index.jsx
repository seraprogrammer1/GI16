import React, { useEffect } from "react";

export default function Index({ type }) {
  const [data, setData] = React.useState(null);

  function JsonDataList() {
    console.log(data);
    if (!data) {
      return <p>Loading...</p>;
    }

    if (data.error) {
      return <p>{data.error}</p>;
    }

    if (data.results.length === 0) {
      return <p>No movies found</p>;
    }

    function similarButton(movie_id) {
      console.log(movie_id);
      fetch(`/api/search/similar?movie_id=${movie_id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setData(data);
        })
        .catch((err) => console.error(err));
    }

    return (
      <>
        {data.results.map((movie, i) => {
          const title =
            movie.title && movie.title != "Undefined" ? movie.title : "N/A";
          const release = movie.release_date ? movie.release_date : "N/A";
          const rating = movie.vote_average ? movie.vote_average : "N/A";
          const vote_count = movie.vote_count ? movie.vote_count : "N/A";
          const NA = movie.overview ? "" : "textCenter";
          const overview = movie.overview ? movie.overview : "Overview: N/A";
          return (
            <div className="movie" key={i}>
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="movieImg"
                  alt="..."
                />
              ) : (
                <p className="movieImg">No image available</p>
              )}
              <div>
                <div className="movieInfo">
                  <h2 className="movieTitle">{title}</h2>
                  <p className="movieRelease">Release date: {release}</p>
                  <p className="movieRating">Rating: {rating}</p>
                  <p className="movieVoteCount">Votes: {vote_count}</p>
                  <button
                    onClick={() => {
                      similarButton(movie.id);
                    }}
                  >
                    Find Similar
                  </button>
                  <p className="movieOverview">{overview}</p>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  }

  function fetchMovies() {
    fetch(`/api/list?list_type=${type}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((err) => console.error(err));
  }

  function movieSearch(e) {
    fetch(`/api/search?title=${e.target.value}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <h1>Movie Search</h1>
      <main>
        <div>
          <div id="searchBarHolder">
            <label name="searchBar" className="hide"></label>
            <input
              id="searchBar"
              type="text"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value) {
                  movieSearch(e);
                }
              }}
            />
          </div>
          <div id="buttonHolder">
            <button
              className="movie-type"
              onClick={() => {
                window.location.href = "/popular";
              }}
            >
              Popular
            </button>
            <button
              className="movie-type"
              onClick={() => {
                window.location.href = "/top_rated";
              }}
            >
              Top Rated
            </button>
            <button
              className="movie-type"
              onClick={() => {
                window.location.href = "/upcoming";
              }}
            >
              Upcoming
            </button>
            <button
              className="movie-type"
              onClick={() => {
                window.location.href = "/now_playing";
              }}
            >
              Now Playing
            </button>
          </div>
          <div id="movieHolder">
            <JsonDataList />
          </div>
        </div>
      </main>
      <footer></footer>
      <script src="app.js"></script>
    </>
  );
}
