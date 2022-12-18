let author = document.querySelector(".profile__author");
let aboutTheAutor = document.querySelector(".profile__about-the-author");
let editButton = document.querySelector(".profile__button-edit");
let popup = document.querySelector(".popup");
let closePopup = document.querySelector(".popup__close");
let saveEdit = document.querySelector(".popup__save-edit");
let renameAuthor = document.querySelector(".popup__rename-author");
let editAboutTheAuthor = document.querySelector(
  ".popup__edit-about-the-author"
);

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

function saveEditProfile() {
  if (author.textContent === renameAuthor) {
    author.insertAdjacentText("afterbegin", renameAuthor.value);
    aboutTheAutor.insertAdjacentText("afterbegin", editAboutTheAuthor.value);
  }

  closePop();
}

saveEdit.addEventListener("click", saveEditProfile());
