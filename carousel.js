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
        image: "images/adult-fiction.jpeg",
        search: "hardcover-nonfiction",
        id: "carousel-nonfiction",
        href: "bestsellers.html?category=hardcover-nonfiction"
    },
    {
        genre: "Young Adult Fiction",
        image: "images/adult-fiction.jpeg",
        search: "young-adult-hardcover",
        id: "carousel-young",
        href: "bestsellers.html?category=young-adult-hardcover"
    },
    {
        genre: "Children's Fiction (8-12)",
        image: "images/adult-fiction.jpeg",
        search: "childrens-middle-grade-hardcover",
        id: "carousel-children",
        href: "bestsellers.html?category=childrens-middle-grade-hardcover"
    },
    {
        genre: "Picture Books",
        image: "images/adult-fiction.jpeg",
        search: "picture-books",
        id: "carousel-picture",
        href: "bestsellers.html?category=picture-books"
    },
    {
        genre: "Graphic Books and Manga",
        image: "images/adult-fiction.jpeg",
        search: "graphic-books-and-manga",
        id: "carousel-graphic",
        href: "bestsellers.html?category=graphic-books-and-manga"
    },

]

function carouselLinks(category) {
    //div to contain all links:
    const genreCarousel = document.getElementById('genre-carousel')

      //create links element
      const carouselLink = document.createElement('a');
      carouselLink.id = category.id
      
    
      //create div containing the genre and image:
      const genreImage = document.createElement('img');
      genreImage.src = category.image;
      const genreTitle = document.createElement('h3');
      genreTitle.innerHTML = category.genre;
      carouselLink.append(genreImage, genreTitle);

  
      // Attach a click event to each category link
      carouselLink.addEventListener('click', (event) => {
          event.preventDefault(); // Prevent the default link behavior
        //   const category = category.genre; // Get the category from the link's id
          window.location.href = category.href;
      });
  
      genreCarousel.appendChild(carouselLink); 
  }


carouselData.forEach(category=>{
    carouselLinks(category)
});

