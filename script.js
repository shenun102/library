"use strict";

// DOM selectors

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
// Select the book entries container
const bookContainer = document.querySelector(".books-container");
// Submit button for new book form
const submitBtn = document.querySelector(".submit-book");

// Define Book Class

class Book {
  constructor(title, author, pages, readOrNot, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readOrNot;
    this.id = id;
  }
}

// Library class that manages the collection of books.
// Handles adding, removing, and displaying books

class Library {
  constructor() {
    this.books = [];
    this.bookCount = 0;
  }

  // Add book method
  addBook(book) {
    this.books.push(book);
    this.bookCount++;
  }

  // Remove book method
  removeBook(id) {
    this.books = this.books.filter((book) => book.id !== id);
    this.displayBooks();
  }

  // Toggle read status method
  toggleRead(id) {
    const book = this.books.find((book) => book.id === id);
    if (book) {
      book.readStatus = book.readStatus === "Read" ? "Not Read" : "Read";
      this.displayBooks();
    }
  }

  // Display books
  displayBooks() {
    bookContainer.innerHTML = "";
    this.books.forEach((book) => {
      const bookEntry = `<div data-book-id="${book.id}" class="book-entry">
          <div class="text-content">
            <div class="title">${book.title}</div>
            <div class="author">${book.author}</div>
            <div class="pages">${book.pages} pages</div>
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
}

// Instantiate Library
const myLibrary = new Library();

// Create new book
const initialBook = new Book(
  "Lord of the Mysteries",
  "Cuttlefish That Loves Diving",
  7000,
  "Read",
  0
);

// Add initial book to the library
myLibrary.addBook(initialBook);
// Display initial book
myLibrary.displayBooks();
console.log(initialBook);

// Modal
// For every open modal button add a click event listener
openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});

// For every close modal button add a click event listener
closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

// Close the modal when the overlay is clicked
overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal.active");
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

// Listen for Form Submission
bookForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Check if the form is valid
  if (!bookForm.checkValidity()) {
    bookForm.reportValidity();
    return;
  }
  // Creates properties for a new book object.
  const title = inputTitle.value;
  const author = inputAuthor.value;
  const pages = inputPages.value;
  const readOrNot = readStatus.checked ? "Read" : "Not Read";

  // Create new book object
  const newBook = new Book(
    title,
    author,
    pages,
    readOrNot,
    myLibrary.bookCount
  );

  // Add book
  myLibrary.addBook(newBook);

  // Display Book
  myLibrary.displayBooks();

  // Reset the form
  bookForm.reset();

  // Close modal after submission
  const modal = document.querySelector(".modal.active");
  closeModal(modal);
});

// Event delegation to listen for all remove book buttons
bookContainer.addEventListener("click", function (e) {
  if (!e.target.classList.contains("button-remove")) return;
  const bookId = parseInt(e.target.closest(".book-entry").dataset.bookId, 10);
  myLibrary.removeBook(bookId);
});

// Event delegation to listen for all read/unread buttons
bookContainer.addEventListener("click", function (e) {
  if (!e.target.classList.contains("button-not-read")) return;
  const bookId = parseInt(e.target.closest(".book-entry").dataset.bookId, 10);
  myLibrary.toggleRead(bookId);
});

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

// Custom validation for the "pages" field
inputPages.addEventListener("input", function () {
  const pagesValue = inputPages.value;

  // Check if the input contains any non-numeric characters
  if (!/^\d+$/.test(pagesValue)) {
    inputPages.setCustomValidity("Please enter a valid NUMBER of pages.");
  } else if (pagesValue < 1) {
    inputPages.setCustomValidity("The number of pages must be at least 1.");
  } else {
    inputPages.setCustomValidity(""); // Reset custom validity
  }
});
