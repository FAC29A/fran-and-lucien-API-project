
// create a object key-value pairs extract from research.js, window.location.search will be ?q=harry+potter
const urlParams = new URLSearchParams(window.location.search);
//to get the value of the object, which would be the researh keyword client type in
const searchQuery = urlParams.get("q");

// search keywords to be also showed on the result page 
const researchH2 = document.getElementById("query-name")
researchH2.innerText = searchQuery; 



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
                        const key = book.key; 



                        const descriptionElement = document.createElement("p");
                        
                        fetchDescription(key)
                        .then(description => {
                            descriptionElement.innerText = description;
                             // Inside the `then` block, you can add the description to the resultText
                            resultText.appendChild(descriptionElement);
                        })
                        .catch(error => {
                            console.error(error);
                            descriptionElement.innerText = "Description not available";
                            resultText.appendChild(descriptionElement);
                        });
                                            


                        



                        // Lucien added
                        const olIdentifier = extractOLIdentifier(book.seed[0]); // Extract OL identifier
              

                        const resultItem = document.createElement("div");
                        resultItem.className = "search-result";
                        const resultText = document.createElement("div");
                        resultText.className = "result-text-dv grid-reverse" 

                        const coverDiv = document.createElement('div')
                        coverDiv.className = "cover-div grid-reverse" 
                        const img = document.createElement('img');
                        img.className = "cover-image"
                        img.src = "";

                    


                       
                        resultText.innerHTML =
                            `<p><strong>Title:</strong> ${title}</p>
                             <p><strong>Author(s):</strong> ${authors}</p>
                             <p><strong>Rating:</strong> ${bookRatings}</p>
                             <p><strong>Category:</strong> ${category}</p>
                             <p><strong>First Published:</strong> ${firstPublishYear}</p>
                              `
                        resultItem.appendChild(resultText); 
                        searchResults.appendChild(resultItem);
                        

                        coverDiv.appendChild(img); 
                        resultItem.appendChild(coverDiv);


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

                        fetchBookCover(olIdentifier)
                        .then((bookCoverURL) => {
                                img.src = bookCoverURL; // Set the image source when it's available
                        })
                        .catch((error) => {
                            console.log("1st fire- no book found " , error);  
                            
                                resultItem.appendChild(coverDiv)
                                coverDiv.appendChild(noCoverImageDiv);

                           
                        });

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
        return fetch(`https://covers.openlibrary.org/b/olid/${olid}-M.jpg?default=false`)
        .then((response) => {
            if (!response.ok) throw new Error(response.status);
            return response.url; // Return the URL of the book cover image
        })
        
    }

    async function fetchDescription(key) {
         fetch(`https://openlibrary.org${key}.json`)
        .then((response) => {
            if (!response.ok) throw new Error(response.status);
            return response.json; 
        })
        .then((responseJson) => {
        return responseJson.description
    })
        .catch(error =>{ 
            console.error(error);
            return "Description not available"; })
 
        }

    


    

