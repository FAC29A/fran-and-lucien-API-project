const form = document.getElementById("book-search-form")

form.addEventListener("submit", function (event) {
        event.preventDefault(); 

        const searchQuery = document.getElementById("search-query").value;
        const perPage = 10; // Limit to 6 results per page
        const page = 1; // Page number, start with 1 for the first page
        const apiUrl = `https://openlibrary.org/search.json?q=${searchQuery}&limit=${perPage}&page=${page}`;


        // Make a request to the Open Library Search API
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) throw new Error(response.status);
                return response.json(); 
                  })
            .then(data => {
                const searchResults = document.getElementById("search-results");
                searchResults.innerHTML = ""; // Clear previous results

                if (data.docs.length > 0) {
                    for (const index in data.docs) {
                        const book = data.docs[index];
                        console.log(data);
                        const title = book.title;
                        const authors = book.author_name ? book.author_name.join(", ") : "Unknown";
                        const firstPublishYear = book.first_publish_year ? book.first_publish_year : "N/A";
                        const bookRatings = book.ratings_average ? book.ratings_average.toFixed(1) : "Rating not found";
                        console.log(book.subject_key);
                        const resultItem = document.createElement("div");
                        resultItem.style.backgroundImage = 'url("./images/book7.png")';
                        const category = book.subject_key && book.subject_key.length >= 6 ? book.subject_key[5] : "Category not found";

                        // Lucien added
                        const olIdentifier = extractOLIdentifier(book.seed[1]); // Extract OL identifier
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

                



                        //div styling- will add to CSS later
                        resultItem.style.width = "60vw";
                        resultItem.style.height = "40vh";
                        resultItem.style.backgroundSize = "cover";
                        resultItem.style.padding = "40px";
                        resultItem.style.margin = "20px";
                        resultItem.innerHTML =
                            `<p><strong>Title:</strong> ${title}</p>
                             <p><strong>Author(s):</strong> ${authors}</p>
                             <p>Rating: ${bookRatings}</p>
                             <p>Category: ${category}</p>
                             <p>First Publish Year: ${firstPublishYear}</p>`;
                        searchResults.appendChild(resultItem);
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

    // Lucien added below three functions for cover
    
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



    

