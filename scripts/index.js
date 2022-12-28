let author = document.querySelector(".profile__author");
let aboutTheAutor = document.querySelector(".profile__about-the-author");
let editButton = document.querySelector(".profile__button-edit");

let popup = document.querySelector(".popup");
let popupForm = document.querySelector(".popup__container");
let closePopup = popup.querySelector(".popup__close");
let saveEdit = popup.querySelector(".popup__save-edit");
let renameAuthor = popup.querySelector(".popup__text-input_edit_author");
let editAboutTheAuthor = popup.querySelector(
  ".popup__text-input_edit_about-the-author"
);

function closePop() {
  popup.classList.remove("popup_open");
}

// closePop();

editButton.addEventListener("click", function openPop() {
  popup.classList.add("popup_open");
  renameAuthor.value = author.textContent;
  editAboutTheAuthor.value = aboutTheAutor.textContent;
});

closePopup.addEventListener("click", closePop);

function saveEditProfile(evt) {
  evt.preventDefault();
  author.textContent = renameAuthor.value;
  aboutTheAutor.textContent = editAboutTheAuthor.value;
  closePop();
}

popupForm.addEventListener("submit", saveEditProfile);
