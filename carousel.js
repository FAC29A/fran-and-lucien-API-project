const carouselData = [
    {
        genre: "Adult Fiction",
        image: "images/adult-fiction.jpeg",
        search: "hardcover-fiction",
        id: "carousel-fiction",
        href: "bestsellers.html?category=hardcover-fiction"
    },
    {
        genre: "Adult Nonfiction",
        image: "images/adult-nonfiction.jpeg",
        search: "hardcover-nonfiction",
        id: "carousel-nonfiction",
        href: "bestsellers.html?category=hardcover-nonfiction"
    },
    {
        genre: "Young Adult Fiction",
        image: "images/young-adult.jpeg",
        search: "young-adult-hardcover",
        id: "carousel-young",
        href: "bestsellers.html?category=young-adult-hardcover"
    },
    {
        genre: "Children's Fiction (8-12)",
        image: "images/children8-12.jpeg",
        search: "childrens-middle-grade-hardcover",
        id: "carousel-children",
        href: "bestsellers.html?category=childrens-middle-grade-hardcover"
    },
    {
        genre: "Picture Books",
        image: "images/picture.jpeg",
        search: "picture-books",
        id: "carousel-picture",
        href: "bestsellers.html?category=picture-books"
    },
    {
        genre: "Graphic Books and Manga",
        image: "images/graphic.jpeg",
        search: "graphic-books-and-manga",
        id: "carousel-graphic",
        href: "bestsellers.html?category=graphic-books-and-manga"
    },

]

function carouselLinks(category) {
    //div to contain all links (this is a ul)
    const genreCarousel = document.getElementById('carousel_track')

      //create list elements (each contains <a> with image and genre name)
      const carouselListItem = document.createElement('li');
      carouselListItem.className = 'carousel_slide';

      const carouselLink = document.createElement('a');
      carouselLink.id = category.id
      
    
      //create div containing the genre and image:
      const genreImageContainer = document.createElement('div');
      const genreImage = document.createElement('img');
      genreImage.src = category.image;
      genreImage.className = 'carousel_img';
      genreImageContainer.className = 'carousel-img-container';
      genreImageContainer.appendChild(genreImage);
      const genreTitle = document.createElement('h3');
      genreTitle.innerHTML = category.genre;
      carouselLink.append(genreImageContainer, genreTitle);

      //Append <a> element to <li> item
      carouselListItem.appendChild(carouselLink)
  
      // Attach a click event to each category link
      carouselLink.addEventListener('click', (event) => {
          event.preventDefault(); // Prevent the default link behavior
        //   const category = category.genre; // Get the category from the link's id
          window.location.href = category.href;
      });
  
      genreCarousel.appendChild(carouselListItem); 
  }


carouselData.forEach(category=>{
    carouselLinks(category)
});


//making the carousel move:
const container = document.getElementById("genre_carousel_wrapper")
const track = document.querySelector(".carousel_track");
const slides = Array.from(track.children);
slides[0].classList.add("current-slide");

//navigation
const nextButton = document.querySelector(".carousel_button--right");
const prevButton = document.querySelector(".carousel_button--left");
// const dotNav = document.querySelector(".carousel_nav");
// console.log(dotNav)
// const dots = Array.from(dotNav.children);

//sizing
const containerSize = container.getBoundingClientRect();
console.log(containerSize)
const slideSize = slides[0].getBoundingClientRect();
const slideWidth = `${containerSize.width * 0.3}px`;

// console.log(containerSize)


//setting the height of the container
const containerHeight = `${slideSize.height + 200}px`;
// console.log(containerHeight)
container.style.height = containerHeight;
const slideHeight = `${containerHeight * 0.9}px`;

// setting the width/height of the slides
slides.forEach(slide=>{
    slide.style.width = slideWidth;
    slide.style.height = slideHeight;
})

//setting the position of slides
for (let i=0; i<slides.length; i++){
    slides[i].style.left = `${(containerSize.width -150) *i}px` ;
    // slides[i].style.left = slideWidth * i
}

function moveToSlide(track, currentSlide, targetSlide){
    track.style.transform = 'translateX(-' + targetSlide.style.left+ ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

//next button
function moveNext(){
    let currentSlide = track.querySelector(".current-slide");
    if(currentSlide.nextElementSibling){
        let nextSlide = currentSlide.nextElementSibling;
        moveToSlide(track, currentSlide, nextSlide);
    }
    
}

nextButton.addEventListener("click", moveNext);


//Prev button
function movePrev(){
    let currentSlide = track.querySelector(".current-slide");
    if(currentSlide.previousElementSibling){
    let prevSlide = currentSlide.previousElementSibling;
    moveToSlide(track, currentSlide, prevSlide);
    }
}
prevButton.addEventListener("click", movePrev)
