"use strict";

const entryButton = document.querySelector(".new-entry");
// Includes the scenario if there were to be multiple modal buttons
const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

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

entryButton.addEventListener("click", addBookToLibrary);
const myLibrary = [];

// Book Entry Constructor Function
function Book(title, author, pages) {
  if (!new.target) {
    throw Error("Must use the new operator to call the function!");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
}

function addBookToLibrary(e) {
  console.log(e.target);
  // console.log("I want to add a new book");
  // const title = prompt("What is the title of the book?");
  // const author = prompt("Who is the author of the book?");
  // const pages = prompt("How many pages does the book have?");
  // const newBook = new Book(title, author, pages);
  // console.log(newBook);
  // myLibrary.push(newBook);
  // console.log(myLibrary);
}

// Open modal function
function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}
