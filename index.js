document.addEventListener('DOMContentLoaded', function() {
   //getpost and video
  getPagePosts();
 displayLatestVideos();

  //slider
  // Check if it's not a mobile device
 var imgArray


 if (/Mobi|Android/i.test(navigator.userAgent)) {
   imgArray = ["url('./assets/slider/slider1_m.jpg')","url('./assets/slider/slider2_m.jpg')","url('./assets/slider/slider3_m.jpg')","url('./assets/slider/slider4.JPG')"];
 } else {
   imgArray = ["url('./assets/slider/slider1.JPG')","url('./assets/slider/slider2.jpg')","url('./assets/slider/slider3.jpg')","url('./assets/slider/slider4.JPG')"];
 }


 
  
  const gradient = "linear-gradient(148deg, rgba(8, 7, 43, 0.705) 0%, rgba(10, 12, 41, 0.722) 37%,  rgba(91, 16, 42, 0.534) 100%)";
 let imageUrl;
  let backgroundImage = `${gradient}, ${imageUrl}`;
let count=0;  
setInterval(()=>{
  if(count>=imgArray.length)count=0;
  imageUrl=imgArray[count];
 backgroundImage = `${gradient}, ${imageUrl}`;

    document.querySelector(".wrapper").style.backgroundImage = backgroundImage;
    count++;
  },5000)

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


});


const API_KEY = 'AIzaSyBOCxECc8aX3GvqFvxGOxtJ-UWA1X6eHlo';
const CHANNEL_ID = 'UCsn_aZqbyOfH9PZOfUmFPZQ';

async function fetchLatestVideos() {
  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=4`);
  const data = await response.json();
  return data.items;
}

 //display content
async function displayLatestVideos() {
  const videosContainer = document.getElementById('videos');
  
  const videos = await fetchLatestVideos();
  videos.forEach((video,i) => {
    document.querySelector(".spinner2").style.display="none";
    //for div video curosel
    if(i<3){
      let divC=document.createElement("div");
      divC.classList.add("carousel-item");
      divC.classList.add("card");
if (i === 0) divC.classList.add("active");
    const videoElementC = document.createElement('iframe');
    videoElementC.width = '100%';
    videoElementC.height = '200px';
    videoElementC.src = `https://www.youtube.com/embed/${video.id.videoId}`;
    videoElementC.frameBorder = '0';
    videoElementC.allowFullscreen = true;
     divC.appendChild(videoElementC);

     let textBoxC=document.createElement("div");
      textBoxC.classList.add("textBox");

      let pC=document.createElement("p");
      pC.setAttribute("align","justify");
      pC.classList.add("videoText");
      pC.classList.add("my-1");
      pC.innerText=video.snippet.title;
      textBoxC.appendChild(pC);
      divC.appendChild(textBoxC);
      document.getElementById("EventcuroselForMobile2").appendChild(divC)
    }
    //
