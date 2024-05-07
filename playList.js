// Replace 'YOUR_API_KEY' with your actual YouTube Data API key
const API_KEY = 'AIzaSyBOCxECc8aX3GvqFvxGOxtJ-UWA1X6eHlo';
// Replace 'YOUR_CHANNEL_ID' with your YouTube channel ID
const CHANNEL_ID = 'UCsn_aZqbyOfH9PZOfUmFPZQ';

// Function to fetch the latest playlists from the specified channel
async function fetchLatestPlaylists() {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlists?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&maxResults=5`);
    const data = await response.json();
    return data.items;
    console.log(data.items);
}

// Function to display the latest playlists on the webpage
async function displayLatestPlaylists() {
    const playlistsContainer = document.getElementById('playlists');
    const playlists = await fetchLatestPlaylists();
    playlists.forEach(playlist => {
        // Fetch the number of videos in the playlist
        fetchPlaylistVideosCount(playlist.id).then(videoCount => {
            const playlistElement = document.createElement('div');
            playlistElement.classList.add("col-lg-4")
            playlistElement.innerHTML = `
                 <a href="https://www.youtube.com/playlist?list=${playlist.id}" target="_blank">
                    <div class="p-3 playList" style="background-image:linear-gradient(to bottom, rgba(24, 48, 53, 0.52), rgba(39, 5, 47, 0.73)), url('${playlist.snippet.thumbnails.default.url}');background-repeat: no-repeat;background-position: center;background-size: cover;width: auto;height: 300px;">
                        <p><i class="fas fa-list-alt"></i> ${videoCount} video</p>
                        </div>
                        <h6 class="text">${playlist.snippet.title}</h6>
                   </a>
             `;
            playlistsContainer.appendChild(playlistElement);
        });
    });
}

// Function to fetch the number of videos in a playlist
async function fetchPlaylistVideosCount(playlistId) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${playlistId}&part=snippet&maxResults=0`);
    const data = await response.json();
    return data.pageInfo.totalResults;
}

// Call the displayLatestPlaylists function when the page loads
window.onload = displayLatestPlaylists;