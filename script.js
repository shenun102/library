"use strict";

const myLibrary = [];

const entryButton = document.querySelector(".new-entry");
// Includes the scenario if there were to be multiple modal buttons
const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");
// New Book Form Selectors
const inputTitle = document.querySelector("#title");
const inputAuthor = document.querySelector("#author");
const inputPages = document.querySelector("#pages");
const readStatus = document.querySelector("#read");
// Submit button for new book form
const submitBtn = document.querySelector(".submit-book");

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

// Form submission
submitBtn.addEventListener("click", addBookToLibrary);

// Book Entry Constructor Function
function Book(title, author, pages, readOrNot) {
  if (!new.target) {
    throw Error("Must use the new operator to call the function!");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = !readOrNot ? "Read" : "Unread";
}

function addBookToLibrary(e) {
  // Stops the submit button of the form from reloading page
  e.preventDefault();
  console.log(e.target);

  const title = inputTitle.value;
  const author = inputAuthor.value;
  const pages = inputPages.value;
  const readOrNot = readStatus.value;
  const newBook = new Book(title, author, pages, readOrNot);
  console.log(newBook);
  myLibrary.push(newBook);
  console.log(myLibrary);
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
