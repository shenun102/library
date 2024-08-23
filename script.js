"use strict";

const myLibrary = [
  { title: "1", author: "2", pages: "3", readStatus: "Read", id: 0 },
];

const entryButton = document.querySelector(".new-entry");
// Includes the scenario if there were to be multiple modal buttons
const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");
// New Book Form Selectors
const bookForm = document.querySelector(".book-form");
const inputTitle = document.querySelector("#title");
const inputAuthor = document.querySelector("#author");
const inputPages = document.querySelector("#pages");
const readStatus = document.querySelector("#read");
// Submit button for new book form
const submitBtn = document.querySelector(".submit-book");

// Number of books
let bookCount = myLibrary.length;

displayBook();

// Event Listeners

// For every modal button add a click event listener
openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // select the specfic modal clicked by selecting it using its dataset
    const modal = document.querySelector(button.dataset.modalTarget);
    // call the open modal function
    openModal(modal);
  });
});

// For every modal button add a click event listener
closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // we want to access the parent modal of this close button
    const modal = button.closest(".modal");
    // call the close modal function
    closeModal(modal);
  });
});

// Close the modal when the overlay is clicked
overlay.addEventListener("click", () => {
  // Select every single element that is a modal and is active
  const modals = document.querySelectorAll(".modal.active");
  // for each of these modals, call the close modal function
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

// Form submission, its better to listen for the form's submission event instead
// submitBtn.addEventListener("click", addBookToLibrary);
bookForm.addEventListener("submit", addBookToLibrary);

document.addEventListener("click", removeBook);

// Functions

// Book Entry Constructor Function
function Book(title, author, pages, readOrNot) {
  if (!new.target) {
    throw Error("Must use the new operator to call the function!");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  // Determines whether the value of readStatus is read or unread depending
  // on whether readStatus.checked returns true or false.
  this.readStatus = readOrNot ? "Read" : "Unread";
  // Assigns the book an ID based on the length of myLibrary array
  this.id = bookCount;
}

// Function creates book object and stores it in library array
function addBookToLibrary(e) {
  // Stops the submit button of the form from reloading page
  e.preventDefault();
  console.log(e.target);

  // Creates properties for a new book object.
  const title = inputTitle.value;
  const author = inputAuthor.value;
  const pages = inputPages.value;
  // Stores true or false depending on whether the checkbox is checked or unchecked
  const readOrNot = readStatus.checked;

  const newBook = new Book(title, author, pages, readOrNot);
  bookCount++;
  console.log(bookCount, " Books");
  console.log(newBook);
  myLibrary.push(newBook);
  // console.log(myLibrary);
  // Reset the form
  bookForm.reset();
  // Display new book on page
  displayBook();
  // Close the modal after submission
  const modal = document.querySelector(".modal.active");
  closeModal(modal);
}

// Display book function

function displayBook() {
  // Select the book entries container
  const bookContainer = document.querySelector(".books-container");
  // clears the container's innerHTML
  bookContainer.innerHTML = "";
  // Loop through library and display books on page
  myLibrary.forEach((book) => {
    // HTML for new book entry
    const bookEntry = `<div data-book-id="${book.id}" class="book-entry">
          <div class="text-content">
            <div class="title">${book.title}</div>
            <div class="author">${book.author}</div>
            <div class="pages">${book.pages}</div>
          </div>
          <div class="button-container">
            <button class="button-not-read">${book.readStatus}</button>
            <button class="button-remove">Remove Book</button>
          </div>
        </div>`;
    // Insert the html element
    bookContainer.insertAdjacentHTML("beforeend", bookEntry);
  });
}

// Remove book function

function removeBook(e) {
  if (!e.target.classList.contains("button-remove")) return;
  // Remove by removing the element from the library and redisplaying
  // Use closest() to find the nearest .book-entry ancestor
  const bookEntry = e.target.closest(".book-entry");
  console.log(bookEntry);
  // Get the value of the data-book-id attribute
  const bookToRemove = bookEntry.getAttribute("data-book-id");
  console.log("ID of the book", bookToRemove);
  console.log(myLibrary);
  // Search for the matching book
  const bookId = myLibrary.findIndex((book) => book.id === +bookToRemove);
  console.log("Index of bookID", bookId);
  myLibrary.splice(bookId, 1);
  displayBook();
  console.log(myLibrary);
}

// Open modal function
function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

// Close modal function
function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}
