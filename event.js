

document.addEventListener('DOMContentLoaded', function() {
    //getpost
    getPagePosts();

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
       
       postsWithImages.forEach(function(post,i) {
           var locationHtml = post.location ? `<span>${post.location.city}, ${post.location.country}</span>` : '';
           let div= document.createElement("div");
           div.classList.add("flex")
div.setAttribute("data-aos","fade-up");
div.setAttribute("data-aos-duration","1000");
div.setAttribute("data-aos-once","true");
div.setAttribute("data-aos-delay","1000");

let box1=document.createElement("div");
box1.classList.add("box1");
box1.classList.add("box");

let imgE=document.createElement("img");
imgE.src=post.images[0];
imgE.classList.add("img-fluid");
imgE.classList.add("img-thumbnail");
box1.appendChild(imgE);

let box2=document.createElement("div");
box2.classList.add("box2");
box2.classList.add("box");

let p=document.createElement("p");
p.setAttribute("align","justify")
p.innerText=post.message;
box2.appendChild(p)
let row=document.createElement("div");
row.classList.add("row");

let row_div1=document.createElement("div");
row_div1.classList.add("col-4");
row_div1.innerHTML=`<span class="date"><i class="fas fa-calendar-alt"></i> ${post.createdTime}</span>`;

let row_div2=document.createElement("div");
row_div2.classList.add("col-4");
row_div2.innerHTML=`<span class="location"> <i class='fas fa-map-marker-alt'></i> ${locationHtml?`<span>${locationHtml}<span>`:"not mentioned"} </span>`;

let row_div3=document.createElement("div");
row_div3.classList.add("col-4");
row_div3.innerHTML=`<a href="viewEvent.html?index=${i}"><button class="btn btn-outline-secondary">Details</button></a> `;;

row.appendChild(row_div1);
row.appendChild(row_div2);
row.appendChild(row_div3);

box2.appendChild(row)
div.appendChild(box1);
div.appendChild(box2);

document.getElementById('posts').appendChild(div);
let hr=document.createElement("hr")
document.getElementById('posts').appendChild(hr);

        });
    }

