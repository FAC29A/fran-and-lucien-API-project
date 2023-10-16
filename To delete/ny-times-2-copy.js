// My api key for NY times books
const apiKey = 'AzUyLIxzSLLZygRO896Q1msZZGAgH6V5';

const links = document.getElementsByClassName('category-links');

for (let i = 0; i<links.length; i++){
  links[i].addEventListener('click', (event) => {
    event.preventDefault(); // 
    const category = links[i].id; 
    
    fetch(`https://api.nytimes.com/svc/books/v3/lists/current/${category}.json?api-key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.status === 'OK') {
            const top5Books = data.results.books

            const pageTitle = document.getElementById('bestsellers-page-title');
            pageTitle.innerHTML = category;

            const results = document.getElementById('category-top-5');
            results.innerHTML = ''; // Clear existing content

            top5Books.forEach(book => {
                const bookDiv = document.createElement('div');
                bookDiv.innerHTML = `
                    <img src="${book.book_image}" alt="Book Image">
                    Title: ${book.title}
                    Author: ${book.author}
                    Description: ${book.description}
                `;
                results.appendChild(bookDiv);
            });
        } else {
            console.log('Error fetching data or not enough books in the category.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

});
bestsellersList.append(categoryLink);

}// end of for each

      
      
//create the categories cards
categories.forEach(category => {
    createBestsellersLink(category);
  });

