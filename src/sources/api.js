const API_KEY = "7b1fa591053be3c5e1add32a904585e5";
const BASE_URL = "https://api.themoviedb.org/3";

export function ApiCall(){
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjFmYTU5MTA1M2JlM2M1ZTFhZGQzMmE5MDQ1ODVlNSIsIm5iZiI6MTc1OTU2Mjg3MC4yODYsInN1YiI6IjY4ZTBjYzc2ZjU5MTJmNjk1ODljYTFkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r3Xx6EptdM6Q6V_xImb-UESw3ecARsTPq70zAUEdQM0'
        }
    };
    
    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.error(err));
}
