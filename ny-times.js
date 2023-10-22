// My api key for NY times books
const apiKey = "mUe2fT4eSndxgMFa9PYAyHeDtCPPhGxx" 
// Frans latest api = 'mUe2fT4eSndxgMFa9PYAyHeDtCPPhGxx';
// old API = "AzUyLIxzSLLZygRO896Q1msZZGAgH6V5";
// lucien api = "61ppkdu3vYf9JrgMIljm72BZDuCAt8vO" 

//The categories of books
const categories = [
  {
    category: "Fiction",
    search: "hardcover-fiction"
  },
  {
    category: "Nonfiction",
    search: "hardcover-nonfiction"
  },
  // {
  //   category: "Paperback Fiction",
  //   search: "trade-fiction-paperback"
  // },
  // {
  //   category: "Paperback Non-Fiction",
  //   search: "paperback-nonfiction"
  // },
  {
    category: "Young Adult",
    search: "young-adult-hardcover"
  },
  {
    category: "Children's books, 8-12",
    search: "childrens-middle-grade-hardcover"
  },
  {
    category: "Children's Picture Books",
    search: "picture-books"
  },
  {
    category: "Graphic Books and Manga",
    search: "graphic-books-and-manga"
  }
  
]
// Bestsellers list displays each category of list (located in index page)
const bestsellersList = document.getElementById('bestsellers-list');

//Display results here: (located in bestseller page)
const results = document.getElementById('category-top-5');

// Function to create bestsellers categories links
function createBestsellersLink(category) {
  //create a links element
    const categoryLink = document.createElement('a');
    //give the link for the href with the specific category we are searching for
    categoryLink.href = `bestsellers.html?category=${category.search}`;
    categoryLink.id = category.search;
    // console.log(category.search)

    //create title for each link with category name
    const categoryTitle = document.createElement('h3');
    categoryTitle.innerHTML = category.category;

    //append each categoryTitle to each link
    categoryLink.append(categoryTitle);

    //give links class name for styling
    categoryLink.className = "category-links";

    // Attach a click event to each category link
    categoryLink.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default link behavior
        const category = categoryLink.id; // Get the category from the link's id
        // Reassign the current window to a new href(to Bestsellers.html with the category as a query parameter)
        window.location.href = `bestsellers.html?category=${category}`;
    });

    bestsellersList.appendChild(categoryLink);
}




// Function to fetch and display the book list for the selected category
function fetchBooksForCategory(category) {
    fetch(`https://api.nytimes.com/svc/books/v3/lists/current/${category}.json?api-key=${apiKey}`)
    .then((response) => {
      if (!response.ok) {
        // if (response.status === 429) {
        //   // Handle 429 error
        //   throw new Error("Sorry, list not available at this time.");
        // } else {
        //   // Handle other errors
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        // }
      } else {
        return response.json();
      }
        })
        .then(data => {
            console.log(data);
            const top5Books = data.results.books
                const pageTitle = document.getElementById('bestsellers-page-title');
                pageTitle.innerHTML = category;

                let headingElement = document.getElementById('category-title');
                let heading = category;
                let headingArray = heading.split('-');
                let headingCapitalized = [];
                for (const word of headingArray) {
                  headingCapitalized.push(word[0].toUpperCase() + word.slice(1));
                 }
                let result = headingCapitalized.join(' ');
                headingElement.innerHTML = result;
                
                
                results.innerHTML = ''; // Clear existing content

                

//For loop to get info from each book

for (let i = 0; i < 10; i++) {



    const bookDiv = document.createElement('div');
    // ------Lucien create classname
    bookDiv.className = "title-author-div"; 

    // ----Lucien create a div for description  and amazon link 
    const descriptionAndAmazonDiv = document.createElement('div'); 
    descriptionAndAmazonDiv.className = "result-text-dv"; 

    //-----Lucien : this is the container div that has 3 elements in it (image, text, title/author)
    const searchResult = document.createElement('div'); 
    searchResult.className = "search-result"; 

    // ------lucien: this is container for topline purpose and it wrap around the div that contain 3 elements image, text, title/author)
    const resultTopLine = document.createElement('div'); 
    resultTopLine.className = "result-top-line"



    // bookDiv.className = "search-result";
    const bookTitle = top5Books[i].title.split(' ').map(x => x[0] + x.slice(1).toLowerCase()).join(' ');
    // const bookImage = top5Books[i].book_image;
   
    //create a book image div with the image:
    const bookImageDiv = document.createElement('div');
    bookImageDiv.className = "cover-div"; 

    const bookImage = document.createElement('img');
    bookImage.src = top5Books[i].book_image;
    // -------------Lucien change belowline
    // bookImage.className = "bookImage-bestseller";
    bookImage.className = "cover-image";
    bookImageDiv.appendChild(bookImage);
    
    bookDiv.innerHTML = `
        ${i + 1}.
        
    
        <p class="result-item-title">${bookTitle}</p>
        <p class="author-italic">${top5Books[i].author}</p>
       
    `;

  //  --------Lucien add inner html to the new created div of description and amazon link 
    descriptionAndAmazonDiv.innerHTML = `

    <p>Description: ${top5Books[i].description}</p>

    `



    // <img src="${bookImage}" alt="Book Image"> taken from above

    const amazonLink = document.createElement('a');
    amazonLink.href = top5Books[i].amazon_product_url;
    amazonLink.textContent = 'Buy it on Amazon';


    // -----lucien change to append to description and amazon link div 
    // bookDiv.appendChild(amazonLink);

    // level 0  remember to figure this out in the last step 
    // results.append(bookImageDiv, bookDiv);
    // new added 

    // level 3:  amazon link append to description and amazonLinkDiv 
    descriptionAndAmazonDiv.appendChild(amazonLink); 

     //level 2:  title/author div append to a medium div that contain  3 elements ( text, title, image) 
     searchResult.appendChild(bookDiv); 

    // level 2: description and amazon link append to a medium div that contain  3 elements ( text, title, image) 
      searchResult.appendChild(descriptionAndAmazonDiv); 


    //level 2:  image div append to a medium div that contain  3 elements ( text, title, image) 
    searchResult.appendChild(bookImageDiv); 


    // level 1: medium div that contain  3 elements ( text, title, image)  append to the div for topline purpose
    resultTopLine.appendChild(searchResult)

    // level 0: append the topline purpose div to result div (this result div is from getElementById)
    results.appendChild(resultTopLine)




}

        })
        .catch(error => {
            console.error('Error:', error);   
            results.textContent = error.message;
        });


}




