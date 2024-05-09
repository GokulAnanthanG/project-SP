function getUrlParameter(name) {
    // Get the query string from the URL
    var queryString = window.location.search;
    
    // Create a URLSearchParams object from the query string
    var searchParams = new URLSearchParams(queryString);
    
    // Return the value of the parameter with the specified name
    return searchParams.get(name);
}

// Example usage
var paramValue = getUrlParameter('paramName');
console.log(paramValue); // Output: The value of the parameter 'paramName'

let index;
document.addEventListener('DOMContentLoaded', function() {
    //getpost
    getPagePosts();
    function getUrlParameter(name) {
         var queryString = window.location.search;
        
       
        var searchParams = new URLSearchParams(queryString);
        
        
        return searchParams.get(name);
    }
    
    
    var paramValue = getUrlParameter('index');
    index=paramValue;
    
});

var PAGE_ACCESS_TOKEN = 'EAAVX5c18p0kBOytEwoGRTwOMCuax4WT6nvPrAnpMsDDEMYvslQZCBGKUGzv9Ac6dSdENut3gMwckj11cjbqf9ZBJHaofY0BjhCZAjngeaUq4rzZCKsgx80hjqvgkZCxbM3CJp2D2Rh5JjAUDkMNUXZB9coTq5kuzg9qPQoAWJxZA7syh4nZCZAdFhNmPtZCajikTIZD';

    var PAGE_ID = '140032333456457';
   
   function getPagePosts() {
         fetch(`https://graph.facebook.com/v12.0/${PAGE_ID}/posts?fields=message,full_picture,created_time,place,attachments&access_token=${PAGE_ACCESS_TOKEN}`)
           .then(response => response.json())
           .then(data => {
               var posts = data.data.splice(0,20);
               var postsWithImages = [];
               console.log(postsWithImages);
               posts.forEach(function(post) {
                document.querySelector(".spinner").style.display="none"
                   var message = post.message ? post.message : 'No message available';
                   var options = { weekday: 'short', month: 'short', year: 'numeric' };
                   var createdTime = new Date(post.created_time).toLocaleDateString('en-US', options);
                   var location = post.place ? post.place.location : null;
                   var locationHtml = '';
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
    let data=postsWithImages[index];
       
          var locationHtml = data.location ? `<span>${data.location.city}, ${data.location.country}</span>` : '';
        document.getElementById("topImg").src=data.images[0];
        document.getElementById("content").innerText=data.message;
        document.getElementById("date").innerText=data.createdTime;
        document.getElementById("location").innerHTML=locationHtml;

        if(data.images.length>1){
            data.images.forEach(e=>{
                let div=document.createElement("div");
                div.classList.add("col-lg-4");
                div.classList.add("mt-2");
                let img=document.createElement("img");
                img.src=e;
                img.classList.add("img-fluid")
                img.classList.add("img-thumbnail")
                div.appendChild(img);
                document.querySelector(".images").appendChild(div);
            })
        }
        else{
            document.getElementById("status").innerText="no photos attached"
        }
    }

