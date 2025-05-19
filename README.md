# Play Those Tunes
# Play those tunes is an application where you insert your favorite song - a link of it on a streaming platform, and then you will be provided of more external streaming platforms in which you can find this song!
# Target Platforms : All that have the accessibility



#  Developer Manual for Play Those Tunes

Welcome to the **Play Those Tunes** project! This manual is for developers who will work on the project in the future. It will help you set up the application locally and understand how to contribute.

---

###  Installation

Follow the steps below:

1. **Clone the Repository**

   First, clone the repository from GitHub. Run this command in your terminal:
   ```bash
   git clone git@github.com:emilyaraniva/FInalINST377.git
   cd FInalINST377
2. Run all Necessary Steps using NODE.js
     npm install
    npm start
   npm test
   4. API Documentation
This section provides an overview of the APIs used in this application, including how to interact with the external API, how it works within the project, and how to troubleshoot common issues.

External API - Song.Link API

Base URL: https://api.song.link/v1-alpha.1/

API Request
The application makes a GET request to the song.link API to fetch song data from music platforms (e.g., Spotify, Apple Music). The request includes the following parameters:

url: The music URL (e.g., a Spotify, Apple Music, or other music platform URL).

userCountry: The country code (e.g., 'US') to adjust the available links based on the user’s location.

songIfSingle: A boolean flag (true or false) that tells the API to return song data even if the link corresponds to a single song (as opposed to an album or playlist).

Request Example
Here’s an example of the GET request made by the application:


const response = await fetch(`https://api.song.link/v1-alpha.1/links?url=${encodedUrl}&userCountry=US&songIfSingle=true`);
Where:

encodedUrl: The user-provided music URL (e.g., a link to a Spotify song or album).

userCountry: A country code (US by default).

songIfSingle: true (If you want to include single tracks).

Example Request URL:

GET https://api.song.link/v1-alpha.1/links?url=https://spotify.com/...&userCountry=US&songIfSingle=true
API Response
The API responds with a JSON object containing song details and platform links.

Example Response:

{
  "entitiesByUniqueId": {
    "uniqueId": {
      "title": "Song Title",
      "artistName": "Artist Name",
      "thumbnailUrl": "http://example.com/thumbnail.jpg"
    }
  },
  "linksByPlatform": {
    "Spotify": {
      "url": "https://open.spotify.com/track/..."
    },
    "Apple Music": {
      "url": "https://music.apple.com/..."
    }
  },
  "entityUniqueId": "uniqueId"
}
Fields in Response:

entitiesByUniqueId: Contains the song’s title, artist name, and thumbnail URL (album art).

linksByPlatform: Contains the available music platform links (e.g., Spotify, Apple Music) where the song can be played.

entityUniqueId: A unique identifier for the song or album.

API Integration in the Application
The application uses the above API to fetch song data whenever a user submits a URL. The user-provided URL is passed to the API, which returns the song’s details and available listening links. This data is then displayed dynamically on the webpage.

Here's a summary of the integration flow:

User Input: The user enters a music URL in the form.

API Call: The frontend sends a GET request to the song.link API.

Display Result: The response is parsed, and the song’s title, artist, album art, and links are displayed to the user.

Example of how the data is displayed:

resultContainer.innerHTML = `
  <h2>${songInfo.title} – ${songInfo.artistName}</h2>
  <img src="${songInfo.thumbnailUrl}" alt="Album Art" width="200" />
  <h3>Listen on:</h3>
  <ul>
    ${Object.entries(links).map(([platform, { url }]) => 
      `<li class="result-item"><a href="${url}" target="_blank">${platform}</a></li>`
    ).join('')}
  </ul>
`;
Error Handling and Common Issues
Invalid URL: If the user submits an invalid URL, the form will show a message asking the user to provide a valid URL.

Message: Please enter a valid URL.

API Request Failure: If the API request fails (e.g., network issues, invalid response from the API), an error message will be displayed.

Message: Something went wrong. Please try again later.

API Error Response: If the API returns an error (e.g., song not found), the application will display the error.

Example: Error: {error message from API}

Known Bugs
Fetch Errors: Occasionally, the app may fail to fetch data if there are network issues or if the API is temporarily unavailable.

Responsive Issues: The app may not display perfectly on smaller screen sizes for certain components, particularly in older browsers.
