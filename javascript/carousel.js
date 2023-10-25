const carouselData = [
    {
        genre: "Adult Fiction",
        image: "images/adult-fiction.jpeg",
        alt: "Lessons in Chemistry cover",
        search: "hardcover-fiction",
        id: "carousel-fiction",
        href: "bestsellers.html?category=hardcover-fiction"
    },
    {
        genre: "Adult Nonfiction",
        image: "images/adult-nonfiction.jpeg",
        alt: "Going Infinite cover",
        search: "hardcover-nonfiction",
        id: "carousel-nonfiction",
        href: "bestsellers.html?category=hardcover-nonfiction"
    },
    {
        genre: "Young Adult Fiction",
        image: "images/young-adult.jpeg",
        alt: "Curious Tides cover",
        search: "young-adult-hardcover",
        id: "carousel-young",
        href: "bestsellers.html?category=young-adult-hardcover"
    },
    {
        genre: "Children's Fiction (8-12)",
        image: "images/children8-12.jpeg",
        alt: "The Puppets of Spellhorst cover",
        search: "childrens-middle-grade-hardcover",
        id: "carousel-children",
        href: "bestsellers.html?category=childrens-middle-grade-hardcover"
    },
    {
        genre: "Picture Books",
        image: "images/picture.jpeg",
        alt: "Just Because cover",
        search: "picture-books",
        id: "carousel-picture",
        href: "bestsellers.html?category=picture-books"
    },
    {
        genre: "Graphic Books and Manga",
        image: "images/graphic.jpeg",
        alt: "Hooky cover",
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
      carouselLink.href = category.href;
      
    
      //create div containing the genre and image:
      const genreImageContainer = document.createElement('div');
      const genreImage = document.createElement('img');
      genreImage.src = category.image;
      genreImage.alt = category.alt;
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
      carouselListItem.addEventListener('click', (event) => {
          event.preventDefault(); 
          window.location.href = category.href;
      });
  
      genreCarousel.appendChild(carouselListItem); 
  }


carouselData.forEach(category=>{
    carouselLinks(category);
    
});


//making the carousel move:
const container = document.getElementById("genre_carousel_wrapper")
const track = document.querySelector(".carousel_track");
const slides = Array.from(track.children);
slides[0].classList.add("current-slide");

//navigation
const nextButton = document.querySelector(".carousel_button--right");
const prevButton = document.querySelector(".carousel_button--left");

//sizing
const containerSize = container.getBoundingClientRect();
container.style.height = "13rem";
slides.forEach(slide=>{
    slide.style.width = "9rem";
    slide.style.height = "10.3rem";
})

//setting the position of slides
for (let i=0; i<slides.length; i++){
    slides[i].style.left = `${155 *i}px` ;
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
