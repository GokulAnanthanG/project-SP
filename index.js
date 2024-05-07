
document.addEventListener('DOMContentLoaded', function() {
  //slider
  // Check if it's not a mobile device
if (!(/Mobi|Android/i.test(navigator.userAgent))) {
  const gradient = "linear-gradient(148deg, rgba(8, 7, 43, 0.705) 0%, rgba(10, 12, 41, 0.722) 37%, rgba(54, 7, 15, 0.653) 100%)";
 let imageUrl;
  let backgroundImage = `${gradient}, ${imageUrl}`;
const imgArray=["url('./assets/slider/slider1.JPG')","url('./assets/slider/slider2.jpg')","url('./assets/slider/slider3.jpg')","url('./assets/slider/slider4.JPG')"];
let count=0;  
setInterval(()=>{
  if(count>=imgArray.length)count=0;
  imageUrl=imgArray[count];
 backgroundImage = `${gradient}, ${imageUrl}`;

    document.querySelector(".wrapper").style.backgroundImage = backgroundImage;
    count++;
  },5000)
}
  //slider
    var audioBtn=document.querySelector(".playButton");
    var audio = new Audio('./assets/About Thiru A Kaliyamurthy Former Superintendent of Police _ Video by News 7.mp3');
    audioBtn.addEventListener('click', function() {
         if (audio.paused || audio.ended) {
             audio.play();
             audioBtn.classList.add("playButtonAni");
              audioBtn.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="playButtonsvg playButtonAnisvg bi bi-pause-circle-fill" viewBox="0 0 16 16">
             <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5m3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5"/>
           </svg>`
        } else {
             audio.pause();
             audioBtn.classList.remove("playButtonAni");
              audioBtn.innerHTML=` <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="playButtonsvg  bi bi-play-circle-fill" viewBox="0 0 16 16">
             <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"/>
           </svg>`
            
        }
    });
    audio.addEventListener('ended', function() {
        audio.pause();
        audioBtn.innerHTML=` <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="playButtonsvg bi bi-play-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"/>
      </svg>`
      audioBtn.classList.remove("playButtonAni");
      document.querySelector(".playButtonsvg").classList.remove("playButtonAnisvg");
    });

  //  displayLatestVideos();

});


const API_KEY = 'AIzaSyBOCxECc8aX3GvqFvxGOxtJ-UWA1X6eHlo';
const CHANNEL_ID = 'UCsn_aZqbyOfH9PZOfUmFPZQ';

async function fetchLatestVideos() {
  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=3`);
  const data = await response.json();
  return data.items;
}

 //display content
async function displayLatestVideos() {
  const videosContainer = document.getElementById('videos');
  
  const videos = await fetchLatestVideos();
  videos.forEach((video,i) => {
    //
let div=document.createElement("div");
if(i==0){
  div.classList.add("col-lg-4")
div.classList.add("my-2");
div.setAttribute("data-aos","fade-up");
div.setAttribute("data-aos-duration",700)
div.setAttribute("data-aos-once",true)
div.setAttribute("data-aos-delay",700)
}
if(i==1){
  div.classList.add("col-lg-4")
div.classList.add("my-2");
div.setAttribute("data-aos","fade-up");
div.setAttribute("data-aos-duration",1000)
div.setAttribute("data-aos-once",true)
div.setAttribute("data-aos-delay",1000)
}
if(i==2){
  div.classList.add("col-lg-4")
div.classList.add("my-2");
div.setAttribute("data-aos","fade-up");
div.setAttribute("data-aos-duration",1300)
div.setAttribute("data-aos-once",true)
div.setAttribute("data-aos-delay",1300)
}
   //
   //
   let innerDiv=document.createElement("div");
   innerDiv.classList.add("card");
   innerDiv.classList.add("p-3");
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
      let textBox=document.createElement("div");
      textBox.classList.add("textBox");
      textBox.classList.add("p-3");
      //
      let p=document.createElement("p");
      p.setAttribute("align","justify");
      p.classList.add("videoText");
      p.classList.add("my-1");
      p.innerText=video.snippet.title;
      //
      innerDiv.appendChild(p)
      div.appendChild(innerDiv);
      videosContainer.appendChild(div);
  });
}
