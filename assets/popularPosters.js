
// this constant is what will be changed in index.html
const homeScreenbg = document.getElementById('movies')

const suggestedMovie = document.getElementById('suggestedMovie')

//key must be set as a const, base urls for whatever information is needed should be placed below

const config = {
  api_key: '8bb7ff26c787b44f4d7c77a6ef8dfb70',
  api_base_url: 'https://api.themoviedb.org/3/',
  image_base_url: 'https://image.tmdb.org/t/p/w185'
}

const BASE_URL = config.api_base_url
const API_KEY = config.api_key

//takes the first page of currently popular movies
//chooses randomly from the first 12 pages of popular movies, displays one poster at a time, any more than 12 pages begins to have longer load times

let randomPopularPage = Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12)
randomPopularPage = [Math.floor(Math.random() * randomPopularPage.length + 1)];

export async function currentPopular(page = randomPopularPage) {
  let data = []
  try {
    const response = await fetch(`${BASE_URL}movie/popular?api_key=${API_KEY}&page=${page}`)
    const responseData = await response.json()
    data = responseData?.results
  } catch (error) {

  }
  return data
}

//takes a single movie from the list and returns a single img to the div

export async function presentPosters() {
  const movies = await currentPopular()
  console.log(homeScreenbg)
  homeScreenbg.innerHTML = movies?.map((movie) => singlePoster(movie)).join("")

// movie suggestion is also taken from popular movies, a movie is randomly selected from the 12 movies that are loaded every time

  suggestedMovie.innerHTML = movies?.map((movie) => singleMovsuggestion(movie))[randomPopularPage]
  console.log(suggestedMovie)
}

function singlePoster(movie) {
  return (
    `
            <img src="${config.image_base_url + movie?.poster_path}" id="posterBack" class="img-fluid">
        `
        
  )

//returns a single image for the suggestion, but with a different div than the background posters, this image can have it's own animations/effects

}
function singleMovsuggestion(movie) {
  return (
    `
            <img src="${config.image_base_url + movie?.poster_path}" id="suggestionPoster" class="img-fluid">
        `

  )

}

//this will run when the page is loaded

function App() {
  presentPosters()
}
App()