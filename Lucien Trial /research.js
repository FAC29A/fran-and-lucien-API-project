const form = document.getElementById("book-search-form")
const submit = document.getElementById("submit");


form.addEventListener("submit", function (event) {
        event.preventDefault(); 
        

        const searchQuery = document.getElementById("search-query").value;
        const perPage = 8; // Limit to 8 results per page
        const page = 1; // Page number, start with 1 for the first page
        const apiUrl = `https://openlibrary.org/search.json?q=${searchQuery}&limit=${perPage}&page=${page}`;

        // Redirect to the results page with the author name as a query parameter
        window.location.href = `result.html?q=${searchQuery}`;





        // Make a request to the Open Library Search API
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) throw new Error(response.status);
                return response.json(); 
                
                  })
            .then(data =>{
                console.log(data)
                const booksWithRatings = data.docs.filter(result => result.hasOwnProperty('ratings_average'));
                const booksWithoutRatings = data.docs.filter(result => !result.hasOwnProperty('ratings_average'));

                // Sort books with ratings_average in descending order
                booksWithRatings.sort((a, b) => b.ratings_average - a.ratings_average);

                // Combine books with ratings and books without ratings(up to 8 results)
                data.docs = booksWithRatings.concat(booksWithoutRatings);
                

                const searchResults = document.getElementById("search-result");
                searchResults.innerHTML = ""; // Clear previous results

                if (data.docs.length > 0) {
                    for (const index in data.docs) {
                        const book = data.docs[index];
                        
                        const title = book.title;
                        const authors = book.author_name ? book.author_name.join(", ") : "Unknown";
                        //need to filter authors to make sure they are unique

                        const firstPublishYear = book.first_publish_year ? book.first_publish_year : "N/A";
                        const bookRatings = book.ratings_average ? book.ratings_average.toFixed(1) : "Rating not found";
                        const subject = book.subject_key && book.subject_key.length >= 6 ? book.subject_key[5].replaceAll("_", " ") : "Category not found";
                        const category = subject.slice(0,1).toUpperCase()+subject.slice(1);
                        
                        const resultItem = document.createElement("div");
                        resultItem.className = "search-result";
                       
                        resultItem.innerHTML =
                            `<p><strong>Title:</strong> ${title}</p>
                             <p><strong>Author(s):</strong> ${authors}</p>
                             <p><strong>Rating:</strong> ${bookRatings}</p>
                             <p><strong>Category:</strong> ${category}</p>
                             <p><strong>First Published:</strong> ${firstPublishYear}</p>`;
                        searchResults.appendChild(resultItem);
                       

                        // Lucien added
                        const olIdentifier = extractOLIdentifier(book.seed[0]); // Extract OL identifier
                        fetchBookCover(olIdentifier)
                        .then((bookCoverURL) => {
                            const img = document.createElement('img');
                            img.src = bookCoverURL;
                            resultItem.appendChild(img);

                            })
                        .catch((error) => {
                            console.log(`Error fetching book cover for ${book.title}: ${error.message}`);
                           
                            });
                        // end of Lucien added

                

                        
                    }
                }
                
                else {
                    searchResults.innerHTML = "No results found.";
                }


            }) //end of then 
            .catch(error => {
                console.error("Error fetching data from Open Library API:", error);
                const searchResults = document.getElementById("search-results");
                searchResults.innerHTML = "An error occurred while fetching data.";
            });
    });

    // Lucien added below two functions for cover
    
    function extractOLIdentifier(key) {
        // Remove "/books/" from the key string
        return key.replace('/books/', '');
    }

    async function fetchBookCover(olid) {
        return fetch(`https://covers.openlibrary.org/b/olid/${olid}-M.jpg`)
        .then((response) => {
            if (!response.ok) throw new Error(response.status);
            return response.url; // Return the URL of the book cover image
        })
        .catch((error) => {
            console.log(`Error fetching book cover for ${olid}: ${error.message}`);
            throw error;
        });
    }

    // end of lucien add



    

