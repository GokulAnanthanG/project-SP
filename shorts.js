document.addEventListener("DOMContentLoaded", function() {
    // Replace 'PAGE_ACCESS_TOKEN' with your actual Facebook Page Access Token
    var PAGE_ACCESS_TOKEN = 'EAAVX5c18p0kBOytEwoGRTwOMCuax4WT6nvPrAnpMsDDEMYvslQZCBGKUGzv9Ac6dSdENut3gMwckj11cjbqf9ZBJHaofY0BjhCZAjngeaUq4rzZCKsgx80hjqvgkZCxbM3CJp2D2Rh5JjAUDkMNUXZB9coTq5kuzg9qPQoAWJxZA7syh4nZCZAdFhNmPtZCajikTIZD';

    // Replace 'PAGE_ID' with the ID of the Facebook page whose videos you want to fetch
    var PAGE_ID = '140032333456457';
    var videos=[]
    function getPageVideos() {
        // Fetch page posts with videos only
        fetch(`https://graph.facebook.com/v12.0/${PAGE_ID}/videos?fields=source,description,created_time&access_token=${PAGE_ACCESS_TOKEN}`)
            .then(response => response.json())
            .then(data => {
             videos = data.data;
               
                initial_trigger = videos.splice(0, 6); // This will take the first 4 videos and remove them from 'videos'
                 initial_trigger.forEach(function(video) {

                    var colDiv = document.createElement('div');
                    colDiv.className = 'col-lg-4 mt-2';

                    var videoContainer = document.createElement('div');
                    videoContainer.className = 'video-container card';

                    var videoElement = document.createElement('video');
                    videoElement.className = 'video';
                    videoElement.controls = true;

                    var sourceElement = document.createElement('source');
                    sourceElement.src = video.source;
                    sourceElement.type = 'video/mp4';

                    videoElement.appendChild(sourceElement);
                    videoContainer.appendChild(videoElement);
                    colDiv.appendChild(videoContainer);

                    document.getElementById('videos').appendChild(colDiv);
                 });

             })
            .catch(error => {
                console.error('Error fetching videos:', error);
                alert("Error fetching videos");
            });

    }

   getPageVideos();
   /////////////////////////////////////
   
window.addEventListener('scroll', function() {
    const videosElement = document.getElementById('videos');
    const scrollPosition = window.scrollY + window.innerHeight;
    const videosBottom = videosElement.offsetTop + videosElement.offsetHeight;

    if (scrollPosition >= videosBottom) {
    if (videos.length > 0) {
        var video = videos.shift(); // Get the next video and remove it from the array

        var colDiv = document.createElement('div');
        colDiv.className = 'col-lg-4 mt-2';

        var videoContainer = document.createElement('div');
        videoContainer.className = 'video-container card';

        var videoElement = document.createElement('video');
        videoElement.className = 'video';
        videoElement.controls = true;

        var sourceElement = document.createElement('source');
        sourceElement.src = video.source;
        sourceElement.type = 'video/mp4';

        videoElement.appendChild(sourceElement);
        videoContainer.appendChild(videoElement);
        colDiv.appendChild(videoContainer);

        document.getElementById('videos').appendChild(colDiv);
    }
    }
});

});
