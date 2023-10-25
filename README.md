# fran-and-lucien-API-project

## Welcome to Bookster!
What's Bookster, you ask? It's an app that utilises data from the Project OpenLibrary and The New York Times APIs, fusing the magic of literature and technology to help you discover your next literary adventure. We're all about unlocking new horizons in the world of reading! Not sure what to read next? Well look no further...

**A mobile view of our app:**
https://github.com/FAC29A/fran-and-lucien-API-project/assets/124707247/8bf521a0-dc82-4347-99cd-5a03b35903af 

## Features
### General search
- Users can search for books by title, author or subject
- Results displayed are sorted by rating, with highest-rated books displayed first
- Book covers, descriptions and ratings are shown when available

### NY times bestsellers
- On the left, theere is a display of the top 3 current bestsellers
- If these are unavailable, the user will see 3 recommended reads from a previous bestsellers list
- On the right, users can select a category of bestselling books to read
- Once they click on a category, they are taken to a new page where the can view the current 10 bestselling books
- On the bestsellers page, users can view the title, author, description and can click on a link to amazon to purchase the book

## Project Milestones
- Finding an API which worked!
- Displaying images for books from the open library API (displaying a customised placeholder block if the image is not available) 
- Working around the 429 error when we had made too many requests (showing errors or alternate content so the site was still usable)




### User Stories 
<img width="928" alt="Screenshot 2023-10-25 at 13 47 19" src="https://github.com/FAC29A/fran-and-lucien-API-project/assets/128807685/1c733cf1-136c-4c6a-b1ee-481ad8b11cc9">

**Core Stories**
As a user, I want to:
- See an interesting mashup of book data
- Input a title, an author or a subject and get a list of results
- View the app on all of my devices
- Find out about the latest bestsellers for different genres
- Have a direct link to the Amazon purchase page for each book
- As a student or teacher, I need to find books related to a subject
- I want the highest rated books to be displayed first
- I don't want too many books- keep the lists to a maximum of 10!

**Stretch stories**
- As an impatient user, I want to see some indication that data is loading
- As a confused user, I want to be told when something goes wrong

### How to Use
- Clone the repository and open the Index.html file in your browser (you can also visit [Bookster](https://fac29a.github.io/fran-and-lucien-API-project/))
- In the search bar, type in a subject, an author or the title of a book and press the arrow button
- If you don't want to search for anything specific, click on one of the genres to view the latest bestsellers!
N.B. If you are getting a 429 response- please try an alternative API key!!

### Challenges 
**Open Library API documentation:**
-------
  The Open Library API documentation is not straightforward for fetching all the information in one go. This is due to the complexity of how libraries classify their materials. With various editions, language versions, and different media types, all of this is amalgamated into a single "work" for a single book. Each search query produces multiple results, and each result item contains multiple versions of books. Consequently, it can be a challenge to pinpoint the correct book for generating a cover image and description.
<img width="488" alt="Screenshot 2023-10-25 at 14 24 12" src="https://github.com/FAC29A/fran-and-lucien-API-project/assets/128807685/5e910365-2ce3-4e4d-aa42-23b0815cedd9">

**Solution**
To obtain the correct description and book cover image for the results, we attempted to retrieve them using "key," "seed," "Olid," or "Oclc" values. However, after examining each JSON file, we found that none of them matched the results on Open Library's official website. We came to the realisation that this disparity is due to Open Library's "view online" mode, which necessitates more advanced credentials. Consequently, we opted for the closest version available in the 'Key' JSON.

**chaining async function - when should we catch?**
----
To get the book cover and description Json file.  we have create an sync fetcBookCover fucntion that fetch the api and then return the correct desired forma. We use .catch for the error on this step.  In a different place in our code, we need to call the function fetchBookcover, but again this is a promise so it seems like we need to add .catch here too.    The question is: Do we need to catch error on both steps?

**Solution:**  
Upon analysing the point at which the error message is rendered using the console log, we realized that there is no need to set up a catch block in both the function itself and when calling the function. Instead, we only need to catch errors when we call the function.

<img width="723" alt="Screenshot 2023-10-25 at 14 37 25" src="https://github.com/FAC29A/fran-and-lucien-API-project/assets/128807685/73e2333c-ec3e-4367-ba6f-ff4f2edf3511">

<img width="714" alt="Screenshot 2023-10-25 at 14 38 18" src="https://github.com/FAC29A/fran-and-lucien-API-project/assets/128807685/7f5bb734-cbda-4830-add4-18165afb8e6e">

## Authors
This project was made by [Lucien](https://github.com/Luciensday) and [Fran](https://github.com/Frannerz)
