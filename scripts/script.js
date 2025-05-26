const apiUrl = "https://moo-dy-spotify-backend.onrender.com/token"; // Render URL

const moodKeywords = {
    Joyful: "happy upbeat",
    Sad: "sad slow",
    Lonely: "lonely acoustic",
    Angry: "angry rock",
    Romantic: "romantic love",
    Nostalgic: "nostalgia retro"
};

async function getAccessToken() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.access_token;
}

async function searchTrackByMood(mood, token) {
    const query = moodKeywords[mood];
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`, {
        headers: {
        "Authorization": "Bearer " + token
        }
    });

    const data = await response.json();
    return data.tracks.items[0];
}

async function searchTrackByMood(mood, token) {
    const query = moodKeywords[mood];
    const limit = 50;
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=${limit}`, {
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    const data = await response.json();
    const tracks = data.tracks.items;
    if (tracks.length === 0) return null; // sem resultados
    
    const randomIndex = Math.floor(Math.random() * tracks.length);
    return tracks[randomIndex];
}

function showTrack(track) {
    const container = document.querySelector(".container-song-result");
    const albumImage = track.album.images.length > 0 ? track.album.images[0].url : '';

    container.innerHTML = `
        <div class="card card-spotify d-flex flex-column justify-content-center align-items-center mt-4">
            <img src="${albumImage}" class="card-img-top" alt="Album cover of ${track.album.name}">
            <div class="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 class="card-title">${track.name}</h5>
                <p class="card-text">By ${track.artists.map(a => a.name).join(", ")}</p>
                ${track.preview_url ? 
                    `<audio controls src="${track.preview_url}">Preview not available</audio>` :
                    `<p><em>Preview not available for this track.</em></p>`
                }
                <a href="${track.external_urls.spotify}" target="_blank" class="btn btn-success">Open in Spotify</a>
            </div>
        </div>
    `;
}


document.querySelectorAll(".container-mood button").forEach(button => {
    button.addEventListener("click", async () => {
        const mood = button.textContent.trim();
        const token = await getAccessToken();
        const track = await searchTrackByMood(mood, token);
        showTrack(track);
    });
});
