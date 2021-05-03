const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${config.API_ACCESS_KEY}&count=${count}`;

// Get photos from Unspalsh API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
  } catch (err) {
    // err handling
  }
}

getPhotos();
