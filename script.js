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
            <div class="card mt-4 mx-auto mb-3" style="width: 18rem;">
            <img src="${imagePath}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title text-center">${result.original_title}</h5>
              <p class="text-center">⭐ Rating :- ${result.vote_average}</p>
              <div class="accordion" id="accordionExample">
              <div class="accordion-item">
              <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                 Overview
                </button>
              </h2>
              <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                ${result.overview}
                </div>
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