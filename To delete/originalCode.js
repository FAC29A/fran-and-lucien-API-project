const bestsellerForm = document.getElementById('bestsellers-form');
const bestsellersList = document.getElementById('bestsellers-list');
const apiKey = 'AzUyLIxzSLLZygRO896Q1msZZGAgH6V5'; 



// // function to create bestsellers links
// function createBestsellers(category) {
//   const categoryLink = document.createElement('a'); 
//   categoryLink.href = `bestsellers.html?category=${category.search}`;
//   categoryLink.id = category.search;
//   const title = document.createElement('h2');
//   title.innerHTML = category.category;
//   categoryLink.append(title);
//   categoryLink.className = "category-links";
//   bestsellersList.append(categoryLink);

//   categoryLink.addEventListener('click', () => {
//     fetchFunction(category);
//   });
// }


// Function to create bestsellers links
function createBestsellers(category) {
  const categoryLink = document.createElement('a');
  categoryLink.href = `bestsellers.html?category=${category.search}`;
  categoryLink.id = category.search;
  const title = document.createElement('h2');
  title.innerHTML = category.category;
  categoryLink.append(title);
  categoryLink.className = "category-links";
  bestsellersList.append(categoryLink);

  categoryLink.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default link behavior
    const category = categoryLink.id; // Get the category from the link's id
    fetchBooksForCategory(category);
  });
}



// Retrieve the category from the query parameter
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');

// Function to fetch and display the book list for the selected category
function fetchBooksForCategory(category) {
  const apiKey = 'AzUyLIxzSLLZygRO896Q1msZZGAgH6V5';
  fetch(`https://api.nytimes.com/svc/books/v3/lists/current/${category}.json?api-key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.status === 'OK' && data.results.books.length >= 5) {
        const top5Books = data.results.books.slice(0, 5);

        const pageTitle = document.getElementById('bestsellers-page-title');
        pageTitle.innerHTML = category;
        const results = document.getElementById('results');

        top5Books.forEach(book => {
          const bookDiv = document.createElement('div');
          bookDiv.innerHTML = `
            <img src="${book.book_image}" alt="Book Image">
            Title: ${book.title}
            Author: ${book.author}
            Description: ${book.description}
          `;
          results.appendChild(bookDiv);

          console.log('Title:', book.title);
          console.log('Author:', book.author);
          console.log('Description:', book.description);
          console.log('Image:', book.book_image);
          console.log('-------------------------');
        });
      } else {
        console.log('Error fetching data or not enough books in the category.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Call the fetchAndDisplayBooks function with the extracted category

categories.forEach(category => {
  createBestsellers(category);
});

// function fetchFunction(category) {
//   const Query = category.search;
//   fetch(`https://api.nytimes.com/svc/books/v3/lists/current/${Query}.json?api-key=${apiKey}`)
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       if (data.status === 'OK' && data.results.books.length >= 5) {
//         const top5Books = data.results.books.slice(0, 5);

//         top5Books.forEach(book => {
//           const pageTitle = document.getElementById('bestsellers-page-title')
//           pageTitle.innerHTML = category;
//           const results = document.getElementById('results');
//           const book = document.createElement('div');
//           book.innerHTML = 
//           `
//           ${book.book_image}
//           Title: ${book.title}
//           Author: ${book.author}
//           Description: ${book.description}
//           `
//           results.append(book);
//           console.log('Title:', book.title);
//           console.log('Author:', book.author);
//           console.log('Description:', book.description);
//           console.log('Image:', book.book_image);
//           console.log('-------------------------');
//         });
//       } else {
//         console.log('Error fetching data or not enough books in the category.');
//       }
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
// }
  

bestsellerForm.addEventListener("submit", function (event) {
  event.preventDefault(); 
  fetchFunction();
});

