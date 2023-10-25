// My api key for NY times books
const apiKey = "mUe2fT4eSndxgMFa9PYAyHeDtCPPhGxx";
const lucienapi = "61ppkdu3vYf9JrgMIljm72BZDuCAt8vO";
// old API = "AzUyLIxzSLLZygRO896Q1msZZGAgH6V5";

//The categories of books
const categories = [
  {
    category: "Fiction",
    search: "hardcover-fiction",
    image: "images/adult-fiction.jpeg",
  },
  {
    category: "Nonfiction",
    search: "hardcover-nonfiction",
    image: "images/adult-nonfiction.jpeg",
  },
  {
    category: "Young Adult",
    search: "young-adult-hardcover",
    image: "images/young-adult.jpeg",
  },
  {
    category: "Children's books, 8-12",
    search: "childrens-middle-grade-hardcover",
    image: "images/children8-12.jpeg",
  },
  {
    category: "Children's Picture Books",
    search: "picture-books",
    image: "images/picture.jpeg",
  },
  {
    category: "Graphic Books and Manga",
    search: "graphic-books-and-manga",
    image: "images/graphic.jpeg",
  },
];
// Bestsellers list displays each category of list (located in index page)
const bestsellersList = document.getElementById("bestsellers-list");

//Display results here: (located in bestseller page)
const results = document.getElementById("category-top-5");

// Function to create bestsellers categories links
function createBestsellersLink(category) {
  const categoryLink = document.createElement("a");
  categoryLink.href = `bestsellers.html?category=${category.search}`;
  categoryLink.id = category.search;

  const categoryTitleContainer = document.createElement("div");
  const categoryTitle = document.createElement("h3");
  categoryTitle.className = "category-title"; 
  categoryTitle.innerHTML = category.category;
  categoryTitleContainer.appendChild(categoryTitle);

  const categoryImageContainer = document.createElement("div");
  const categoryImage = document.createElement("img");
  categoryImage.src = category.image;
  categoryImageContainer.className = "category-link-image";
  categoryImageContainer.appendChild(categoryImage);

  categoryLink.append(categoryTitleContainer, categoryImageContainer);
  categoryLink.className = "category-links";

  categoryLink.addEventListener("click", (event) => {
    event.preventDefault();
    const category = categoryLink.id;
    window.location.href = `bestsellers.html?category=${category}`;
  });

  bestsellersList.appendChild(categoryLink);
}

