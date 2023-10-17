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

            }) //end of then 
           
   



    

