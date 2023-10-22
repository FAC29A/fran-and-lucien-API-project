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
                
                // searchResults(#result-div) =  has many of dynamically produce result divs 
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

                        // descriptionContainer = the div container that includes only descriptin  
                        const descriptionContainer = document.createElement("div")

                        
                        fetchDescription(key)
                        .then(description => {
                            descriptionElement.innerText = description;
                            // layer 4:   description <p> append to its own container div
                            descriptionContainer.appendChild(descriptionElement);
                            // layer 3: and then text container that has other text info appendchild description div
                            resultText.appendChild(descriptionContainer)
                            
                            


                        })
                        .catch(error => {
                            console.error(error);
                            descriptionElement.innerText = "Description not available";
                            // layer 4:   description <p> append to its own container div
                            descriptionContainer.appendChild(descriptionElement);
                            // layer 3: and then text container that has other text info appendchild description div
                            resultText.appendChild(descriptionContainer)
                        });
                                            


                        



                        // Lucien added
                        const olIdentifier = extractOLIdentifier(book.seed[0]); // Extract OL identifier
                        
                        // create a div on each research result for the top border purpoose
                        const resultTopLine = document.createElement("div"); 
                        resultTopLine.className = "result-top-line";

              
                        // .research-result (resultItem) = the container with 3 divs(title/author div, image div,text-div )
                        const resultItem = document.createElement("div");
                        resultItem.className = "search-result";
                        
                        // resultText (.result-text-dv) =  the div that has all text except title and author
                        const resultText = document.createElement("div");
                        resultText.className = "result-text-dv " 


                        // coverDvi (.cover-div) = container for image 
                        const coverDiv = document.createElement('div')
                        coverDiv.className = "cover-div" 
                        const img = document.createElement('img');
                        img.className = "cover-image"
                        img.src = "";


                        const titleAuthorDiv = document.createElement("div");
                        titleAuthorDiv.className = "title-author-div" 

                        titleAuthorDiv.innerHTML =
                            `<p class="result-item-title">${title}</p>
                             <p class="author-italic">by ${authors}</p>
                            `

                        resultText.innerHTML =
                            `
                                <div class="rating-category-container"> 
                                <p>Ratings: ${bookRatings}</p>
                                <p><strong>Category:</strong> ${category}</p>
                                <p><strong>First Published:</strong> ${firstPublishYear}</p>
                                </div>
                             
                              `
                        // layer 2 : the medium div includes 3 element div (image, title, text) append the div that contain text 
                        resultItem.appendChild(titleAuthorDiv);
                     
                        // layer 2 : the medium div includes 3 element div (image, title, text) append the div that contain text 
                        resultItem.appendChild(resultText);

                        // layer 1: the div for the top borderline 
                        resultTopLine.appendChild(resultItem); 
                        
                        // layer 0: the big div append  all dynamic produces result divs (that has 3 elements in each )
                        searchResults.appendChild(resultTopLine);

                        
                       
                        
                        
    
                        // layer 3:   image elemennt append to a container
                        coverDiv.appendChild(img); 
                        // layer 2:  the medium div includes 3 element div (image, title, text) append the div that contain image 
                        resultItem.appendChild(coverDiv);




                        // create the no coverimage block

                        const noCoverImageDiv = document.createElement("div");
                        noCoverImageDiv.className = "no-cover-image-div"
                        
                        const noCoverImageText = document.createElement("div");
                        noCoverImageText.innerHTML = 
                        `
                        <div class="cover-inner-frame">
                        <p class="cover-title">${title}</p>
                        <p class="cover-author">${authors}</p>
                        </div>
                        `
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

    // async function fetchDescription(key) {
    //      fetch(`https://openlibrary.org${key}.json`)
    //     .then((response) => {
    //         if (!response.ok) throw new Error(response.status);
    //         return response.json; 
    //     })
    //     .then((responseJson) => {
    //      console.log(responseJson, "in the function"); 
    //     return responseJson.description.cover; 
       
    // })
    //     .catch(error =>{ 
    //         console.error(error, "error in description function");
    //         return "Description not available"; })
 
    //     }



    // below are answer of chat gpt 

    async function fetchDescription(key) {
        try {
            const response = await fetch(`https://openlibrary.org${key}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseJson = await response.json();
            console.log(responseJson, "in the function");
            const text =  responseJson.description.value;

         
            return text.replace(/\(\[source\]\[\d+\]\)\nPreceded by: \[.*?\]\[\d+\]\nFollowed by: \[.*?\]\[\d+\]\n\n-+/, '');
        } catch (error) {
            console.error(error, "error in description function");
            return "Description not available";
        }
    }

    


    

