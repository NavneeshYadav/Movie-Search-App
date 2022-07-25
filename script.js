const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
    const moiveBox = document.querySelector("#movie-box")
const getMovies = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    showMovies(data)
}
getMovies(APIURL);
const showMovies = (data) => {
    moiveBox.innerHTML = "";
    data.results.forEach(
        (result) => {
            const imagePath = result.poster_path === null ? "image-missing.png" : IMGPATH + result.poster_path;
            const box = document.createElement("div")
            box.classList.add("container-fluid")
            box.innerHTML = `
            <div class="card mt-4 mx-auto" style="width: 18rem;">
            <img src="${imagePath}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title text-center">${result.original_title}</h5>
              <p class="text-center">⭐ Rating :- ${result.vote_average}</p>
              <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
       Overview
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      ${result.overview}
      </div>
    </div>
  </div>
            </div>
          </div>
            `
            moiveBox.appendChild(box)
        }
    )
}

document.querySelector("#search").addEventListener(
    "keyup",
    function (event) {
        if (event.target.value != "") {
            getMovies(SEARCHAPI + event.target.value)
        } else {
            getMovies(APIURL);
        }
    }
)