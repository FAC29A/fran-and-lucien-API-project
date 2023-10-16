
// create a object key-value pairs extract from research.js, window.location.search will be ?q=harry+potter
const urlParams = new URLSearchParams(window.location.search);
//to get the value of the object, which would be the researh keyword client type in
const searchQuery = urlParams.get("q");

// search keywords to be also showed on the result page 
const researchH2 = document.getElementById("query-name")
researchH2.innerText = searchQuery; 

// create the no coverimage block
const noCoverImageDiv = document.createElement("div");
noCoverImageDiv.style.width = "120px";
noCoverImageDiv.style.height = "150px";
noCoverImageDiv.style.textAlign = "center";
noCoverImageDiv.style.display = "flex";
noCoverImageDiv.style.flexDirection = "column";
noCoverImageDiv.style.justifyContent = "center";
noCoverImageDiv.style.backgroundColor = "blue"

const noCoverImageText = document.createElement("p");
noCoverImageText.innerText = "No cover image available";
noCoverImageDiv.appendChild(noCoverImageText);

// api Url setting
const perPage = 8; // Limit to 8 results per page
const page = 1; // Page number, start with 1 for the first page
const apiUrl = `https://openlibrary.org/search.json?q=${searchQuery}&limit=${perPage}&page=${page}`;


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
                

                const searchResults = document.getElementById("result-div");
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
                        



                        // Lucien added
                        const olIdentifier = extractOLIdentifier(book.seed[0]); // Extract OL identifier
                        fetchBookCover(olIdentifier)
                        .then((bookCoverURL) => {

                            const coverDiv = document.createElement('div')
                            coverDiv.className = "cover-div grid-reverse" 
                            const img = document.createElement('img');
                            img.className = "cover-image"
                            img.src = bookCoverURL;
                            img.alt = "Cover image not available";
                            coverDiv.appendChild(img); 
                            resultItem.appendChild(coverDiv);
                            })
                        .catch((error) => {
                            console.log(`Error fetching book cover for ${book.title}: ${error.message}`); 
                            throw error; 

                            // resultItem.appendChild(noCoverImageDiv); // Append the no cover image div
                            });
                        // end of Lucien added



                        const resultItem = document.createElement("div");
                        resultItem.className = "search-result";
                        const resultText = document.createElement("div");
                        resultText.className = "result-text-dv grid-reverse" 

                       
                        resultText.innerHTML =
                            `<p><strong>Title:</strong> ${title}</p>
                             <p><strong>Author(s):</strong> ${authors}</p>
                             <p><strong>Rating:</strong> ${bookRatings}</p>
                             <p><strong>Category:</strong> ${category}</p>
                             <p><strong>First Published:</strong> ${firstPublishYear}</p>`;
                        resultItem.appendChild(resultText); 
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



    
