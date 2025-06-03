![Status](https://img.shields.io/badge/status-finished-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Node](https://img.shields.io/badge/node.js-%5E18.x-green)
![2025-06-0216-09-51-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/c2c008f2-8d5d-460f-a934-6277bbc88f7f)
<!--Title Image-->
# :computer: Moo-dy: Listen to a Song based on your Mood - Website 
  <p>
  Moo-dy is a website that delivers a song based on your current mood. Feeling angry? Sad or lonely? Moo-dy has the perfect song recommendation for you.
  </p>

  Check out the ***Table of Contents*** section to navigate through this documentation.

<!--Menu-->
## :large_orange_diamond: Table of Contents
- [1. Introduction](#large_orange_diamond-introduction)
  - [1.1 Description](#arrow_forward-description)
- [2. Patch Notes](#large_orange_diamond-patch-notes)
  - [2.1 Latest Update](#pushpin-latest-update)
- [3. Features](#large_orange_diamond-features)
  - [3.1 Requesting a Song](#arrow_forward-requesting-a-song)
  - [3.2 Responsiveness](#arrow_forward-responsiveness)
    - [3.2.1 Mobile](#small_red_triangle_down-mobile)
    - [3.2.2 Tablet](#small_red_triangle_down-tablet)
    - [3.2.3 Desktop](#small_red_triangle_down-desktop)
- [4. Tools and Technologies](#large_orange_diamond-tools-and-technologies) 
  - [4.1 Stacks Used](#arrow_forward-stacks-used)
  - [4.2 Libraries](#arrow_forward-libraries)
- [5. Backend](#large_orange_diamond-backend)
  - [5.1 Server](#arrow_forward-server)
  - [5.2 Backend Code](#arrow_forward-backend-code)
  - [5.3 Cold Start](#arrow_forward-cold-start)
- [6. Frontend](#large_orange_diamond-frontend)
  - [6.1 Frontend Code](#arrow_forward-frontend-code)
    - [6.1.1 Endpoint URL](#arrow_forward-endpoint-url)
    - [6.1.2 Mood Keywords](#arrow_forward-mood-keywords)
    - [6.1.3 Searching Tracks](#arrow_forward-searching-tracks)
    - [6.1.4 Updating the DOM](#arrow_forward-updating-the-dom)
    - [6.1.5 Event Listener](#arrow_forward-event-listener)
- [7. Result](#large_orange_diamond-result)
  - [7.1 Deploy on Vercel](#arrow_forward-deploy-on-vercel)
- [8. Links](#large_orange_diamond-links)
  - [8.1. Project Repository](#arrow_forward-project-repository)
  - [8.2. Social Links](#arrow_forward-social-links)
  - [8.3. Other Links](#arrow_forward-other-links)
- [9. Etcetera](#large_orange_diamond-etcetera)
  - [9.1 About](#arrow_forward-about)
  - [9.2 Licenses](#arrow_forward-license)

<!--Introduction-->
## :large_orange_diamond: Introduction
### :arrow_forward: Description
Moo-dy is a website made to study the integration between backend and frontend, and working with API calls. You choose a mood available, 
a API call is made to Spotify and then you receive a song recommendation based on the mood you choose.

<!--Patch Notes-->
## :large_orange_diamond: Patch Notes
### :pushpin: Latest Update
<strong>28/05/2025</strong>
- CSS: Centered all mood buttons on container

<!--Features-->
## :large_orange_diamond: Features
### :arrow_forward: Requesting a Song
![2025-06-0216-09-51-ezgif com-video-to-gif-converter(1)](https://github.com/user-attachments/assets/29a0c1c4-008b-4d79-971c-8683ad73112d)
<p>Requesting a song is pretty simple: Just choose your mood, and the API will do the rest. It will fetch a list of possible songs based on a keywords list, and 
deliver a album image (if available), song name, artist, song preview (if available) and a button to open and listen to the song in spotify's page.
</p>

![2025-06-0217-43-32-ezgif com-crop](https://github.com/user-attachments/assets/cb4512c1-2276-463e-9bb4-e40c9916ecf2)
<p>
You can request a song in the same mood category as many times as you like. <br>
The results are random, based on a response list containing up to 50 songs for a specific keyword(mood).
</p>

### :arrow_forward: Responsiveness
<p>
The website uses Bootstrap breakpoints to provide a responsive experience.
</p>

#### :small_red_triangle_down: Mobile
![2025-06-0216-07-00-ezgif com-crop](https://github.com/user-attachments/assets/e2c95b93-bb18-4af6-a2f3-36914736cab7)
<p>- Mobile View</p>

#### :small_red_triangle_down: Tablet
![2025-06-0216-08-23-ezgif com-crop](https://github.com/user-attachments/assets/893ca104-1a9c-417b-b97f-f83cf1e5d7f6)
<p>- Tablet View</p>

#### :small_red_triangle_down: Desktop
![2025-06-0216-09-51-ezgif com-video-to-gif-converter(1)](https://github.com/user-attachments/assets/29a0c1c4-008b-4d79-971c-8683ad73112d)
<p>- Desktop View</p>

<!--Tools Used-->
## :large_orange_diamond: Tools and Technologies
### :arrow_forward: Stacks Used
[![My Skills](https://skillicons.dev/icons?i=html,css,js,bootstrap,nodejs,express)](https://skillicons.dev) <br>
<br>
This website uses:<br>
  - Node.js: Used to run the backend server outside the browser.
  - Express: Web framework for Node.js that helps create routes and handle HTTP requests easily.
  - Dotenv – Loads environment variables from my .env file to keep sensitive data (API key) secure and out of the codebase.
  - CORS – Allows my frontend (Hosted on Vercel) to communicate with the backend (Hosted on Render).

### :arrow_forward: Libraries
* [Node.js Documentation](https://nodejs.org/en/docs/)
* [Express.js Documentation](https://expressjs.com/)
* [CORS (npm) Documentation](https://www.npmjs.com/package/cors)

<!--Backend-->
## :large_orange_diamond: Backend
### :arrow_forward: Server
The Github repository containing the javascript backend code runs on [Render](https://render.com/), in a free hosting plan.

### :arrow_forward: Backend Code
This is the code on the Javascript file hosted on Render's servers. <br>
The repository also have my `CLIENT_ID` and `CLIENT_SECRET` stored in variables on a `.env` file that is ignored with `.gitignore`. Both are used in the API call for the Spotify web API.

    require("dotenv").config();
    const express = require("express");
    const cors = require("cors");
    const fetch = require("node-fetch");
    
    const app = express();
    app.use(cors());
    
    app.get("/token", async (req, res) => {
      const auth = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString("base64");
    
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Authorization": `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "grant_type=client_credentials"
      });
    
      const data = await response.json();
      res.json(data);
    });
    
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Backend running on port ${PORT}`);
    });

### :arrow_forward: Cold Start
>[!NOTE]
>The application is hosted on a free plan in [Render](https://render.com/), therefore, the server "sleeps" after a few minutes of inactivity. <br>
So, there is a high chance that when you click on your desired mood, it will take about 20-30 seconds for the server to "awake", and then deliver you the
recomended song. <br>
Every other request you try after this, will almost instantly deliver the recomended song.

<!--Frontend Code-->
## :large_orange_diamond: Frontend
### :arrow_forward: Frontend Code
In this section, we will review the Frontend code.<br>
The Frontend Javascript handles button events, fetches a Spotify token from the backend, searches for songs based on a selected mood, and dynamically updates the interface with the track information.

#### :small_red_triangle_down: Endpoint URL
`apiUrl` points to the backend endpoint hosted on Render, which returns a Spotify access token:

    const apiUrl = "https://moo-dy-spotify-backend.onrender.com/token"; // Render URL

#### :small_red_triangle_down: Mood Keywords
Defining the keywords, stored in the `moodKeywords` object. This will define which song style the Spotify API will send as response. The Mood buttons define which keyword will be sent in the request.

    const moodKeywords = {
        Joyful: "happy upbeat joyful party joy",
        Sad: "sad slow depressive depression crying suffering pain",
        Lonely: "lonely acoustic lone slow contemplative hopeless isolated",
        Angry: "angry rock metal heavy metal hate despite die death kill",
        Romantic: "romantic love beautiful kiss marry girlfriend boyfriend couple",
        Nostalgic: "nostalgia retro nostalgic old",
        Classical: "classical classic piano violin ost"
    };

#### :small_red_triangle_down: API Call
API Call (GET) to the backend hosted on Render to get my access token.
    
    async function getAccessToken() {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.access_token;
    }

#### :small_red_triangle_down: Searching Tracks
Here, the token is used in the `searchTrackByMood` function. 
The mood is defined depending on which button you choose.<br>
The response gives a json with a maximum amount of 50 songs. Then, one is chosen randomly.
    
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
        if (tracks.length === 0) return null;
        
        const randomIndex = Math.floor(Math.random() * tracks.length);
        return tracks[randomIndex];
    }

Then we check if the track have a album image and store it in `albumImage` variable.
    
    function showTrack(track) {
        const container = document.querySelector(".container-song-result");
        const albumImage = track.album.images.length > 0 ? track.album.images[0].url : '';


#### :small_red_triangle_down: Updating the DOM
And finally, we modify the DOM by updating the placeholder container with the song data:<br>
Album image if available, song name, artist, track preview if available and a button that redirects you to the song's page on Spotify.

        container.innerHTML = `
            <div class="card card-spotify d-flex flex-column justify-content-center align-items-center mt-3">
                <img src="${albumImage}" class="card-img-top" alt="Album cover of ${track.album.name}" draggable="false">
                <div class="card-body d-flex flex-column justify-content-center">
                    <h5 class="card-title spotify-title">${track.name}</h5>
                    <p class="card-text spotify-text">By ${track.artists.map(a => a.name).join(", ")}</p>
                    ${track.preview_url ? 
                        `<audio controls src="${track.preview_url}">Preview not available</audio>` :
                        `<p class="preview-text"><em>Preview not available for this track.</em></p>`
                    }
                    <a href="${track.external_urls.spotify}" target="_blank" class="btn btn-success-spotify">Open in Spotify</a>
                </div>
            </div>
        `;
    }

#### :small_red_triangle_down: Event Listener
This is just the event listener for each Mood button.

    // Event Listener
    document.querySelectorAll(".container-mood button").forEach(button => {
        button.addEventListener("click", async () => {
            const mood = button.textContent.trim();
            const token = await getAccessToken();
            const track = await searchTrackByMood(mood, token);
            showTrack(track);
        });
    });

<!--Deploy-->
## :large_orange_diamond: Result


### :arrow_forward: Deploy on Vercel 
* <a href="https://moo-dy-spotify-front-end.vercel.app/" alt="See the page live on Vercel now">Moo-dy - Website on Vercel</a>

<!--Links-->
## :large_orange_diamond: Links
### :arrow_forward: Project Repository
* [Moo-dy's Front-end GitHub Repository](https://github.com/jeanjusten/Moo-dy_Spotify_FrontEnd)
* [Moo-dy's Back-end GitHub Repository](https://github.com/jeanjusten/Moo-dy_Spotify_Backend)

### :arrow_forward: Social Links
* [Jean Justen's Github page](https://github.com/jeanjusten)
* [Jean Justen's LinkedIn page](https://www.linkedin.com/in/jeanjusten/)

### :arrow_forward: Other Links
* [Node.js Documentation](https://nodejs.org/en/docs/)
* [Express.js Documentation](https://expressjs.com/)
* [CORS (npm) Documentation](https://www.npmjs.com/package/cors)
* [Dotenv (npm) Documentation](https://www.npmjs.com/package/dotenv)
* [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api)
* [Render –  Backend Cloud Hosting](https://render.com/)
* [Vercel – Frontend Hosting](https://vercel.com/)

## :large_orange_diamond: Etcetera
### :arrow_forward: About
Moo-dy was created by ![logo](https://github.com/user-attachments/assets/0894beaf-f587-4d0a-983a-caf7fb551554) <strong>JEAN JUSTEN</strong> as an object of study. My goal was to integrate frontend with backend, learn about endpoints, API Calls and update the DOM content with the Json response.

### :arrow_forward: License
You may use, copy, share and modify the code as you please. No credits needed.</p>
