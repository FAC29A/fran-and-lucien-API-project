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
      genreTitle.classList.add("carousel-genre-title");
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
const slideWidth = `${slideSize.width}px`;
console.log(slideSize)
console.log(containerSize)


//setting the height of the container
const containerHeight = `${slideSize.height + 200}px`;
// console.log(containerHeight)
container.style.height = containerHeight;
const slideHeight = `${slideSize.height * 6}px`;


// setting the width/height of the slides
slides.forEach(slide=>{
    slide.style.width = slideWidth;
    slide.style.height = slideHeight;
})

//setting the position of slides
for (let i=0; i<slides.length; i++){
    slides[i].style.left = `${(containerSize.width -170) *i}px` ;
    // slides[i].style.left = slideWidth * i
}


//clone slides:
const clonedSlides = slides.slice(0, 3).map(slide => slide.cloneNode(true));
clonedSlides.forEach(slide => {
  track.appendChild(slide);
});

// Update the number of slides and total width
const updatedSlides = Array.from(track.children);
const updatedSlideWidth = `${updatedSlides[0].getBoundingClientRect().width}px`;
track.style.width = `${updatedSlideWidth * updatedSlides.length}px`;

// Update the position of the slides
updatedSlides.forEach((slide, index) => {
  slide.style.left = `${updatedSlideWidth * index}px`;
});

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
    } else {
        // If it's the last slide, jump back to the first slide
        let firstSlide = updatedSlides[0];
        moveToSlide(track, currentSlide, firstSlide);
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
