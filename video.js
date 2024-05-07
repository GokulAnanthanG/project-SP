const API_KEY = 'AIzaSyBOCxECc8aX3GvqFvxGOxtJ-UWA1X6eHlo';
const CHANNEL_ID = 'UCsn_aZqbyOfH9PZOfUmFPZQ';
async function fetchLatestVideos() {
  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=30`);
  const data = await response.json();
  return data.items;
}
let spinner=document.querySelector(".spinner");
 //display content
async function displayLatestVideos() {
  const videosContainer = document.getElementById('videos');
  
  const videos = await fetchLatestVideos();
  videos.forEach((video,i) => {
    //
let div=document.createElement("div");
div.classList.add("col-lg-4");
div.classList.add("mt-2");
   //
   let innerDiv=document.createElement("div");
   innerDiv.classList.add("card");
   innerDiv.classList.add("p-1");
   //
      const videoElement = document.createElement('iframe');
      videoElement.width = '100%';
      videoElement.height = '215';
      videoElement.src = `https://www.youtube.com/embed/${video.id.videoId}`;
      videoElement.frameBorder = '0';
      videoElement.allowFullscreen = true;
      console.log(video.snippet.title); // Log the video title
      innerDiv.appendChild(videoElement);
      //
      //
let center=document.createElement("center");
center.appendChild(innerDiv)
      //
      let h4=document.createElement("h4");
      h4.classList.add("title");
      h4.innerText=video.snippet.title;
      //
      div.appendChild(center);
      div.appendChild(h4)
      videosContainer.appendChild(div);
  });
  spinner.style.display='none'
}
window.onload=displayLatestVideos

// // Function to fetch the latest videos from the specified channel
// async function fetchLatestVideos(nextPageToken) {
//     const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=30&pageToken=${nextPageToken || ''}`);
//     const data = await response.json();
//     return data;
// }
//  // Define nextPageToken globally
// // Define nextPageToken globally
// let nextPageToken = '';

// // Call the displayLatestVideos function when the page loads
// window.onload = function() {
//     const videosContainer = document.getElementById('videos');
//     const observer = new IntersectionObserver(async entries => {
//         entries.forEach(async entry => {
//             if (entry.isIntersecting) {
//                 const videos = await fetchLatestVideos(nextPageToken);
//                 const items = videos.items;
//                 nextPageToken = videos.nextPageToken || null;
//                 let spinner=document.querySelector(".spinner");
//                 items.forEach(video => {
//                     let div=document.createElement("div");
//                     div.classList.add("col-lg-4");
//                     div.classList.add("mt-2");
//                        //
//                        let innerDiv=document.createElement("div");
//                        innerDiv.classList.add("card");
//                        innerDiv.classList.add("p-1");
//                        //
//                           const videoElement = document.createElement('iframe');
//                           videoElement.width = '100%';
//                           videoElement.height = '215';
//                           videoElement.src = `https://www.youtube.com/embed/${video.id.videoId}`;
//                           videoElement.frameBorder = '0';
//                           videoElement.allowFullscreen = true;
//                           console.log(video.snippet.title); // Log the video title
//                           innerDiv.appendChild(videoElement);
//                           //
//                           //
//                     let center=document.createElement("center");
//                     center.appendChild(innerDiv)
//                           //
//                           let h4=document.createElement("h4");
//                           h4.classList.add("title");
//                           h4.innerText=video.snippet.title;
//                           //
//                           div.appendChild(center);
//                           div.appendChild(h4)
//                           videosContainer.appendChild(div);
//                 });
//                 spinner.style.display='none'
//             }
//         });
//     });

//     // Observe the entire document body for scroll behavior
//     observer.observe(document.body);
// };
