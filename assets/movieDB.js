
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
  // console.log(config.api_base_url + movie.original_title)
  return (
    `
            <img src="${config.image_base_url + movie?.poster_path}" id="suggestionPoster" class="img-fluid">
            <div id="" style="font-size: 24px">${movie.original_title}</div>
            <div id="" style="font-size: 24px">${movie.release_date}</div>
        `

  )

}
document.querySelector('form.form').addEventListener('submit', function (e) {
  e.preventDefault();
  let x = document.querySelector('form.form').elements;
  console.log("movieUserInput: ", x['movieInput'].value);
  const userMovieinput = (x['movieInput'].value);
  document.getElementById('movieSearchbar').reset();
  
  
  var movieMultisearch = "https://api.themoviedb.org/3/search/movie?api_key=8bb7ff26c787b44f4d7c77a6ef8dfb70&language=en-US&page=1&include_adult=false&query=" + userMovieinput
  const movieRecbox1 = document.getElementById('movieRec1')
  const movieRecbox2 = document.getElementById('movieRec2')
  const movieRecbox3 = document.getElementById('movieRec3')
  const movieRecbox4 = document.getElementById('movieRec4')
  const movieRecbox5 = document.getElementById('movieRec5')
  fetch(movieMultisearch)
    .then(
      (response) => {
        if (response.status !== 200) {
          console.log("looks like there was a problem")
          return
        }
        response.json().then(function (data) {
          movieRecbox1.innerHTML = 
        `
        <img src="${config.image_base_url + data.results[0].backdrop_path}" id="userMovieposter1" class="img-fluid">
        <div id="userMovieoptions1" style="font-size: 24px">${data.results[0].original_title}</div>
        <div id="userMovieoptions1date" style="font-size: 10px">${data.results[0].release_date}</div>
        `
          movieRecbox2.innerHTML =
            `
        <img src="${config.image_base_url + data.results[1].backdrop_path}" id="userMovieposter2" class="img-fluid">
        <div id="userMovieoptions2" style="font-size: 24px">${data.results[1].original_title}</div>
        <div id="userMovieoptions2date" style="font-size: 10px">${data.results[1].release_date}</div>
        `
          movieRecbox3.innerHTML =
            `
        <img src="${config.image_base_url + data.results[2].backdrop_path}" id="userMovieposter3" class="img-fluid">
        <div id="userMovieoptions3" style="font-size: 24px">${data.results[2].original_title}</div>
        <div id="userMovieoptions3date" style="font-size: 10px">${data.results[2].release_date}</div>
        `
          movieRecbox4.innerHTML =
            `
        <img src="${config.image_base_url + data.results[3].backdrop_path}" id="userMovieposter4" class="img-fluid">
        <div id="userMovieoptions4" style="font-size: 24px">${data.results[3].original_title}</div>
        <div id="userMovieoptions4date" style="font-size: 10px">${data.results[3].release_date}</div>
        `
          movieRecbox5.innerHTML =
            `
        <img src="${config.image_base_url + data.results[4].backdrop_path}" id="userMovieposter5" class="img-fluid">
        <div id="userMovieoptions5" style="font-size: 24px">${data.results[4].original_title}</div>
        <div id="userMovieoptions5date" style="font-size: 10px">${data.results[4].release_date}</div>
        `
        console.log(data.results)
          console.log(data.results[0].original_title)
          console.log(data.results[1].original_title)
        })
      }
    )
    .catch(function (err) {
      console.log("fetch error," + err);
    });
});


//this will run when the page is loaded
function App() {
  presentPosters()
}
App()