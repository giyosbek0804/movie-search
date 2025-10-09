import "./App.css";
const API_KEY = "7b1fa591053be3c5e1add32a904585e5";
import React, { useEffect, useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [activeId, setActiveId] = useState(null);
  const [trailer, setTrailer] = useState(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjFmYTU5MTA1M2JlM2M1ZTFhZGQzMmE5MDQ1ODVlNSIsIm5iZiI6MTc1OTU2Mjg3MC4yODYsInN1YiI6IjY4ZTBjYzc2ZjU5MTJmNjk1ODljYTFkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r3Xx6EptdM6Q6V_xImb-UESw3ecARsTPq70zAUEdQM0",
    },
  };

  useEffect(() => {
    const endpoint = query.trim()
      ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          query
        )}&include_adult=false&language=en-US&page=${page}`
      : `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`;

    fetch(endpoint, options)
      .then((res) => res.json())
      .then((res) => {
        setMovies(res.results);
        setTotalPages(res.total_pages);
      })
      .catch((err) => console.error(err));
  }, [page, query]); // refetch when either page or query changes

  async function handleSearch(e) {
    e.preventDefault();
    const cleanUp = query.trim();
    if (!cleanUp) return;

    setPage(1); // reset to page 1
  }
  function pageSwitch(direction) {
    setPage((prev) => {
      if (direction === "next") return Math.min(prev + 1, totalPages);

      if (direction === "prev") return Math.max(1, prev - 1);
      return prev;
    });
  }


async function getTrailer(movieId) {
  if (activeId === movieId) {
    // clicking again hides trailer
    setActiveId(null);
    setTrailer(null);
    return;
  }

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
  );
  const data = await res.json();

  const trailer = data.results.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );

  setTrailer(trailer);
  setActiveId(movieId);
}

  return (
    <>
      <section className="relative">
        <nav className="px-[calc(2rem+2vw)] py-[calc(.8rem+.8vw)] flex items-center justify-between w-full">
          <p>Free Movie</p>
          <div className="hamburger  text-white capitalize">testing only</div>
        </nav>
        <div className=" text-center text-[clamp(1rem,1.6vw,4rem)] capitalize py-[calc(1rem+1vw)]">
          <h1>movie platform</h1>
        </div>
        <div>
          <form
            onSubmit={handleSearch}
            className="flex   items-stretch bg-white text-black justify-center border rounded-3xl w-fit m-auto py-1 pr-2 "
          >
            <input
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="text-[clamp(1rem,1,3vw,2rem)] px-2 pl-[calc(.5rem+.5vw)] py-2 outline-0 w-[min(65vw,calc(15rem+10vw))]"
            />
            <button
              type="submit"
              className="px-4  rounded-3xl text-white bg-black"
            >
              Search
            </button>
          </form>
          {/* movie places */}
          <div className="py-[calc(2rem+1vw)]">
            <div className="flex flex-col items-center w-full justify-center ">
              {movies.length === 0 ? (
                <p>loading...</p>
              ) : (
                <div className="grid-cols-2   sm:grid-cols-2 bg:gap-10 lg:gap-10 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6   w-[96%]  px-[2%]  grid gap-4  md:p-6 ">
                  {movies.map((movie) => (
                    <div
                      onClick={() => getTrailer(movie.id)}
                      key={movie.id}
                      className="border  hover:shadow-2xl hover:scale-[1.05] duration-500 shadow-gray-800 rounded-2xl overflow-hidden w-full  flex flex-col"
                    >
                      {/* IMAGE PART */}
                      <div className="w-full h-fit relative img-part">
                        {activeId === movie.id && trailer ? (
                          <iframe
                            width="100%"
                            height="315"
                            src={`https://www.youtube.com/embed/${trailer.key}`}
                            title={trailer.name}
                            allowFullScreen
                            className="rounded-xl"
                          ></iframe>
                        ) : (
                          <img
                            onClick={() => console.log(movie.title)}
                            loading="lazy"
                            className="object-cover h-fit w-fit  aspect-5/8 border "
                            src={
                              movie.poster_path
                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                : "/images/cover.webp"
                            }
                            alt={movie.title}
                          />
                        )}

                        <p className="absolute top-5 right-5 rounded-[5px] border py-1 px-2 bg-blurry gap-2">
                          <span className="text-[clamp(.9rem,.9vw,1.1rem)]">
                            {movie.vote_count}{" "}
                          </span>
                          <i className="fa-solid fa-eye"></i>
                        </p>
                      </div>

                      {/* TEXT PART */}
                      <div className="h-fit px-4 py-3 flex flex-col justify-between  ">
                        <p className="font-semibold line-clamp-2 text-[clamp(.9rem,1vw,1.2rem)]">
                          <abbr
                            title={movie.title}
                            className="no-underline cursor-help"
                          >
                            {movie.title}
                          </abbr>
                        </p>
                        <p className="text-gray-400 text-sm">
                          Release date:{" "}
                          {movie.release_date
                            ? movie.release_date.slice(0, 4)
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* page control */}
              <div className="flex items-center gap-4 py-12">
                <button
                  className="border p-2 shadow rounded"
                  onClick={() => pageSwitch("prev")}
                >
                  prev
                </button>
                <span>{page}</span>
                <button
                  id="nextBtn"
                  className="border p-2 shadow rounded"
                  onClick={() => pageSwitch("next")}
                >
                  next
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
