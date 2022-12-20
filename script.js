let author = document.querySelector(".profile__author");
let aboutTheAutor = document.querySelector(".profile__about-the-author");
let editButton = document.querySelector(".profile__button-edit");

let popup = document.querySelector(".popup");
let closePopup = popup.querySelector(".popup__close");
let saveEdit = popup.querySelector(".popup__save-edit");
let renameAuthor = popup.querySelector(".popup__rename-author");
let editAboutTheAuthor = popup.querySelector(".popup__edit-about-the-author");

let cards = document.querySelector(".elements");
const likeButton = cards.querySelectorAll(".element__like");

editButton.addEventListener("click", function openPop() {
  if (popup.classList.contains("popup_hidden") === true) {
    popup.classList.remove("popup_hidden");
  } else {
    console.log("окно не открыто");
  }
});

closePopup.addEventListener("click", function closePop() {
  if (popup.classList.contains("popup_hidden") === false) {
    popup.classList.add("popup_hidden");
  } else {
    console.log("не закрыто окно");
  }
});

renameAuthor.value = author.textContent;
editAboutTheAuthor.value = aboutTheAutor.textContent;

function saveEditProfile(evt) {
  evt.preventDefault();
  author.textContent = renameAuthor.value;
  aboutTheAutor.textContent = editAboutTheAuthor.value;
}

saveEdit.addEventListener("click", saveEditProfile);