let div=document.createElement("div");
if(i==0){
  div.classList.add("col-lg-3");
  div.classList.add("col-md-6");
div.classList.add("my-2");
div.setAttribute("data-aos","fade-up");
div.setAttribute("data-aos-duration",700)
div.setAttribute("data-aos-once",true)
div.setAttribute("data-aos-delay",700)
}
if(i==1){
  div.classList.add("col-lg-3");
  div.classList.add("col-md-6");
div.classList.add("my-2");
div.setAttribute("data-aos","fade-up");
div.setAttribute("data-aos-duration",1000)
div.setAttribute("data-aos-once",true)
div.setAttribute("data-aos-delay",1000)
}
if(i==2){
  div.classList.add("col-lg-3");
  div.classList.add("col-md-6");
div.classList.add("my-2");
div.setAttribute("data-aos","fade-up");
div.setAttribute("data-aos-duration",1300)
div.setAttribute("data-aos-once",true)
div.setAttribute("data-aos-delay",1300)
}
if(i==3){
  div.classList.add("col-lg-3");
  div.classList.add("col-md-6");
div.classList.add("my-2");
div.setAttribute("data-aos","fade-up");
div.setAttribute("data-aos-duration",1600)
div.setAttribute("data-aos-once",true)
div.setAttribute("data-aos-delay",1600)
}
   //
   //
   let innerDiv=document.createElement("div");
   innerDiv.classList.add("card");
   innerDiv.classList.add("p-3");
   //
      const videoElement = document.createElement('iframe');
      videoElement.width = '100%';
      videoElement.height = '200px';
      videoElement.src = `https://www.youtube.com/embed/${video.id.videoId}`;
      videoElement.frameBorder = '0';
      videoElement.allowFullscreen = true;
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
  //fb posts
    
}
var PAGE_ACCESS_TOKEN = 'EAAVX5c18p0kBOytEwoGRTwOMCuax4WT6nvPrAnpMsDDEMYvslQZCBGKUGzv9Ac6dSdENut3gMwckj11cjbqf9ZBJHaofY0BjhCZAjngeaUq4rzZCKsgx80hjqvgkZCxbM3CJp2D2Rh5JjAUDkMNUXZB9coTq5kuzg9qPQoAWJxZA7syh4nZCZAdFhNmPtZCajikTIZD';

    var PAGE_ID = '140032333456457';
   
   function getPagePosts() {
        fetch(`https://graph.facebook.com/v12.0/${PAGE_ID}/posts?fields=message,full_picture,created_time,place,attachments&access_token=${PAGE_ACCESS_TOKEN}`)
           .then(response => response.json())
           .then(data => {
            document.querySelector(".spinner").style.display="none"

               var posts = data.data;
               var postsWithImages = [];
               console.log(postsWithImages);
               posts.forEach(function(post) {
                   var message = post.message ? post.message : 'No message available';
                   var options = { weekday: 'short', month: 'short', year: 'numeric' };
                   var createdTime = new Date(post.created_time).toLocaleDateString('en-US', options);
                   var location = post.place ? post.place.location : null;
                   let locationHtml = '';
                   if (location) {
                       locationHtml = `<p>Location: ${location.city}, ${location.country}</p>`;
                   }

                    var images = [];
                   var attachments = post.attachments;
                   if (attachments && attachments.data && attachments.data.length > 0) {
                       attachments.data.forEach(function(attachment) {
                           if (attachment.type === 'photo') {
                               images.push(attachment.media.image.src);
                           }
                            if (attachment.subattachments && attachment.subattachments.data && attachment.subattachments.data.length > 0) {
                               attachment.subattachments.data.forEach(function(subattachment) {
                                   if (subattachment.type === 'photo') {
                                       images.push(subattachment.media.image.src);
                                   }
                               });
                           }
                       });
                   }

                    if (images.length === 0) {
                       images.push('No images available');
                   }

                   var postWithImages = {
                       message: message,
                       createdTime: createdTime,
                       location: location,
                       images: images
                   };
                   postsWithImages.push(postWithImages);
               });

               renderPosts(postsWithImages);
           })
           .catch(error => {
               console.error('Error fetching posts:', error);
           });
   }

   function renderPosts(postsWithImages) {
    let count=0;
      
       postsWithImages.forEach(function(post,i) {
        if(post.images[0]!="No images available"){

          var locationHtml = post.location ? `<span>${post.location.city}, ${post.location.country}</span>` : '';

//
if(count<3){
  let carouselItem = document.createElement("div");
carouselItem.className = "carousel-item";
if (count === 0) carouselItem.classList.add("active");

let contentDiv = document.createElement("div");
contentDiv.className = "d-block w-100 custom-content card p-3";

let img2 = document.createElement("img");
img2.src = post.images[0];
img2.className = "img-fluid img-thumbnail";
img2.alt = "Post Image";

let textBox2 = document.createElement("div");
textBox2.className = "textBox p-3";

 textBox2.innerHTML=`<h5 style='font-size:14px' class="title my-1" align="center">${post.message}</h5>
 <p align="center" class="my-1"><span class="date">${post.createdTime}</span> |
   <span class="location"> <i class='fas fa-map-marker-alt'></i> ${locationHtml?`<span>${locationHtml}<span>`:"not mentioned"} </span>
 </p><br><a href='viewEvent.html?index=${i}'><button>Details</button></center>`;

contentDiv.appendChild(img2);
contentDiv.appendChild(textBox2);

carouselItem.appendChild(contentDiv);
console.log(carouselItem);
document.querySelector("#EventcuroselForMobile").appendChild(carouselItem);

}
//


let div= document.createElement("div");
div.classList.add("col-lg-3");
div.classList.add("col-md-6");
div.classList.add("my-2");
div.classList.add("my-2");

if(count==0){
 div.setAttribute("data-aos","fade-right");
div.setAttribute("data-aos-duration",700)
div.setAttribute("data-aos-once",true)
div.setAttribute("data-aos-delay",700)
}
if(count==1){
 div.setAttribute("data-aos","fade-right");
div.setAttribute("data-aos-duration",1000)
div.setAttribute("data-aos-once",true)
div.setAttribute("data-aos-delay",1000)
}
if(count==2){
 div.setAttribute("data-aos","fade-right");
div.setAttribute("data-aos-duration",1300)
div.setAttribute("data-aos-once",true)
div.setAttribute("data-aos-delay",1300)
}
if(count==3){
  div.setAttribute("data-aos","fade-right");
 div.setAttribute("data-aos-duration",1600)
 div.setAttribute("data-aos-once",true)
 div.setAttribute("data-aos-delay",1600)
 }

let card=document.createElement("div");
card.classList.add("card");
card.classList.add("p-3");

let center=document.createElement("center");
let img=document.createElement("img");
img.src=post.images[0];
img.classList.add("img-fluid");
img.classList.add("img-thumbnail");
center.appendChild(img);

let textBox=document.createElement("div");
textBox.classList.add("textBox");
textBox.classList.add("p-3");
textBox.innerHTML=`<h5 style='font-size:14px' class="title my-1" align="center">${post.message}</h5>
<p align="center" class="my-1"><span class="date">${post.createdTime}</span> |
  <span class="location"> <i class='fas fa-map-marker-alt'></i> ${locationHtml?`<span>${locationHtml}<span>`:"not mentioned"} </span>
</p>`;
let center2=document.createElement("center");
center2.innerHTML=`<a href='viewEvent.html?index=${i}'><button>Details</button></center>`;
card.appendChild(center);
card.appendChild(textBox);
card.appendChild(center2);
div.appendChild(card);
document.getElementById('posts').appendChild(div);
count++;
        }
        });
 
    }

