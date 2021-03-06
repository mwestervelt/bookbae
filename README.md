# BookBae
- Book (*noun*): a set of written, printed, or blank sheets bound together between a front and back cover.
- Bae (*noun*): US Slang- sweetheart, baby. 'Before Anyone Else.'

## About
If you love books, then you'll love BookBae! BookBae was inspired by my love of books, and my overwhelming guilt that I have so many of them, but seemingly so little time to read them all. BookBae was created in efforts to help users organize and keep track of their books. "It's like GoodReads but cuter." - a friend.

## Features
- Users can sign up or login from the homepage and have a user profile page
- Users can search through millions of books on the search tab, view more details, and add them to their bookshelves
- Users can change which shelf their books are currently on: Have Read, Currently Reading, or Want to Read
- Users can remove books from their bookshelves

## Made With
- React.JS & Redux front-end
- Ruby on Rails (Rails 5.2.2) back-end
- Google Books API for all book related data
- Semantic UI for styling

## Screenshots
![homepage](/bookbae-frontend/public/screenshots/home-notloggedin.png "Homepage")
![search page](/bookbae-frontend/public/screenshots/search.png "Book Search")
![bookshelf](/bookbae-frontend/public/screenshots/shelf.png "Your 'Want to Read' Shelf")

## Installation
- Back-end:
```
bundle install
rails db:migrate
rails db:seed
rails s
```
- Front-end:
```
yarn install or npm install
yarn start or npm start
```
## To do
- Recommend related books
- Add followers/followees to user model
- Flesh out book review cards on front end
