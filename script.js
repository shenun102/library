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
    this.readOrNot = readOrNot;
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

