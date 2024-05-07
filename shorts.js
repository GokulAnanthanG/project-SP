// Replace 'YOUR_API_KEY' with your actual API key
const API_KEY = 'AIzaSyBOCxECc8aX3GvqFvxGOxtJ-UWA1X6eHlo';
const API_URL = 'https://www.googleapis.com/youtube/v3/playlistItems';
const playlistId = 'PLMl3UAQZqwQsI1SXiNzkHu61FOqTZpLKE'; // Replace with your Shorts playlist ID

// Function to fetch Shorts videos from YouTube Data API
async function fetchShortsVideos() {
    const response = await fetch(`${API_URL}?part=snippet&maxResults=20&playlistId=${playlistId}&key=${API_KEY}`);
    const data = await response.json();
    return data.items;
}

// Function to display Shorts videos on webpage
async function displayShortsVideos() {
    const shortsContainer = document.getElementById('shorts-videos');

    // Fetch Shorts videos
    const shortsVideos = await fetchShortsVideos();

    // Display Shorts videos
    shortsVideos.forEach(video => {
        if (video.snippet) {
            const videoId = video.snippet.resourceId ? video.snippet.resourceId.videoId : null;
            if (videoId) {
                //
                let div=document.createElement("div");
                div.classList.add("col-lg-4");
                div.classList.add("mt-2");
                let card=document.createElement("div");
                card.classList.add("card");
                //
                const videoTitle = video.snippet.title;
                const videoThumbnail = video.snippet.thumbnails.default.url;

                const videoElement = document.createElement('iframe');
                videoElement.src = `https://www.youtube.com/embed/${videoId}`;
                videoElement.title = videoTitle;
                videoElement.width = 'auto';
                videoElement.height ='300';
                card.appendChild(videoElement);
                div.appendChild(card);
                shortsContainer.appendChild(div);
            }
        }
    });
}

// Call function to display Shorts videos
displayShortsVideos();