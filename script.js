const count = 5;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${config.API_ACCESS_KEY}&count=${count}`;
const imageContainer = document.getElementById("image-container");

let ready = false;
let imageCount = 0;
let photos = [];

//On each image loaded
function imageLoaded() {
  console.log(imageCount);
  imageCount++;
  if (imageCount == count) {
    ready = true;
    console.log("ready = " + ready);
  }
}

// Display photos loaded from API;
function displayPhotos() {
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
  try {
    const response = await fetch(apiUrl);
    photos = await response.json();
    displayPhotos();
  } catch (err) {
    // err handling
  }
}

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
