
document.addEventListener('DOMContentLoaded', function() {
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
