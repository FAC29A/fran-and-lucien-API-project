// My api key for NY times books
const apiKey = "61ppkdu3vYf9JrgMIljm72BZDuCAt8vO" 
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
    bookDiv.className = "result-text-dv"

    // bookDiv.className = "search-result";
    const bookTitle = top5Books[i].title.split(' ').map(x => x[0] + x.slice(1).toLowerCase()).join(' ');
    // const bookImage = top5Books[i].book_image;
   
    //create a book image div with the image:
    const bookImageDiv = document.createElement('div');
    const bookImage = document.createElement('img');
    bookImage.src = top5Books[i].book_image;
    // -------------Lucien change belowline
    // bookImage.className = "bookImage-bestseller";
    bookImage.className = "cover-image";
    bookImageDiv.appendChild(bookImage);
    
    bookDiv.innerHTML = `
        ${i + 1}.
        
    
        <p>Title: ${bookTitle}</p>
        <p>Author: ${top5Books[i].author}</p>
        // ------lucien move description to another div
        <p>Description: ${top5Books[i].description}</p>
    `;



    // <img src="${bookImage}" alt="Book Image"> taken from above

    const amazonLink = document.createElement('a');
    amazonLink.href = top5Books[i].amazon_product_url;
    amazonLink.textContent = 'Buy it on Amazon';

    bookDiv.appendChild(amazonLink);
    results.append(bookImageDiv, bookDiv);
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

});


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