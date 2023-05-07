import { initialCards } from "./initialCards.js";
import Card from "./Card.js";
import { enableValidation } from "./validate.js";
import FormValidator from "./FormValidator.js";

const author = document.querySelector(".profile__author");
const aboutTheAutor = document.querySelector(".profile__about-the-author");
const editButton = document.querySelector(".profile__button-edit");

const popupEdit = document.querySelector(".popup_type_edit-profile");
const popupEditForm = popupEdit.querySelector(".popup__form");
const closeProfilePopup = popupEdit.querySelector(".popup__close");
const renameAuthor = popupEdit.querySelector(".popup__text-input_edit_author");
const editAboutTheAuthor = popupEdit.querySelector(
  ".popup__text-input_edit_about-the-author"
);

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__text-input",
  submitButtonSelector: ".popup__save-edit",
  inactiveButtonClass: "popup__save-edit_inactive",
  inputErrorClass: "popup__text-input_type_error",
  errorClass: "popup__text-input-error_active",
};

const closePopupIfPress = (evt) => {
  Array.from(document.querySelectorAll(".popup_open")).forEach(
    (popupElement) => {
      if (evt.target === popupElement) {
        closePopup(popupElement);
      }
    }
  );
};

function closePopupEscapeButton(evt) {
  if (evt.key === "Escape") {
    Array.from(document.querySelectorAll(".popup_open")).forEach(
      (popupElement) => {
        closePopup(popupElement);
      }
    );
  }
}

//*ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА
function closePopup(popup) {
  popup.classList.remove("popup_open");
  popup.removeEventListener("mousedown", closePopupIfPress);
  document.removeEventListener("keydown", closePopupEscapeButton);
}

//*ОТКРЫТИЕ МОДАЛЬНОГО ОКНА
function openPopup(popup) {
  popup.classList.add("popup_open");
  popup.addEventListener("mousedown", closePopupIfPress);
  document.addEventListener("keydown", closePopupEscapeButton);
}

//*ОТКРЫТИЕ МОДАЛЬНОГО ОКНА + КОНТЕЙНЕРА
function handleProfilePopup() {
  renameAuthor.value = author.textContent;
  editAboutTheAuthor.value = aboutTheAutor.textContent;
  openPopup(popupEdit);
}

//*СОХРАНЕНИЕ ИЗМЕНЕНИЙ ПРОФИЛЯ
function saveEditProfile(evt) {
  evt.preventDefault();
  author.textContent = renameAuthor.value;
  aboutTheAutor.textContent = editAboutTheAuthor.value;
  closePopup(popupEdit);
  popupEditForm.reset();
}

editButton.addEventListener("click", handleProfilePopup);

closeProfilePopup.addEventListener("click", () => closePopup(popupEdit));

popupEditForm.addEventListener("submit", saveEditProfile);

const addButton = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_type_add-card");
const popupAddCardForm = popupAddCard.querySelector(".popup__form");
const closeAddCardPopup = popupAddCard.querySelector(".popup__close");
const addTittleCard = popupAddCard.querySelector(
  ".popup__text-input_title-card"
);
const addUrlPhoto = popupAddCard.querySelector(".popup__text-input_photo-link");

function handleAddCardPopup() {
  addTittleCard.value = "";
  addUrlPhoto.value = "";
  openPopup(popupAddCard);
}

addButton.addEventListener("click", handleAddCardPopup);

closeAddCardPopup.addEventListener("click", () => closePopup(popupAddCard));
//**ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ

function render() {
  initialCards.forEach((item) => {
    const card = new Card(item, ".template-element");

    const renderCard = card.generateCard();

    document.querySelector(".elements").append(renderCard);
  });
}
render();

function submitAddNewCard(evt) {
  evt.preventDefault();

  const newData = {
    name: addTittleCard.value,
    link: addUrlPhoto.value,
  };

  const newCard = new Card(newData, ".template-element");

  const renderNewCard = newCard.generateCard();

  document.querySelector(".elements").prepend(renderNewCard);

  closePopup(popupAddCard);
  popupAddCardForm.reset();
}

popupAddCardForm.addEventListener("submit", submitAddNewCard);

const addForm = document.querySelectorAll("#addCard");

const formValidation = new FormValidator(validationConfig, addForm);
formValidation.enableValidation();

// enableValidation(validationConfig);