document.addEventListener("DOMContentLoaded", function () {
// Retrieve the category from the query parameter (e.g. "?category=hardcover-fiction")
const urlParams = new URLSearchParams(window.location.search);
//urlParams.get('category') retrieves the value associated 
//with the "category" key from the query string, 
//which is "hardcover-fiction" in this example, 
//and assigns it to the category variable.
const category = urlParams.get('category');

// Call the fetchBooksForCategory function with the extracted category
fetchBooksForCategory(category);

//create the categories cards
categories.forEach(category => {
  createBestsellersLink(category);
});
// Lucien trial
indexTop5Rendering()
// end of Lucien trial 

});


// lucien trial for fetch info oon the index page 

function indexTop5Rendering() {
const top5Content = document.getElementById("top5-content"); 

fetch("https://api.nytimes.com/svc/books/v3/lists/current/combined-print-and-e-book-fiction.json?api-key=mUe2fT4eSndxgMFa9PYAyHeDtCPPhGxx")
    .then((response) => {
      if (!response.ok) {
       
          throw new Error(`Error ${response.status}: ${response.statusText}`);
      
      } else {
        return response.json();
      }
        })
        .then(data => {
            console.log(data);
            const indexPageTop5 = data.results.books; 

            for (let j = 0; j <3; j++) {

              const indexBookRankDiv = document.createElement('div');
              indexBookRankDiv.className = "index-book-rank-div"; 

              indexBookRankDiv.innerHTML = `
              <p class="index-rank">No.${indexPageTop5[j].rank}</p>
              `

              const indexTitleAuthorDiv = document.createElement('div');
              indexTitleAuthorDiv.className = "index-title-author-div"; 
              indexTitleAuthorDiv.innerHTML = `
              <p class="index-top-5-title">${indexPageTop5[j].title}</p>
              <p class="index-top-5-author">by ${indexPageTop5[j].author}</p>
              `

              const indexCoverImageDiv = document.createElement('div'); 
              indexCoverImageDiv.className = "index-cover-image-div"
              indexCoverImageDiv.innerHTML = `
              <img class="index-cover-image" alt="cover for ${indexPageTop5[j].title}" src= " ${indexPageTop5[j].book_image}"">
              `

              const indexBestsellerItemDiv = document.createElement('div')
              indexBestsellerItemDiv.className = "index-bestseller-item-div"

              // level 3: each bestseller item append 3 children element ( rank, title/author, cover)
              indexBestsellerItemDiv.appendChild(indexBookRankDiv); 
              indexBestsellerItemDiv.appendChild(indexTitleAuthorDiv); 
              indexBestsellerItemDiv.appendChild(indexCoverImageDiv); 

              // level 2: each bestseller item (in top 5 list there are 5 items) then be appended to a parent div 
              top5Content.appendChild(indexBestsellerItemDiv); 


              }
          
          
          }
               
        )



}



// end of Lucien trial 


// Old Code



                // top5Books.forEach(book => {
                //     const bookDiv = document.createElement('div');
                //     let bookTitle = book.title.split(' ').map(x=> x[0]+x.slice(1).toLowerCase()).join(' ');
                    

                //     bookDiv.innerHTML = `
                //         <img src="${book.book_image}" alt="Book Image">
                //         <p>Title: ${bookTitle}</p>
                //         <p>Author: ${book.author}</p>
                //         <p>Description: ${book.description}</p>
                //     `;
                //     let amazonLink = document.createElement('a');
                //     amazonLink.href = book.amazon_product_url;
                //     amazonLink.textContent = 'Buy it on Amazon';
                    
                //     bookDiv.appendChild(amazonLink); // 

                //     results.appendChild(bookDiv);
                // });

            // } else {
            //     console.log('Error fetching data or not enough books in the category.');
            // }