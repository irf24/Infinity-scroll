const count = 5;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${config.API_ACCESS_KEY}&count=${count}`;
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
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

// Get photos from Unspalsh API
async function getPhotos() {
  imageCount = 0;
  ready = false;
  loader.hidden = false;
  try {
    const response = await fetch(apiUrl);
    photos = await response.json();
    displayPhotos();
  } catch (err) {
    // err handling
  }
}

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