// Function to fetch and display the book list for the selected category
function fetchBooksForCategory(category) {
  fetch(
    `https://api.nytimes.com/svc/books/v3/lists/current/${category}.json?api-key=${lucienapi}`
  )
    .then((response) => {
      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Sorry, list not available at this time.");
        } else {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
      } else {
        return response.json();
      }
    })
    .then((data) => {
      const top5Books = data.results.books;
      const pageTitle = document.getElementById("bestsellers-page-title");
      pageTitle.innerHTML = category;

      let headingElement = document.getElementById("category-title");
      let heading = category;
      let headingArray = heading.split("-");
      let headingCapitalized = [];
      for (const word of headingArray) {
        headingCapitalized.push(word[0].toUpperCase() + word.slice(1));
      }
      let result = headingCapitalized.join(" ");
      headingElement.innerHTML = result;
      results.innerHTML = ""; // Clear existing content

      //For loop to get info from each book

      for (let i = 0; i < 10; i++) {
        const bookDiv = document.createElement("div");
        bookDiv.className = "title-author-div";

        const descriptionAndAmazonDiv = document.createElement("div");
        descriptionAndAmazonDiv.className = "result-text-dv";

        const searchResult = document.createElement("div");
        searchResult.className = "search-result";

        const resultTopLine = document.createElement("div");
        resultTopLine.className = "result-top-line";

        const bookTitle = top5Books[i].title
          .split(" ")
          .map((x) => x[0] + x.slice(1).toLowerCase())
          .join(" ");

        const bookImageDiv = document.createElement("div");
        bookImageDiv.className = "cover-div";

        const bookImage = document.createElement("img");
        bookImage.src = top5Books[i].book_image;

        bookImage.className = "cover-image";
        bookImageDiv.appendChild(bookImage);

        bookDiv.innerHTML = `
        ${i + 1}.
        
  
        <p class="result-item-title">${bookTitle}</p>
        <p class="author-italic">${top5Books[i].author}</p>
       
    `;

        descriptionAndAmazonDiv.innerHTML = `

    <p>Description: ${top5Books[i].description}</p>

    `;

        const amazonLink = document.createElement("a");
        amazonLink.href = top5Books[i].amazon_product_url;
        amazonLink.textContent = "Buy it on Amazon";

        // level 3:  amazon link append to description and amazonLinkDiv
        descriptionAndAmazonDiv.appendChild(amazonLink);

        //level 2:  title/author div append to a medium div that contain  3 elements ( text, title, image)
        searchResult.appendChild(bookDiv);

        // level 2: description and amazon link append to a medium div that contain  3 elements ( text, title, image)
        searchResult.appendChild(descriptionAndAmazonDiv);

        //level 2:  image div append to a medium div that contain  3 elements ( text, title, image)
        searchResult.appendChild(bookImageDiv);

        // level 1: medium div that contain  3 elements ( text, title, image)  append to the div for topline purpose
        resultTopLine.appendChild(searchResult);

        // level 0: append the topline purpose div to result div (this result div is from getElementById)
        results.appendChild(resultTopLine);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      results.textContent = error.message;
      results.style.textAlign = "center";
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");

  fetchBooksForCategory(category);

  categories.forEach((category) => {
    createBestsellersLink(category);
  });

  indexTop5Rendering();
});

//Render top books to index.html
function indexTop5Rendering() {
  const top5Content = document.getElementById("top5-content");

  const backUpBooks = [
    {
      image: "images/adult-fiction.jpeg",
      title: "Lessons in Chemistry",
      author: "Bonnie Garmus",
      alt: "Lessons in Chemistry cover",
      description:
        "A scientist and single mother living in California in the 1960s becomes a star on a TV cooking show.",
    },
    {
      image: "images/swordCatcher.jpg",
      title: "Sword Catcher",
      author: "Cassandra Clare",
      alt: "Sword Catcher book cover",
      description:
        "An orphan who is the body double for a royal heir and a woman with magical abilities are drawn into the underworld of the city-state of Castellane.",
    },
    {
      image: "images/holly.jpg",
      title: "Holly",
      author: "Stephen King",
      alt: "Holly cover",
      description:
        "The private detective Holly Gibney investigates whether a married pair of octogenarian academics had anything to do with Bonnie Dahl’s disappearance.",
    },
  ];

  fetch(
    `https://api.nytimes.com/svc/books/v3/lists/current/combined-print-and-e-book-fiction.json?api-key=${lucienapi}`
  )
    .then((response) => {
      if (!response.ok) {
        if (response.status === 429) {
          // Handle 429 error
          const heading = document.getElementById("top3");
          heading.innerHTML = "Recommended Reads";

          for (let j = 0; j < 3; j++) {
            const indexBookRankDiv = document.createElement("div");
            indexBookRankDiv.className = "index-book-rank-div";

            indexBookRankDiv.innerHTML = `
            <p class="index-rank">No.${j + 1}</p>
            `;

            const indexTitleAuthorDiv = document.createElement("div");
            indexTitleAuthorDiv.className = "index-title-author-div";
            indexTitleAuthorDiv.innerHTML = `
            <p class="index-top-5-title">${backUpBooks[j].title}</p>
            <p class="index-top-5-author">by ${backUpBooks[j].author}</p>
            `;

            const indexCoverImageDiv = document.createElement("div");
            indexCoverImageDiv.className = "index-cover-image-div";
            indexCoverImageDiv.innerHTML = `
            <img class="index-cover-image" alt="cover for ${backUpBooks[j].alt}" src= " ${backUpBooks[j].image}"">
            `;

            const indexBestsellerItemDiv = document.createElement("div");
            indexBestsellerItemDiv.className = "index-bestseller-item-div";

            // level 3: each bestseller item append 3 children element ( rank, title/author, cover)
            indexBestsellerItemDiv.appendChild(indexBookRankDiv);
            indexBestsellerItemDiv.appendChild(indexTitleAuthorDiv);
            indexBestsellerItemDiv.appendChild(indexCoverImageDiv);

            // level 2: each bestseller item (in top 5 list there are 5 items) then be appended to a parent div
            top5Content.appendChild(indexBestsellerItemDiv);
          }

          throw new Error("Sorry, list not available at this time.");
        } else {
          // Handle other errors
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
      } else {
        return response.json();
      }
    })
    .then((data) => {
      console.log(data);
      const indexPageTop5 = data.results.books;

      for (let j = 0; j < 3; j++) {
        const indexBookRankDiv = document.createElement("div");
        indexBookRankDiv.className = "index-book-rank-div";

        indexBookRankDiv.innerHTML = `
              <p class="index-rank">No.${indexPageTop5[j].rank}</p>
              `;

        const indexTitleAuthorDiv = document.createElement("div");
        indexTitleAuthorDiv.className = "index-title-author-div";
        indexTitleAuthorDiv.innerHTML = `
              <p class="index-top-5-title">${indexPageTop5[j].title}</p>
              <p class="index-top-5-author">by ${indexPageTop5[j].author}</p>
              `;

        const indexCoverImageDiv = document.createElement("div");
        indexCoverImageDiv.className = "index-cover-image-div";
        indexCoverImageDiv.innerHTML = `
              <img class="index-cover-image" alt="cover for ${indexPageTop5[j].title}" src= " ${indexPageTop5[j].book_image}"">
              `;

        const indexBestsellerItemDiv = document.createElement("div");
        indexBestsellerItemDiv.className = "index-bestseller-item-div";

        // level 3: each bestseller item append 3 children element ( rank, title/author, cover)
        indexBestsellerItemDiv.appendChild(indexBookRankDiv);
        indexBestsellerItemDiv.appendChild(indexTitleAuthorDiv);
        indexBestsellerItemDiv.appendChild(indexCoverImageDiv);

        // level 2: each bestseller item (in top 5 list there are 5 items) then be appended to a parent div
        top5Content.appendChild(indexBestsellerItemDiv);
      }
    });
}
