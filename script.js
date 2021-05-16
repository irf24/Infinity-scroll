const count = 10;
let page_no = 0;
let query = "";
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${config.API_ACCESS_KEY}&count=${count}`;
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
const search = document.getElementById("search");
const form = document.getElementById("search-form");

let ready = false;
let random = true;
let imageCount = 0;
let photos = [];

//On each image loaded
function imageLoaded() {
  imageCount++;
  if (imageCount == count) {
    ready = true;
  }
}

// Display photos loaded from API;
function displayPhotos() {
  loader.hidden = true;
  photos.forEach((photo) => {
    // Create Unspalsh page Link for the image
    const imageLink = document.createElement("a");
    imageLink.setAttribute("href", photo.links.html);
    imageLink.setAttribute("target", "_blank");

    // Create image element
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description);

    imageLink.appendChild(img);
    imageContainer.appendChild(imageLink);

    //event listner for image
    img.addEventListener("load", imageLoaded);
  });
}

//get random photos
async function getRandomPhotos() {
  try {
    const response = await fetch(apiUrl);
    photos = await response.json();
    displayPhotos();
  } catch (err) {
    // err handling
  }
}

//search photos
async function getSearchResults() {
  page_no++;
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?client_id=${config.API_ACCESS_KEY}&query=${query}&page=${page_no}`
    );
    const data = await response.json();
    photos = data.results;
    displayPhotos();
  } catch (err) {
    // err handling
  }
}

// Get photos from Unspalsh API
function getPhotos() {
  imageCount = 0;
  ready = false;
  loader.hidden = false;
  if (random) {
    getRandomPhotos();
  } else {
    getSearchResults(query);
  }
}

//form event listener
form.addEventListener("submit", (e) => {
  e.preventDefault();
  query = e.target.search.value;
  imageContainer.innerHTML = "";
  random = false;
  getPhotos();
});

//infinity scroll functionality
document.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    getPhotos();
  }
});

// On load
getPhotos();
